package com.artshub.domain.admin.controller;

import com.artshub.domain.admin.dto.ProjectChartResponseDto;
import com.artshub.domain.admin.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminProjectController {

    private final ProjectService projectService;

    @GetMapping("/project-chart-data")
    public ResponseEntity<?> getProjectChartData() {
        ProjectChartResponseDto data = projectService.getProjectChartData();
        return ResponseEntity.ok(data);
    }
    @GetMapping("/project-status")
    public ResponseEntity<Map<String, Object>> getProjectStatus() {
        return ResponseEntity.ok(projectService.getProjectStatus());
    }
}
