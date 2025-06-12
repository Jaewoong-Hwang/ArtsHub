package com.example.demo.user.restcontroller;

import com.example.demo.common.config.auth.redis.RedisUtil;
import com.example.demo.user.util.EmailService;
import com.example.demo.user.util.SmsService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class VerificationController {

    private final RedisUtil redisUtil;
    private final SmsService smsService;
    private final EmailService emailService;

    // 실제 발송은 생략 (SMS 연동 필요)
    // 개발 테스트일때 true , 실제 전송시 false
    @Value("${app.dev-mode:true}")
    private boolean isDevMode;

    @PostMapping("/api/send-verification")
    public ResponseEntity<?> sendVerification(@RequestBody Map<String, String> request) {
        String phone = request.get("phoneNumber");
        if (phone == null || phone.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "전화번호는 필수입니다."));
        }

        // 인증번호 생성
        String code = String.valueOf((int)(Math.random() * 900000) + 100000);

        // Redis에 저장 (180초 동안 유효)
        redisUtil.setDataExpire("VERIFICATION:" + phone, code, 180);

        // 실제 문자 전송( 개발 모드 아닐때 )
//        if (!isDevMode) {
//            boolean success = smsService.sendSms(phone, code);
//            if (!success) {
//                return ResponseEntity.status(500).body(Map.of("message", "문자 전송에 실패했습니다."));
//            }
//        }



//        return isDevMode
//                ? ResponseEntity.ok(Map.of("message", "인증번호가 전송되었습니다.", "code", code)) // 자동입력용
//                : ResponseEntity.ok(Map.of("message", "인증번호가 전송되었습니다."));

        return ResponseEntity.ok(Map.of(
                "message", "인증번호가 전송되었습니다.",
                "code", code  // 항상 응답에 포함
        ));
    }


    @PostMapping("/api/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, String> request) {
        String phone = request.get("phoneNumber");
        String inputCode = request.get("code");

        if (phone == null || inputCode == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "전화번호와 인증번호를 입력해주세요."));
        }

        String savedCode = redisUtil.getStringData("VERIFICATION:" + phone);

        if (savedCode != null && savedCode.equals(inputCode)) {
            redisUtil.delete("VERIFICATION:" + phone); // 인증 성공 시 삭제
            return ResponseEntity.ok(Map.of("success", true));
        } else {
            return ResponseEntity.status(400).body(Map.of("success", false, "message", "인증번호가 일치하지 않습니다."));
        }
    }


    @PostMapping("/api/send-email-code")
    public ResponseEntity<?> sendEmailCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "이메일은 필수입니다."));
        }

        String code = String.valueOf((int)(Math.random() * 900000) + 100000);
        redisUtil.setDataExpire("EMAIL_CODE:" + email, code, 180); // 3분

        // 이메일 전송
        emailService.sendEmail(email, "[ArtsHub] 이메일 인증", "인증번호: " + code);


        if (isDevMode) {
            return ResponseEntity.ok(Map.of(
                    "message", "인증메일이 발송되었습니다.",
                    "code", code,
                    "devMode", true
            ));
        } else {
            return ResponseEntity.ok(Map.of(
                    "message", "인증메일이 발송되었습니다."
            ));
        }
    }


    @PostMapping("/api/verify-email-code")
    public ResponseEntity<?> verifyEmailCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");

        String saved = redisUtil.getStringData("EMAIL_CODE:" + email);

        if (saved != null && saved.equals(code)) {
            redisUtil.delete("EMAIL_CODE:" + email);
            return ResponseEntity.ok(Map.of("success", true));
        } else {
            return ResponseEntity.status(400).body(Map.of("success", false, "message", "인증번호가 일치하지 않습니다."));
        }
    }


}
