package com.artshub.domain.admin.controller;

import com.artshub.domain.admin.service.AdminDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getDashboard() {
        Map<String, List<Map<String, Object>>> response = new HashMap<>();

        response.put("funding", adminDashboardService.getFundingStats());
        response.put("project", adminDashboardService.getProjectStats());
        response.put("user", adminDashboardService.getUserStats());

        return ResponseEntity.ok(response);
    }
}
