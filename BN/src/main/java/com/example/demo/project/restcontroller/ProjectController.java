package com.example.demo.project.restcontroller;

import com.example.demo.project.dto.JoinProjectRequestDto;
import com.example.demo.project.dto.ProjectCreateRequestDto;
import com.example.demo.project.dto.ProjectResponseDto;
import com.example.demo.project.entity.Project;
import com.example.demo.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    // ✅ 프로젝트 생성
    @PostMapping
    public ResponseEntity<ProjectResponseDto> create(@RequestBody ProjectCreateRequestDto dto) {
        System.out.println("📦 받은 데이터: " + dto); // 디버깅 로그
        Project created = projectService.create(dto);
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
    public ResponseEntity<ProjectResponseDto> findBySlug(@PathVariable String slug) {
        Project project = projectService.findBySlug(slug);
        return ResponseEntity.ok(projectService.toDto(project));
    }

    // ✅ 프로젝트 참여 요청 처리 (email 기반)
    @PostMapping("/{slug}/join")
    public ResponseEntity<String> joinProject(
            @PathVariable String slug,
            @RequestBody JoinProjectRequestDto request
    ) {
        String resultMessage = projectService.joinProject(slug, request.getEmail());
        return ResponseEntity.ok(resultMessage);
    }

    // ✅ (선택) JSON 구조 디버깅용
    @PostMapping("/debug")
    public ResponseEntity<String> debugJson(@RequestBody ProjectCreateRequestDto dto) {
        System.out.println("🪵 DEBUG JSON: " + dto);
        return ResponseEntity.ok("🔍 JSON 로그 확인 완료!");
    }
}