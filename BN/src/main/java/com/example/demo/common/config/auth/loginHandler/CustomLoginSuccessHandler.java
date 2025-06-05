package com.example.demo.common.config.auth.loginHandler;

import com.example.demo.common.config.auth.jwt.JwtProperties;
import com.example.demo.common.config.auth.jwt.JwtTokenProvider;
import com.example.demo.common.config.auth.jwt.TokenInfo;
import com.example.demo.common.config.auth.redis.RedisUtil;
import com.example.demo.user.entity.JwtToken;
import com.example.demo.user.repository.JwtTokenRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class CustomLoginSuccessHandler implements AuthenticationSuccessHandler {

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	private JwtTokenRepository jwtTokenRepository;

	@Autowired
	private RedisUtil redisUtil;


	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
										Authentication authentication) throws IOException, ServletException {

		log.info("CustomLoginSuccessHandler's onAuthenticationSuccess invoke..");

		// 토큰 생성
		TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

		// accessToken을 쿠키로 전달
		Cookie accessTokenCookie = new Cookie(JwtProperties.ACCESS_TOKEN_COOKIE_NAME, tokenInfo.getAccessToken());
		accessTokenCookie.setMaxAge(JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME);
		accessTokenCookie.setPath("/");
		response.addCookie(accessTokenCookie);

		// username 인코딩 (쿠키용 + Redis 키용)
		String rawUsername = authentication.getName();
		String encodedUsername = URLEncoder.encode(rawUsername, StandardCharsets.UTF_8);

		// username 쿠키에 저장
		Cookie usernameCookie = new Cookie("username", encodedUsername);
		usernameCookie.setMaxAge(JwtProperties.REFRESH_TOKEN_EXPIRATION_TIME);
		usernameCookie.setPath("/");
		response.addCookie(usernameCookie);

		// JWT 토큰 DB 저장
		JwtToken jwtToken = new JwtToken();
		jwtToken.setAccessToken(tokenInfo.getAccessToken());
		jwtToken.setRefreshToken(tokenInfo.getRefreshToken());
		jwtToken.setUsername(rawUsername);
		jwtToken.setCreateAt(LocalDateTime.now());
		jwtTokenRepository.save(jwtToken);

		// Redis 저장 (키에 인코딩된 username 사용)
		redisUtil.setDataExpire("RT:" + encodedUsername, tokenInfo.getRefreshToken(),
				JwtProperties.REFRESH_TOKEN_EXPIRATION_TIME);

		// JSON 응답 설정
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");

		Map<String, Object> result = new HashMap<>();
		result.put("accessToken", tokenInfo.getAccessToken());
		result.put("refreshToken", tokenInfo.getRefreshToken());
		result.put("username", rawUsername);

		ObjectMapper objectMapper = new ObjectMapper();
		response.getWriter().write(objectMapper.writeValueAsString(result));

		//---------------------------------
		//최초로그인(Client's AT x , DB x)
		//---------------------------------
		//- Client에게 AT 전송
		//- DB 저장
		//
		//
		//---------------------------------
		//기존로그인(Client's AT o , DB o)  JwtAuthorizationFilter에서 작업
		//---------------------------------
		//	- AT 만료 x -> 로그인 완료처리
		//	- AT 만료 o -> RT x -> AT 갱신
		//	- AT 만료 o -> RT o -> AT,RT새로발급 + DB저장
		//------------------------------
		//기존로그인(Client's AT o , DB x)
		//------------------------------
		//-
		//---------------------------------
		//기존로그인(Client's AT x , DB o) -예외상황
		//---------------------------------
		//-



//		response.sendRedirect(request.getContextPath()+"/");

	}

}
