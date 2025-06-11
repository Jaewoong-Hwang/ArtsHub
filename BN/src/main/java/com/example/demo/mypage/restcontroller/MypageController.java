package com.example.demo.mypage.restcontroller;

import com.example.demo.common.config.auth.principal.PrincipalDetails;
import com.example.demo.interest.entity.Interest;
import com.example.demo.interest.repository.InterestRepository;
import com.example.demo.mypage.dto.MypageDto;
import com.example.demo.user.entity.User;
import com.example.demo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/mypage") //
@RequiredArgsConstructor
public class MypageController {

    private final UserRepository userRepository;
    private final InterestRepository interestRepository;

    @PutMapping("/upgrade-role")
    public ResponseEntity<?> upgradeToExpert(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        }

        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();

        user.setRole("EXPERT");
        userRepository.save(user);

        return ResponseEntity.ok("전문가로 전환되었습니다.");
    }


    // 내 정보 조회 (마이페이지용)
    @GetMapping("/me")
    public ResponseEntity<?> getMyPage(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        }

        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();

        MypageDto dto = MypageDto.builder()
                .nickname(user.getNickname())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .address(user.getAddress())
                .profileImage(user.getProfileImage())
                .build();

        return ResponseEntity.ok(dto);
    }

    // 내 정보 수정
    @PutMapping("/update")
    public ResponseEntity<?> updateMyPage(@RequestBody MypageDto dto, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        }

        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();

        user.setNickname(dto.getNickname());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setAddress(dto.getAddress());
        // TODO: 관심분야 저장 추가 가능

        userRepository.save(user);

        return ResponseEntity.ok("수정 완료");
    }

    // 관심분야 수정 (이름 리스트로 받아 연관 설정)
    @PutMapping("/update-interests")
    public ResponseEntity<?> updateUserInterests(@RequestBody List<String> interestNames,
                                                 Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();

        // DB에서 해당 이름들을 가진 관심분야 조회
        List<Interest> selected = interestRepository.findByNameIn(interestNames);

        // 관심분야 새로 설정
        Set<Interest> newInterests = new HashSet<>(selected);
        user.setInterests(newInterests);
        userRepository.save(user);

        return ResponseEntity.ok("관심분야 수정 완료");
    }
}
