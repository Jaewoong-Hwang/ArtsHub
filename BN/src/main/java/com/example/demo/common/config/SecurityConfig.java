package com.example.demo.common.config;

import com.example.demo.common.config.auth.exceptionHandler.CustomAccessDeniedHandler;
import com.example.demo.common.config.auth.exceptionHandler.CustomAuthenticationEntryPoint;
// import com.example.demo.common.config.auth.jwt.JwtAuthorizationFilter;
import com.example.demo.common.config.auth.jwt.JwtTokenProvider;
import com.example.demo.common.config.auth.logoutHandler.CustomLogoutHandler;
import com.example.demo.common.config.auth.logoutHandler.CustomLogoutSuccessHandler;
import com.example.demo.common.config.auth.redis.RedisUtil;
import com.example.demo.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired private CustomLogoutHandler customLogoutHandler;
	@Autowired private CustomLogoutSuccessHandler customLogoutSuccessHandler;
	@Autowired private UserRepository userRepository;
	@Autowired private JwtTokenProvider jwtTokenProvider;
	@Autowired private RedisUtil redisUtil;

	@Bean
	protected SecurityFilterChain configure(HttpSecurity http) throws Exception {

		// ✅ 기본 보안 설정 해제
		http.httpBasic(httpBasic -> httpBasic.disable());
		http.csrf(csrf -> csrf.disable());

		// ✅ 모든 요청 허용 (프론트 개발용)
		http.authorizeHttpRequests(auth -> auth.anyRequest().permitAll());

		// ✅ 로그아웃 설정
		http.logout(logout -> {
			logout.permitAll();
			logout.addLogoutHandler(customLogoutHandler);
			logout.logoutSuccessHandler(customLogoutSuccessHandler);
		});

		// ✅ 예외 처리 설정
		http.exceptionHandling(ex -> {
			ex.authenticationEntryPoint(new CustomAuthenticationEntryPoint());
			ex.accessDeniedHandler(new CustomAccessDeniedHandler());
		});

		// ✅ 세션 비활성화
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		// ✅ JWT 인증 필터 주석 처리 (로그인 미사용 상태)
		// http.addFilterBefore(new JwtAuthorizationFilter(userRepository, jwtTokenProvider, redisUtil), LogoutFilter.class);

		// ✅ CORS 설정
		http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOriginPatterns(List.of("http://localhost:3000"));
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		config.setAllowedHeaders(List.of("*"));
		config.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}
}
