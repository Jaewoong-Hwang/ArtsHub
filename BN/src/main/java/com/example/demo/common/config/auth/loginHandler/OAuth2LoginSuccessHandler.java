package com.example.demo.common.config.auth.loginHandler;

import com.example.demo.common.config.auth.jwt.JwtProperties;
import com.example.demo.common.config.auth.jwt.JwtTokenProvider;
import com.example.demo.common.config.auth.jwt.TokenInfo;
import com.example.demo.common.config.auth.principal.PrincipalDetails;
import com.example.demo.common.config.auth.redis.RedisUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisUtil redisUtil;

    public OAuth2LoginSuccessHandler(JwtTokenProvider jwtTokenProvider, RedisUtil redisUtil) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.redisUtil = redisUtil;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        // 사용자 정보 가져오기
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String username = principalDetails.getUsername();

        // generateToken() 호출
        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        String accessToken = tokenInfo.getAccessToken();
        String refreshToken = tokenInfo.getRefreshToken();


        // RefreshToken을 Redis에 저장 (key: RT:username)
        redisUtil.setDataExpire("RT:" + username, refreshToken, JwtProperties.REFRESH_TOKEN_EXPIRATION_TIME);

        // AccessToken 쿠키 저장
        Cookie accessTokenCookie = new Cookie(JwtProperties.ACCESS_TOKEN_COOKIE_NAME, accessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME);
        response.addCookie(accessTokenCookie);

        // 사용자 이름 쿠키 저장 (선택)
        Cookie usernameCookie = new Cookie("username", username);
        usernameCookie.setPath("/");
        usernameCookie.setMaxAge(JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME);
        response.addCookie(usernameCookie);

        // 소셜 로그인 성공 후 리디렉션할 URL
        response.sendRedirect("http://localhost:3000/");
    }
}
