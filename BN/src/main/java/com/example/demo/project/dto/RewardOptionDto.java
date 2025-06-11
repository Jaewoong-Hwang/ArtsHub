package com.example.demo.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RewardOptionDto {
    private String optionName;            // 예: 사이즈, 색상 등
    private List<String> optionValues;    // 예: [S, M, L]
}
