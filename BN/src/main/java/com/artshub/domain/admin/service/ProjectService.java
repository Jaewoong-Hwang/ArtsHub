package com.artshub.domain.admin.service;

import com.artshub.domain.admin.dto.ProjectChartResponseDto;
import com.artshub.domain.admin.repository.project.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.artshub.domain.user.entity.Project;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectChartResponseDto getProjectChartData() {
        List<Object[]> genreRows = projectRepository.countByGenre();
        Map<String, Long> genreStats = new LinkedHashMap<>();

        for (Object[] row : genreRows) {
            String genre = (String) row[0];
            Long count = (Long) row[1];
            genreStats.put(genre, count);
        }

        long settled = projectRepository.countByIsSettled(true);
        long pending = projectRepository.countByIsSettled(false);

        Map<String, Long> achievementStats = new LinkedHashMap<>();
        achievementStats.put("100% 이상", settled);
        achievementStats.put("0~99%", pending);

        return new ProjectChartResponseDto(genreStats, achievementStats);
    }
    public Map<String, Object> getProjectStatus() {
        Map<String, Object> result = new HashMap<>();

        // 1. 장르별 통계
        Map<String, Long> genreStats = new LinkedHashMap<>();
        for (Object[] row : projectRepository.countByGenre()) {
            String genre = (String) row[0];
            Long count = (Long) row[1];
            genreStats.put(genre, count);
        }
        result.put("genreStats", genreStats);

        // 2. 상태별 카운트
        result.put("total", projectRepository.count());
        result.put("planned", projectRepository.countByStatus(Project.ProjectStatus.PLANNED));
        result.put("inProgress", projectRepository.countByStatus(Project.ProjectStatus.IN_PROGRESS));
        result.put("completed", projectRepository.countByStatus(Project.ProjectStatus.COMPLETED));
        result.put("rejected", projectRepository.countByStatus(Project.ProjectStatus.REJECTED));

        // 3. 정산 상태별
        result.put("settled", projectRepository.countByIsSettled(true));
        result.put("pendingSettlement", projectRepository.countByIsSettled(false));

        // 이번 달 프로젝트 수
        result.put("monthlyProjectCount", projectRepository.countThisMonthProjects());

        // 이번 달 가장 많이 등록된 장르
        result.put("topGenre", projectRepository.findTopGenreThisMonth());

        return result;
    }

}
