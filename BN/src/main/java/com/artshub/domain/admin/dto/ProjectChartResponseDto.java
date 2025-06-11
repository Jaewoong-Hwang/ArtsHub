package com.artshub.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class ProjectChartResponseDto {
    private Map<String, Long> genreStats;
    private Map<String, Long> achievementStats;
}
