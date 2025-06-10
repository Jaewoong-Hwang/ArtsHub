package com.example.demo.project.service;

import com.example.demo.project.dto.ProjectCreateRequestDto;
import com.example.demo.project.dto.ProjectDescriptionDto;
import com.example.demo.project.dto.RewardDto;
import com.example.demo.project.entity.Project;
import com.example.demo.project.entity.ProjectDescription;
import com.example.demo.project.entity.Reward;
import com.example.demo.project.repository.ProjectRepository;
import com.example.demo.project.util.SlugGenerator;
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

    public Project create(ProjectCreateRequestDto dto) {
        Project project = new Project();
        project.setTitle(dto.getTitle());
        project.setSlug(slugGenerator.generate(dto.getTitle()));
        project.setGenre(dto.getGenre());
        project.setCapacity(dto.getCapacity());
        project.setDeadline(dto.getDeadline());
        project.setThumbnail(dto.getThumbnail());
        project.setDescriptionSummary(dto.getDescriptionSummary());

        ProjectDescription desc = new ProjectDescription();
        ProjectDescriptionDto descDto = dto.getDescription();
        desc.setSummary(descDto.getSummary());
        desc.setContent(descDto.getContent());
        desc.setPreviewUrl(descDto.getPreviewUrl());
        project.setDescription(desc);

        List<Reward> rewards = dto.getRewards().stream().map(r -> {
            Reward reward = new Reward();
            reward.setTitle(r.getTitle());
            reward.setPrice(r.getPrice());
            reward.setOptions(r.getOptions());
            return reward;
        }).collect(Collectors.toList());
        project.setRewards(rewards);

        project.setViews(0);
        project.setCreatedAt(LocalDateTime.now());

        return projectRepository.save(project);
    }

    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    public Project findBySlug(String slug) {
        return projectRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + slug));
    }
}