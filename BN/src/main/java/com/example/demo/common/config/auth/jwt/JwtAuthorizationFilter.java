package com.example.demo.common.config.auth.jwt;

import com.example.demo.common.config.auth.redis.RedisUtil;
import com.example.demo.user.entity.User;
import com.example.demo.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

/**
 * JWT 인증 및 AccessToken 재발급을 처리하는 필터
 */
@Slf4j
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisUtil redisUtil;

    @Override
    @Transactional(rollbackFor = Exception.class)
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {

        log.debug("[JWT FILTER] 요청 URI: {}", request.getRequestURI());

        // 로그인, 회원가입, 정적 자원 등은 필터를 통과시킴
        String uri = request.getRequestURI();
        if (uri.matches("(?i)^/(img|css|js|static|assets)/.*") ||
                uri.equalsIgnoreCase("/favicon.ico") ||
                uri.startsWith("/api/login") ||
                uri.startsWith("/api/join") ||
                uri.startsWith("/api/check-email") ||
                uri.startsWith("/error")) {

            chain.doFilter(request, response);
            return;
        }

        // 쿠키에서 accessToken 추출
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            log.warn("[JWT FILTER] 쿠키가 없습니다");
            chain.doFilter(request, response);
            return;
        }

        // 디버깅용 쿠키 로그 출력
        for (Cookie c : cookies) {
            log.info("[JWT FILTER] Cookie: {} = {}", c.getName(), c.getValue());
        }

        String token = Arrays.stream(cookies)
                .filter(c -> c.getName().equals(JwtProperties.ACCESS_TOKEN_COOKIE_NAME))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);

        if (token == null) {
            log.info("[JWT FILTER] accessToken 쿠키 없음");
            chain.doFilter(request, response);
            return;
        }

        String email = null;

        // 토큰 파싱 시도
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(jwtTokenProvider.getKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            email = claims.getSubject();
        } catch (ExpiredJwtException ex) {
            email = ex.getClaims().getSubject(); // 만료된 토큰에서도 subject 추출 가능
            log.warn("[JWT FILTER] AccessToken 만료됨 - 사용자: {}", email);
        } catch (Exception ex) {
            log.warn("[JWT FILTER] 토큰 파싱 실패: {}", ex.getMessage());
            chain.doFilter(request, response);
            return;
        }

        try {
            // AccessToken이 유효하면 인증 설정
            if (jwtTokenProvider.validateToken(token)) {
                Authentication authentication = getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.info("[JWT FILTER] 인증 성공: {}", authentication.getName());
            }
        } catch (ExpiredJwtException ex) {
            log.info("[JWT FILTER] AccessToken 만료됨, RefreshToken 검증 시도");

            if (email != null) {
                String redisKey = "RT:" + email;
                String refreshToken = redisUtil.getRefreshToken(redisKey);

                if (refreshToken != null) {
                    try {
                        // RefreshToken도 유효하면 AccessToken 재발급
                        if (jwtTokenProvider.validateToken(refreshToken)) {
                            Optional<User> optionalUser = userRepository.findByEmail(email);
                            if (optionalUser.isEmpty()) {
                                throw new RuntimeException("사용자를 찾을 수 없습니다: " + email);
                            }
                            User user = optionalUser.get();

                            // AccessToken 새로 생성
                            long now = System.currentTimeMillis();
                            Date accessTokenExpiresIn = new Date(now + JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME);

                            String newAccessToken = Jwts.builder()
                                    .setSubject(email)
                                    .claim("email", email)
                                    .claim("auth", user.getRole())
                                    .setExpiration(accessTokenExpiresIn)
                                    .signWith(jwtTokenProvider.getKey(), SignatureAlgorithm.HS256)
                                    .compact();

                            // 새 AccessToken 쿠키에 저장
                            Cookie newTokenCookie = new Cookie(JwtProperties.ACCESS_TOKEN_COOKIE_NAME, newAccessToken);
                            newTokenCookie.setMaxAge(JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME);
                            newTokenCookie.setPath("/");
                            response.addCookie(newTokenCookie);

                            // SecurityContext에 인증 설정
                            Authentication authentication = jwtTokenProvider.getAuthentication(newAccessToken);
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                            log.info("[JWT FILTER] AccessToken 재발급 및 인증 완료");

                        } else {
                            // RefreshToken이 유효하지 않을 때
                            log.warn("[JWT FILTER] RefreshToken 유효하지 않음");
                            redisUtil.delete(redisKey);
                            expireCookies(response, "email", JwtProperties.ACCESS_TOKEN_COOKIE_NAME);
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.getWriter().write("UNAUTHORIZED");
                            return;
                        }
                    } catch (ExpiredJwtException refreshEx) {

                        // RefreshToken도 만료된 경우
                        log.warn("[JWT FILTER] RefreshToken 만료됨: {}", refreshEx.getMessage());
                        redisUtil.delete(redisKey);
                        expireCookies(response, "email", JwtProperties.ACCESS_TOKEN_COOKIE_NAME);
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().write("UNAUTHORIZED");
                        return;
                    }
                } else {
                    // Redis에 저장된 RefreshToken이 없는 경우
                    log.warn("[JWT FILTER] Redis에 RefreshToken 없음");
                    expireCookies(response, "email", JwtProperties.ACCESS_TOKEN_COOKIE_NAME);
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("UNAUTHORIZED");
                    return;
                }
            }
        }

        // 필터 체인 계속 진행
        chain.doFilter(request, response);
    }

    /**
     * JWT 토큰을 통해 인증 객체를 생성하는 메서드
     */
    private Authentication getAuthentication(String token) {
//        Authentication authentication = jwtTokenProvider.getAuthentication(token);
//        Optional<User> user = userRepository.findByEmail(authentication.getName());
//        return user.map(u -> authentication).orElse(null);

        // 🔥 이제 여기서 userRepository로 다시 조회할 필요 없음!
        return jwtTokenProvider.getAuthentication(token);
    }

    /**
     * 쿠키를 만료시키기 위한 유틸 메서드
     */
    private void expireCookies(HttpServletResponse response, String... names) {
        for (String name : names) {
            Cookie cookie = new Cookie(name, null);
            cookie.setMaxAge(0); // 즉시 만료
            cookie.setPath("/");
            response.addCookie(cookie);
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String uri = request.getRequestURI();
        boolean excluded = uri.startsWith("/img/") ||
                uri.matches("(?i)^/(css|js|static|assets)/.*") ||
                uri.equalsIgnoreCase("/favicon.ico") ||
                uri.startsWith("/api/login") ||
                uri.startsWith("/api/join") ||
                uri.startsWith("/api/check-email") ||
                uri.startsWith("/error");
        log.debug("[JWT FILTER] shouldNotFilter: {} - {}", excluded, uri);
        return excluded;
    }


}
