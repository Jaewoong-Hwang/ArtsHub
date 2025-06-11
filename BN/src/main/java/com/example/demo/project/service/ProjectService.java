package com.example.demo.project.service;

import com.example.demo.project.dto.*;
import com.example.demo.project.entity.Project;
import com.example.demo.project.entity.ProjectDescription;
import com.example.demo.project.entity.Reward;
import com.example.demo.project.repository.ProjectRepository;
import com.example.demo.project.util.SlugGenerator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final SlugGenerator slugGenerator;

    /**
     * 프로젝트 생성
     */
    @Transactional
    public Project create(ProjectCreateRequestDto dto) {
        Project project = toEntity(dto);

        // ✅ 슬러그 중복 방지 처리
        String baseSlug = slugGenerator.generate(dto.getTitle());
        String uniqueSlug = baseSlug;
        int counter = 1;
        while (projectRepository.existsBySlug(uniqueSlug)) {
            uniqueSlug = baseSlug + "-" + counter++;
        }
        project.setSlug(uniqueSlug);

        project.setViews(0);
        project.setCreatedAt(LocalDateTime.now());

        return projectRepository.save(project);
    }

    /**
     * 전체 프로젝트 조회
     */
    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    /**
     * 슬러그로 프로젝트 조회
     */
    public Project findBySlug(String slug) {
        return projectRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + slug));
    }

    /**
     * Project → DTO 변환
     */
    public ProjectResponseDto toDto(Project project) {
        ProjectResponseDto dto = new ProjectResponseDto();

        dto.setId(project.getId());
        dto.setTitle(project.getTitle());
        dto.setSlug(project.getSlug());
        dto.setGenre(project.getGenre());
        dto.setCapacity(project.getCapacity());
        dto.setDeadline(project.getDeadline());
        dto.setThumbnail(project.getThumbnail());
        dto.setDescriptionSummary(project.getDescriptionSummary());

        // ⬇️ description
        ProjectDescriptionDto descDto = new ProjectDescriptionDto();
        descDto.setSummary(project.getDescription().getSummary());
        descDto.setContent(project.getDescription().getContent());
        descDto.setPreviewUrl(project.getDescription().getPreviewUrl());
        dto.setDescription(descDto);

        // ⬇️ rewards
        List<RewardDto> rewardDtos = project.getRewards().stream().map(r -> {
            RewardDto rd = new RewardDto();
            rd.setTitle(r.getTitle());
            rd.setPrice(r.getPrice());
            rd.setOptions(r.getOptions());
            return rd;
        }).collect(Collectors.toList());

        dto.setRewards(rewardDtos);

        return dto;
    }

    /**
     * DTO → Entity 변환
     */
    private Project toEntity(ProjectCreateRequestDto dto) {
        Project project = new Project();

        project.setTitle(dto.getTitle());
        project.setGenre(dto.getGenre());
        project.setCapacity(dto.getCapacity());
        project.setDeadline(dto.getDeadline());
        project.setThumbnail(dto.getThumbnail());
        project.setDescriptionSummary(dto.getDescriptionSummary());

        // ⬇️ description
        ProjectDescriptionDto descDto = dto.getDescription();
        ProjectDescription desc = new ProjectDescription();
        desc.setSummary(descDto.getSummary());
        desc.setContent(descDto.getContent());
        desc.setPreviewUrl(descDto.getPreviewUrl());
        project.setDescription(desc);

        // ⬇️ rewards
        List<Reward> rewards = dto.getRewards().stream().map(r -> {
            Reward reward = new Reward();
            reward.setTitle(r.getTitle());
            reward.setPrice(r.getPrice());
            reward.setOptions(r.getOptions());
            reward.setProject(project); // ★ 순환 연결
            return reward;
        }).collect(Collectors.toList());

        project.setRewards(rewards);

        return project;
    }
}
