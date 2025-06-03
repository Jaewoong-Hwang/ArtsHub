package com.example.demo.config.auth.jwt;


import com.example.demo.user.auth.PrincipalDetails;
import com.example.demo.user.auth.PrincipalDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * 매 요청마다 실행되는 JWT 인증 필터
 */
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final PrincipalDetailsService principalDetailsService;


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        System.out.println("[JwtAuthorizationFilter] 요청 URI: " + request.getRequestURI());


        //요청에서 accessToken 쿠키 찾기
        String token = null;
        if (request.getCookies() !=null) {
            for (Cookie cookie : request.getCookies()) {
                if ("accessToken".equals(cookie.getName())) {
                    token = cookie.getValue();
                    //콘솔 /api/user/me 작동 디버깅
                    System.out.println("[JwtAuthorizationFilter] accessToken 발견: " + token);

                    if (jwtTokenProvider.validateToken(token)) {
                        Authentication authentication = jwtTokenProvider.getAuthentication(token);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        //콘솔 /api/user/me 작동 디버깅
                        System.out.println("[JwtAuthorizationFilter] 인증 성공 → SecurityContext에 등록됨");
                    } else {
                        //콘솔 /api/user/me 작동 디버깅
                        System.out.println("[JwtAuthorizationFilter] 토큰 유효하지 않음");
                    }
                    break;
                }
            }
        }

        // 토큰이 존재하고 유효하다면
        if (token != null && jwtTokenProvider.validateToken(token)) {
            //토큰에서 username 추출
            String username = jwtTokenProvider.getUsernameFromToken(token);

            //사용자 정보 조회
            PrincipalDetails userDetails = (PrincipalDetails) principalDetailsService.loadUserByUsername(username);

            //인증 객체 생성
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

            //SecurityContext에 인증 정보 등록
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        //다음 필터로 요청 넘기기
        filterChain.doFilter(request, response);

    }
}
