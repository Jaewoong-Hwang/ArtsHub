package com.artshub.domain.admin.controller;

import com.artshub.domain.admin.service.AdminChartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminChartController {

    private final AdminChartService chartService;

    @GetMapping("/chart-data")
    public ResponseEntity<Map<String, Object>> getChartData() {
        Map<String, Object> result = new HashMap<>();
        result.put("monthly", chartService.getMonthlyFundingChart());
        result.put("genre", chartService.getGenreFundingChart());
        result.put("successRate", chartService.getFundingSuccessRateChart());
        return ResponseEntity.ok(result);
    }
}