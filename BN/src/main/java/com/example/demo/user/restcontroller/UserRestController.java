package com.example.demo.user.restcontroller;


import com.example.demo.config.auth.jwt.JwtTokenProvider;
import com.example.demo.config.auth.jwt.redis.RefreshTokenRepository;
import com.example.demo.user.Dto.UserDto;
import com.example.demo.user.Entity.User;
import com.example.demo.user.Repository.UserRepository;
import com.example.demo.user.auth.PrincipalDetails;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserRestController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;




    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody UserDto userDto) {
        User user = User.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .role("ROLE_USER")
                .build();

        userRepository.save(user);
        return ResponseEntity.ok("회원가입 성공");
    }


    /**
     * 로그인 요청을 처리하는 API
     * @param userDto 사용자가 입력한 ID/PW
     * @param response 쿠키 설정을 위한 HttpServletResponse
     * @return 로그인 결과 메시지
     */
    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto, HttpServletResponse response) {
        try {
            // 사용자가 입력한 ID/PW로 인증 시도 (인증 객체 생성)
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword())
            );

            // 인증 성공 → 토큰 발급
            String accessToken = jwtTokenProvider.generateAccessToken(authentication);
            String refreshToken = jwtTokenProvider.generateRefreshToken(authentication);

            // 발급한 AccessToken을 쿠키에 저장 (HttpOnly로 설정)
            Cookie accessCookie = new Cookie("accessToken", accessToken);
            accessCookie.setHttpOnly(true);        // JS에서 접근 불가능
            accessCookie.setSecure(false);         // HTTPS 아니면 false
            accessCookie.setPath("/");             // 모든 경로에서 전송됨
            accessCookie.setMaxAge(60 * 60);        // 1시간 (초 단위)
            response.addCookie(accessCookie);

            // 4. RefreshToken → Redis 저장 (7일 = 7 * 24 * 60 * 60 * 1000ms)
            String username = authentication.getName(); // principalDetails.getUsername()과 같음
            long refreshExpireMs = 7 * 24 * 60 * 60 * 1000L; // 7일
            refreshTokenRepository.save(username, refreshToken, refreshExpireMs);

            // 5. 성공 응답
            return ResponseEntity.ok("로그인 성공");

        } catch (AuthenticationException e) {
            // 인증 실패
            return ResponseEntity.status(401).body("로그인 실패: " + e.getMessage());
        }
    }

    @GetMapping("/api/user/me")
    public ResponseEntity<String> getMyInfo(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("인증되지 않은 사용자입니다.");
        }

        // PrincipalDetails → User → username 꺼내기
        Object principal = authentication.getPrincipal();

        if (principal instanceof PrincipalDetails principalDetails) {
            String username = principalDetails.getUser().getUsername();
            return ResponseEntity.ok("인증된 사용자: " + username);
        }

        return ResponseEntity.status(500).body("사용자 정보 확인 실패");
    }

    @PostMapping("/api/refresh-token")
    public ResponseEntity<String> refreshAccessToken(HttpServletRequest request, HttpServletResponse response) {
        // 1. 쿠키에서 refreshToken 추출
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return ResponseEntity.status(401).body("RefreshToken 쿠키 없음");
        }

        String refreshToken = null;
        for (Cookie cookie : cookies) {
            if ("refreshToken".equals(cookie.getName())) {
                refreshToken = cookie.getValue();
                break;
            }
        }

        if (refreshToken == null) {
            return ResponseEntity.status(401).body("RefreshToken 없음");
        }

        // 2. 토큰에서 username 추출
        String username = jwtTokenProvider.getUsernameFromToken(refreshToken);

        // 3. Redis에서 저장된 RefreshToken과 비교
        String storedToken = refreshTokenRepository.findByUsername(username);

        if (!refreshToken.equals(storedToken)) {
            return ResponseEntity.status(401).body("RefreshToken 일치하지 않음");
        }

        // 4. RefreshToken 유효 → AccessToken 재발급
        Authentication authentication = jwtTokenProvider.getAuthentication(refreshToken);
        String newAccessToken = jwtTokenProvider.generateAccessToken(authentication);

        // 5. 새 AccessToken을 쿠키로 응답
        Cookie newAccessCookie = new Cookie("accessToken", newAccessToken);
        newAccessCookie.setHttpOnly(true);
        newAccessCookie.setSecure(false);
        newAccessCookie.setPath("/");
        newAccessCookie.setMaxAge(60 * 60); // 1시간

        response.addCookie(newAccessCookie);

        return ResponseEntity.ok("AccessToken 재발급 완료");
    }


}
