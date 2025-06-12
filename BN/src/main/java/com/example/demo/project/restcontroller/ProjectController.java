package com.example.demo.project.restcontroller;

import com.example.demo.common.config.auth.principal.PrincipalDetails;
import com.example.demo.project.dto.ProjectCreateRequestDto;
import com.example.demo.project.dto.ProjectResponseDto;
import com.example.demo.project.entity.Project;
import com.example.demo.project.service.ProjectService;
import com.example.demo.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final UserService userService;

    // ✅ 프로젝트 생성
    @PostMapping
    public ResponseEntity<ProjectResponseDto> create(
            @RequestBody ProjectCreateRequestDto dto,
            @AuthenticationPrincipal PrincipalDetails principal
    ) {
        Long userId = principal.getUser().getUserId(); // 로그인한 유저 ID 가져오기
        Project created = projectService.create(dto, userId);
        return ResponseEntity.ok(projectService.toDto(created));
    }


    // ✅ 전체 프로젝트 목록 조회
    @GetMapping
    public ResponseEntity<List<ProjectResponseDto>> findAll() {
        List<Project> projects = projectService.findAll();
        List<ProjectResponseDto> responses = projects.stream()
                .map(projectService::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    // ✅ 슬러그 기반 프로젝트 단건 조회
    @GetMapping("/{slug}")
    public ResponseEntity<ProjectResponseDto> findBySlug(
            @PathVariable String slug,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long userId = null;
        if (userDetails != null) {
            // email → userId 조회
            userId = userService.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("사용자 없음"))
                    .getUserId();
        }

        ProjectResponseDto responseDto = projectService.findBySlug(slug, userId);
        return ResponseEntity.ok(responseDto);
    }


    // ✅ 🔁 프로젝트 참여 요청 (인증 사용자 기반 리팩토링)
    @PostMapping("/{slug}/join")
    public ResponseEntity<String> joinProject(
            @PathVariable String slug,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        String email = userDetails.getUsername(); // 로그인된 사용자의 이메일
        String resultMessage = projectService.joinProject(slug, email);
        return ResponseEntity.ok(resultMessage);
    }

    // ✅ 프로젝트 참여 여부 확인
    @GetMapping("/{slug}/has-joined")
    public ResponseEntity<Boolean> hasJoined(
            @PathVariable String slug,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails == null) {
            return ResponseEntity.ok(false); // 로그인하지 않은 경우 false
        }

        String email = userDetails.getUsername();
        boolean result = projectService.hasUserJoined(slug, email);
        return ResponseEntity.ok(result); // true 또는 false 반환
    }

    // ✅ (선택) JSON 구조 디버깅용
    @PostMapping("/debug")
    public ResponseEntity<String> debugJson(@RequestBody ProjectCreateRequestDto dto) {
        System.out.println("🪵 DEBUG JSON: " + dto);
        return ResponseEntity.ok("🔍 JSON 로그 확인 완료!");
    }


    @DeleteMapping("/{slug}/leave")
    public ResponseEntity<String> leaveProject(
            @PathVariable String slug,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        String email = userDetails.getUsername();
        String resultMessage = projectService.leaveProject(slug, email);
        return ResponseEntity.ok(resultMessage);
    }

}
