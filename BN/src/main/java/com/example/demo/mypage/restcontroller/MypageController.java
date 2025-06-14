package com.example.demo.mypage.restcontroller;

import com.example.demo.common.config.auth.principal.PrincipalDetails;
import com.example.demo.common.service.FileService;
import com.example.demo.interest.entity.Interest;
import com.example.demo.interest.repository.InterestRepository;
import com.example.demo.mypage.Service.MypageService;
import com.example.demo.mypage.dto.MypageDto;
import com.example.demo.project.dto.MyProjectDto;
import com.example.demo.project.entity.Project;
import com.example.demo.project.repository.ProjectRepository;
import com.example.demo.project.service.ProjectService;
import com.example.demo.user.entity.Role;
import com.example.demo.user.entity.User;
import com.example.demo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/mypage") //
@RequiredArgsConstructor
public class MypageController {

    private final UserRepository userRepository;
    private final InterestRepository interestRepository;
    private final FileService fileService;
    private final String uploadDir = "upload/profile/";
    private final MypageService mypageService;
    private final ProjectService projectService;

    @PutMapping("/upgrade-role")
    public ResponseEntity<?> upgradeToExpert(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        }

        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();

        user.setRole(Role.ROLE_EXPERT);
        userRepository.save(user);

        return ResponseEntity.ok("전문가로 전환되었습니다.");
    }


    // 내 정보 조회 (마이페이지용)
    @Transactional
    @GetMapping("/me")
    public ResponseEntity<?> getMyPage(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        }

        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();

        List<String> interests = user.getInterests().stream()
                .map(Interest::getName)
                .collect(Collectors.toList());

        MypageDto dto = MypageDto.builder()
                .nickname(user.getNickname())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .address(user.getAddress())
                .profileImage(user.getProfileImage())
                .interests(interests)
                .role(user.getRole().name())
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
        user.setProfileImage(dto.getProfileImage()); //

        userRepository.save(user);

        return ResponseEntity.ok("수정 완료");
    }


    // 관심분야 수정 (이름 리스트로 받아 연관 설정)
    @PutMapping("/update-interests")
    public ResponseEntity<?> updateUserInterests(@RequestBody List<String> interestNames,
                                                 Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        }

        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        User user = principal.getUser();

        // 이름 기반 관심분야 찾기
        List<Interest> selected = interestRepository.findByNameIn(interestNames);
        user.setInterests(new HashSet<>(selected));
        userRepository.save(user);

        return ResponseEntity.ok("관심분야 수정 완료");
    }

    //프로필 이미지 변경
 //   @Transactional
//    @PostMapping("/upload-profile")
//    public ResponseEntity<String> uploadProfileImage(
 //           @RequestParam("file") MultipartFile file,
 //           @AuthenticationPrincipal PrincipalDetails principalDetails) {
//
  //       // 1. 파일 저장
 //       String savedFilename = fileService.save(file); // 예: "uuid_filename.jpg"
//
  //       // 2. DB에 저장
  //     User user = principalDetails.getUser();
  //      user.setProfileImage(savedFilename);
   //     userRepository.save(user);
//
   //      // 3. 프론트로 반환 (파일명만 전달)
     //   return ResponseEntity.ok(savedFilename);
   // }

    @PutMapping("/update-profile-image")
    public ResponseEntity<?> updateProfileImage(@RequestParam("fileName") String fileName,
                                                @AuthenticationPrincipal PrincipalDetails principal) {
        User user = principal.getUser();
        user.setProfileImage(fileName);
        userRepository.save(user);
        return ResponseEntity.ok("프로필 이미지가 저장되었습니다.");
    }

    //전문가전환
    @PutMapping("/convert-to-expert")
    public ResponseEntity<String> convertToExpert(@AuthenticationPrincipal PrincipalDetails principal) {
        String email = principal.getUsername();
        mypageService.convertToExpert(email);
        System.out.println("전문가 전환 요청됨 - 이메일: " + email);
        return ResponseEntity.ok("전문가로 전환 완료");
    }

    //일반으로전환
    @PutMapping("/convert-to-user")
    public ResponseEntity<String> convertToUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        }

        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        String email = principal.getUsername();

        mypageService.convertToUser(email);
        return ResponseEntity.ok("일반 유저로 전환 완료");
    }




    //내가 만든 프로젝트 조회
    @GetMapping("/my-projects")
    public ResponseEntity<?> getMyProjects(@AuthenticationPrincipal PrincipalDetails principal) {
        Long userId = principal.getUser().getUserId();
        List<MyProjectDto> result = projectService.findProjectsByCreator(userId);
        return ResponseEntity.ok(result);
    }




    @DeleteMapping("/projects/{projectId}")
    public ResponseEntity<?> deleteMyProject(@PathVariable Long projectId,
                                             @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long userId = principalDetails.getUser().getUserId();
        projectService.deleteProjectByOwner(projectId, userId);
        return ResponseEntity.ok("삭제 완료");
    }

}
