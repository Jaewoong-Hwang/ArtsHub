import com.example.demo.user.dto.UserDto;
import com.example.demo.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Slf4j
public class RestUserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 로그인 상태 확인 API
    @GetMapping("/api/user/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok(authentication.getName());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        }
    }

    // 회원가입 요청 처리 (React의 axios.post("/api/join"))
    @PostMapping("/api/join")
    public ResponseEntity<?> join(@RequestBody UserDto dto) {
        log.info("회원가입 요청: {}", dto);

        // 비밀번호 암호화
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        userRepository.save(dto.toEntity());

        return ResponseEntity.ok().body(Map.of("message", "회원가입 완료"));
    }

    // 관리자 페이지 접근 테스트용
    @GetMapping("/api/admin")
    public ResponseEntity<String> admin() {
        return ResponseEntity.ok("관리자 접근 성공");
    }

    // 매니저 페이지 접근 테스트용
    @GetMapping("/api/manager")
    public ResponseEntity<String> manager() {
        return ResponseEntity.ok("매니저 접근 성공");
    }

    // 일반 유저 페이지 접근 테스트용
    @GetMapping("/api/user")
    public ResponseEntity<?> user(Authentication authentication) {
        log.info("사용자 접근: {}", authentication);
        return ResponseEntity.ok(Map.of(
                "username", authentication.getName(),
                "authorities", authentication.getAuthorities()
        ));
    }
}


//package com.example.demo.user.restcontroller;
//
//
//import com.example.demo.user.dto.UserDto;
//import com.example.demo.user.repository.UserRepository;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.servlet.mvc.support.RedirectAttributes;
//
//@RestController
//@Slf4j
//public class RestUserController {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @GetMapping("/login")
//    public String login(Authentication authentication) {
//        log.info("GET /login...");
//
//        if(authentication!=null&& authentication.isAuthenticated()){
//            return "redirect:/";
//        }
//        return "login";
//    }
//
////	@GetMapping("/user")
////	public void user(Authentication authentication) {
////		log.info("GET /user..." + authentication);
////		log.info("name..." + authentication.getName());
////		log.info("principal..." + authentication.getPrincipal());
////		log.info("authorities..." + authentication.getAuthorities());
////		log.info("details..." + authentication.getDetails());
////		log.info("credential..." + authentication.getCredentials());
////	}
//
////	@GetMapping("/user")
////	public void user(@AuthenticationPrincipal Principal principal) {
////		log.info("GET /user..." + principal);
////	}
//
//    @GetMapping("/user")
//    public void user(Model model) {
//        log.info("GET /user...");
//        Authentication authenticaton =
//                SecurityContextHolder.getContext().getAuthentication();
//        log.info("authentication : " + authenticaton);
//
//        model.addAttribute("auth", authenticaton);
//
//    }
//
//    @GetMapping("/manager")
//    public void manager() {
//        log.info("GET /manager...");
//    }
//
//    @GetMapping("/admin")
//    public void admin() {
//        log.info("GET /admin...");
//    }
//
//
//    @GetMapping("/join")
//    public void join() {
//        log.info("GET /join..");
//    }
//
//    @PostMapping("/join")
//    public String join_post(UserDto dto, RedirectAttributes redirectAttributes) {
//        log.info("POST /join.." + dto);
//
//        //DTO->ENTITY(DB저장) , ENTITY->DTO(뷰로전달)
//        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
//        userRepository.save(dto.toEntity());
//
//        boolean isJoin = true;
//        if (isJoin) {
//            redirectAttributes.addFlashAttribute("message", "회원가입 완료!");
//            return "redirect:/login";
//        } else
//            return "join";
//    }
//
//}
//
//
//
