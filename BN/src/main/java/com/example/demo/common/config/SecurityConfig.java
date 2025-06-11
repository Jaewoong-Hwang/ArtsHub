package com.example.demo.common.config;

import com.example.demo.common.config.auth.exceptionHandler.CustomAccessDeniedHandler;
import com.example.demo.common.config.auth.exceptionHandler.CustomAuthenticationEntryPoint;
// import com.example.demo.common.config.auth.jwt.JwtAuthorizationFilter;
import com.example.demo.common.config.auth.jwt.JwtTokenProvider;
import com.example.demo.common.config.auth.loginHandler.CustomLoginFailureHandler;
import com.example.demo.common.config.auth.loginHandler.CustomLoginSuccessHandler;
import com.example.demo.common.config.auth.loginHandler.OAuth2LoginSuccessHandler;
import com.example.demo.common.config.auth.logoutHandler.CustomLogoutHandler;
import com.example.demo.common.config.auth.logoutHandler.CustomLogoutSuccessHandler;
import com.example.demo.common.config.auth.principal.PrincipalDetailsOAuth2Service;
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

	@Autowired
	private CustomLoginSuccessHandler customLoginSuccessHandler;
	@Autowired
	private CustomLogoutHandler customLogoutHandler;
	@Autowired
	private CustomLogoutSuccessHandler customLogoutSuccessHandler;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
//	@Autowired
//	private JwtTokenRepository jwtTokenRepository;
	@Autowired
	private RedisUtil redisUtil;
	@Autowired
	private PrincipalDetailsOAuth2Service principalDetailsOAuth2Service;
	@Autowired
	private OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;


	@Bean
	protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
		//CSRF비활성화
		http.httpBasic((httpBasic) -> httpBasic.disable());
		http.csrf((config)->{config.disable();});
		//권한체크
		http.authorizeHttpRequests((auth)->{
			auth.requestMatchers(
					"/api/login",
					"/api/join",
					"/api/user/me",
					"/api/check-email",
					"/favicon.ico",
					"/static/**",
					"/css/**",
					"/js/**",
					"/img/**",
					"/assets/**",
					"/api/projects/**").permitAll();
			auth.requestMatchers("/api/user").hasRole("USER");
			auth.requestMatchers("/api/manager").hasRole("MANAGER");
			auth.requestMatchers("/api/admin").hasRole("ADMIN");
			auth.anyRequest().authenticated();
		});

		//로그인
		http.formLogin(form -> form.disable());

		//로그아웃
		http.logout((logout)->{
			logout.permitAll();
			logout.addLogoutHandler(customLogoutHandler);
			logout.logoutSuccessHandler(customLogoutSuccessHandler);
		});

		// ✅ 예외 처리 설정
		http.exceptionHandling(ex -> {
			ex.authenticationEntryPoint(new CustomAuthenticationEntryPoint());
			ex.accessDeniedHandler(new CustomAccessDeniedHandler());
		});

		// OAUTH2 로그인 설정 - 커스텀 서비스로 사용자 정보 매핑
		http.oauth2Login(oauth2 -> oauth2
				.loginPage("/login") // 프론트엔드 커스텀 로그인 페이지
				.userInfoEndpoint(userInfo -> userInfo
						.userService(principalDetailsOAuth2Service)) // 사용자 정보 가져올 때 사용할 서비스 등록
		);

		http.oauth2Login().successHandler(oAuth2LoginSuccessHandler);

		//SESSION INVALIDATED
		http.sessionManagement((sessionManagerConfigure)->{
			sessionManagerConfigure.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		});


		// ✅ JWT 인증 필터 주석 처리 (로그인 미사용 상태)
		// http.addFilterBefore(new JwtAuthorizationFilter(userRepository, jwtTokenProvider, redisUtil), LogoutFilter.class);

		// ✅ CORS 설정
		http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

		return http.build();
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
