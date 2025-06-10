package com.example.demo.project.controller;

import com.example.demo.project.dto.ProjectCreateRequestDto;
import com.example.demo.project.entity.Project;
import com.example.demo.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<Project> create(@RequestBody ProjectCreateRequestDto dto) {
        Project created = projectService.create(dto);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<Project>> findAll() {
        return ResponseEntity.ok(projectService.findAll());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Project> findBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(projectService.findBySlug(slug));
    }
}