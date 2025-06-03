package com.example.demo.config.auth.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * JWT 토큰을 생성하고, 검증하고, 파싱하는 역할을 담당하는 클래스
 */
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    //콘솔 /api/user/me 작동 디버깅
    private final String secretKey = "secret";
    private final UserDetailsService userDetailsService;

    // 토큰 서명을 위한 비밀 키 (랜덤 키 생성)
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // 서명용 키
    // 액세스 토큰 유효 시간: 1시간 (1000ms * 60초 * 60분)
    private final long accessTokenValidity = 1000L * 60 * 60; // 1시간

    /**
     * 인증 객체(Authentication)를 기반으로 AccessToken 생성
     * @param authentication 로그인한 사용자의 인증 정보
     * @return JWT 문자열(AccessToken)
     */
    public String generateAccessToken(Authentication authentication) {
        // 인증된 사용자 이름 가져오기
        String username = authentication.getName();

        // JWT 토큰 생성 및 반환
        return Jwts.builder()
                .setSubject("AccessToken") // 토큰 제목
                .setIssuedAt(new Date())   // 토큰 생성 시간
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenValidity)) // 만료 시간
                .claim("username", username) // 사용자 정보 클레임으로 추가
                .signWith(key) // 비밀 키로 서명
                .compact();    // 최종 문자열로 변환
    }

    // RefreshToken 생성 (7일 유효)
    public String generateRefreshToken(Authentication authentication) {
        String username = authentication.getName();
        Date now = new Date();
        Date expiry = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7); // 7일

        return Jwts.builder()
                .setSubject("RefreshToken")
                .claim("username", username)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 토큰이 유효한지 검사
     * @param token 전달받은 JWT 토큰
     * @return 유효하면 true, 아니면 false
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token); // 파싱 및 검증 시도
            return true;
        } catch (Exception e) {
            return false; // 예외 발생 시 유효하지 않음
        }
    }

    /**
     * 토큰에서 username 값을 추출
     * @param token JWT 문자열
     * @return username 값
     */
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token) // 토큰 파싱
                .getBody()             // 페이로드(body) 부분
                .getSubject(); // 표준 클레임 'sub'에 저장된 username 반환
    }


    //콘솔 /api/user/me 작동 디버깅
    // 사용자 정보를 담은 Authentication 객체 생성
    public Authentication getAuthentication(String token) {
        // 1. 토큰에서 username 추출
        String username = getUsernameFromToken(token);

        // 2. DB에서 사용자 정보 조회 (PrincipalDetailsService를 사용)
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        // 3. 인증 객체 생성 (비밀번호는 null, 권한 정보는 userDetails에서 가져옴)
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
