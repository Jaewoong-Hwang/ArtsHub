package com.example.demo.common.config.auth.jwt;

import com.example.demo.common.config.auth.jwt.JwtProperties;
import com.example.demo.common.config.auth.jwt.JwtTokenProvider;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

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

        // 인증 제외 경로
        String uri = request.getRequestURI();
        if (uri.startsWith("/api/login") || uri.startsWith("/api/join") ||
                uri.startsWith("/api/check-username") ||
                uri.startsWith("/favicon.ico") ||
                uri.startsWith("/static") || uri.startsWith("/css") ||
                uri.startsWith("/js") || uri.startsWith("/img") ||
                uri.startsWith("/assets") || uri.startsWith("/error")) {
            chain.doFilter(request, response);
            return;
        }

        // 1. 쿠키에서 accessToken 추출
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            log.warn("[JWT FILTER] 쿠키가 없습니다 (request.getCookies() == null)");
            chain.doFilter(request, response);
            return;
        }

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

        String username = null;

        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(jwtTokenProvider.getKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            username = claims.getSubject();
        } catch (ExpiredJwtException ex) {
            username = ex.getClaims().getSubject();
            log.warn("[JWT FILTER] AccessToken 만료됨 - 사용자: {}", username);
        } catch (Exception ex) {
            log.warn("[JWT FILTER] 토큰 파싱 실패: {}", ex.getMessage());
            chain.doFilter(request, response);
            return;
        }

        try {
            if (jwtTokenProvider.validateToken(token)) {
                Authentication authentication = getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.info("[JWT FILTER] 인증 성공: {}", authentication.getName());
            }
        } catch (ExpiredJwtException ex) {
            log.info("[JWT FILTER] AccessToken 만료됨, RefreshToken 검증 시도");

            if (username != null) {
                String redisKey = "RT:" + username;
                String refreshToken = redisUtil.getRefreshToken(redisKey);

                if (refreshToken != null) {
                    try {
                        if (jwtTokenProvider.validateToken(refreshToken)) {
                            User user = userRepository.findByUsername(username);
                            long now = System.currentTimeMillis();
                            Date accessTokenExpiresIn = new Date(now + JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME);

                            String newAccessToken = Jwts.builder()
                                    .setSubject(username)
                                    .claim("username", username)
                                    .claim("auth", user.getRole())
                                    .setExpiration(accessTokenExpiresIn)
                                    .signWith(jwtTokenProvider.getKey(), SignatureAlgorithm.HS256)
                                    .compact();

                            Cookie newTokenCookie = new Cookie(JwtProperties.ACCESS_TOKEN_COOKIE_NAME, newAccessToken);
                            newTokenCookie.setMaxAge(JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME);
                            newTokenCookie.setPath("/");
                            response.addCookie(newTokenCookie);

                            Authentication authentication = jwtTokenProvider.getAuthentication(newAccessToken);
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                            log.info("[JWT FILTER] AccessToken 재발급 및 인증 완료");

                        } else {
                            log.warn("[JWT FILTER] RefreshToken 유효하지 않음");
                            redisUtil.delete(redisKey);
                            expireCookies(response, "username", JwtProperties.ACCESS_TOKEN_COOKIE_NAME);
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.getWriter().write("UNAUTHORIZED");
                            return;
                        }
                    } catch (ExpiredJwtException refreshEx) {
                        log.warn("[JWT FILTER] RefreshToken 만료됨: {}", ex.getMessage());
                        redisUtil.delete(redisKey);
                        expireCookies(response, "username", JwtProperties.ACCESS_TOKEN_COOKIE_NAME);
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().write("UNAUTHORIZED");
                        return;
                    }
                } else {
                    log.warn("[JWT FILTER] Redis에 RefreshToken 없음");
                    expireCookies(response, "username", JwtProperties.ACCESS_TOKEN_COOKIE_NAME);
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("UNAUTHORIZED");
                    return;
                }

            }
        }

        chain.doFilter(request, response);
    }

    private Authentication getAuthentication(String token) {
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        Optional<User> user = userRepository.findById(authentication.getName());
        return user.map(u -> authentication).orElse(null);
    }

    private void expireCookies(HttpServletResponse response, String... names) {
        for (String name : names) {
            Cookie cookie = new Cookie(name, null);
            cookie.setMaxAge(0);
            cookie.setPath("/");
            response.addCookie(cookie);
        }
    }
}
