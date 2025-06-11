package com.example.demo.user.restcontroller;

import com.example.demo.common.config.auth.jwt.JwtProperties;
import com.example.demo.common.config.auth.jwt.JwtTokenProvider;
import com.example.demo.common.config.auth.jwt.TokenInfo;
import com.example.demo.common.config.auth.principal.PrincipalDetails;
import com.example.demo.common.config.auth.redis.RedisUtil;
import com.example.demo.user.dto.UserDto;
import com.example.demo.user.repository.UserRepository;
import com.example.demo.user.util.RandomNicknameGenerator;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@Slf4j
public class RestUserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private RedisUtil redisUtil;


    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData, HttpServletResponse response) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 토큰 발급
            TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

            // Redis 저장
            redisUtil.setDataExpire("RT:" + username, tokenInfo.getRefreshToken(), JwtProperties.REFRESH_TOKEN_EXPIRATION_TIME);

            // 쿠키 생성
            ResponseCookie accessCookie = ResponseCookie.from(JwtProperties.ACCESS_TOKEN_COOKIE_NAME, tokenInfo.getAccessToken())
                    .httpOnly(true)
                    .path("/")
                    .maxAge(JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME)
                    .build();

            ResponseCookie usernameCookie = ResponseCookie.from("username", URLEncoder.encode(username, StandardCharsets.UTF_8))
                    .path("/")
                    .maxAge(JwtProperties.REFRESH_TOKEN_EXPIRATION_TIME)
                    .build();

            // 실제로 브라우저가 인식하도록 직접 response에 쿠키 세팅
            response.addHeader("Set-Cookie", accessCookie.toString());
            response.addHeader("Set-Cookie", usernameCookie.toString());

            return ResponseEntity.ok().body(Map.of("message", "로그인 성공"));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED).body("인증 실패");
        }
    }


    // 로그인 상태 확인
    @GetMapping("/api/user/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
            UserDto userDto = principal.getUserDto(); // 전체 정보 꺼냄

            return ResponseEntity.ok(Map.of(
                    "userId", userDto.getUserId(),
                    "email", userDto.getEmail(),
                    "name", userDto.getName(),
                    "nickname", userDto.getNickname(),
                    "phoneNumber", userDto.getPhoneNumber(),
                    "profile_image", userDto.getProfileImage(),
                    "role", userDto.getRole()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        }
    }

    // 회원가입 요청 처리 (React의 axios.post("/api/join"))
    @PostMapping("/api/join")
    public ResponseEntity<?> join(@Valid @RequestBody UserDto dto, BindingResult bindingResult) {
        log.info("회원가입 요청: {}", dto);

        if (bindingResult.hasErrors()) {
            String errorMsg = bindingResult.getFieldError().getDefaultMessage();
            return ResponseEntity.badRequest().body(Map.of("message", errorMsg));
        }

        if (bindingResult.hasErrors()) {
            String errorMsg = bindingResult.getFieldError().getDefaultMessage();
            return ResponseEntity.badRequest().body(Map.of("message", errorMsg));
        }

        // 아이디 중복 체크
        if (userRepository.existsByEmail(dto.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "이미 존재하는 아이디입니다."));
        }

        // 랜덤 닉네임 지정
        if (dto.getNickname() == null || dto.getNickname().isBlank()) {
            dto.setNickname(RandomNicknameGenerator.generate());
        }

        // 비밀번호 암호화
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        userRepository.save(dto.toEntity());

        return ResponseEntity.ok(Map.of("message", "회원가입 완료"));
    }

    // 권한 테스트용 API
    @GetMapping("/api/user")
    public ResponseEntity<?> user(Authentication authentication) {
        log.info("USER 접근: {}", authentication);
        return ResponseEntity.ok(Map.of(
                "email", authentication.getName(), // email 기반 인증이라면 명시적으로 변경
                "authorities", authentication.getAuthorities()
        ));
    }

    @GetMapping("/api/manager")
    public ResponseEntity<String> manager() {
        return ResponseEntity.ok("MANAGER 접근 성공");
    }

    @GetMapping("/api/admin")
    public ResponseEntity<String> admin() {
        return ResponseEntity.ok("ADMIN 접근 성공");
    }



    @GetMapping("/api/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        boolean exists = userRepository.existsByEmail(email);  // 이메일로 중복 확인
        if (exists) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("중복된 이메일입니다");
        } else {
            return ResponseEntity.ok("사용 가능한 이메일입니다");
        }
    }


    @PostMapping("/api/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        // 1. 쿠키에서 access-token / username 추출
        String accessToken = null;
        String username = null;

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie c : cookies) {
                if (c.getName().equals(JwtProperties.ACCESS_TOKEN_COOKIE_NAME)) {
                    accessToken = c.getValue();
                }
                if (c.getName().equals("username")) {
                    username = c.getValue();
                }
            }
        }

        // 2. Redis에서 RefreshToken 제거
        if (username != null) {
            redisUtil.delete("RT:" + username);
        }

        // 3. 쿠키 제거
        expireCookie(response, JwtProperties.ACCESS_TOKEN_COOKIE_NAME);
        expireCookie(response, "username");

        // 4. SecurityContext 제거
        SecurityContextHolder.clearContext();

        return ResponseEntity.ok().body(Map.of("message", "로그아웃 완료"));
    }

    private void expireCookie(HttpServletResponse response, String name) {
        Cookie cookie = new Cookie(name, null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
    }


}






