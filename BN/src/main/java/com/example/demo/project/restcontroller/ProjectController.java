package com.example.demo.project.restcontroller;

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

    // ✅ 생성 응답을 DTO로 반환
    @PostMapping
    public ResponseEntity<ProjectResponseDto> create(@RequestBody ProjectCreateRequestDto dto) {
        Project created = projectService.create(dto);
        ProjectResponseDto response = projectService.toDto(created);
        return ResponseEntity.ok(response);
    }

    // ✅ 전체 조회 시도 DTO 변환 포함
    @GetMapping
    public ResponseEntity<List<ProjectResponseDto>> findAll() {
        List<Project> projects = projectService.findAll();
        List<ProjectResponseDto> responses = projects.stream()
                .map(projectService::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    // ✅ 단건 조회 DTO 응답
    @GetMapping("/{slug}")
    public ResponseEntity<ProjectResponseDto> findBySlug(@PathVariable String slug) {
        Project project = projectService.findBySlug(slug);
        return ResponseEntity.ok(projectService.toDto(project));
    }
}
