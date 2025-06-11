package com.example.demo.project.service;

import com.example.demo.project.dto.*;
import com.example.demo.project.entity.*;
import com.example.demo.project.repository.ProjectParticipantRepository;
import com.example.demo.project.repository.ProjectRepository;
import com.example.demo.project.util.SlugGenerator;
import com.example.demo.user.entity.User;
import com.example.demo.user.repository.UserRepository;
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
    private final ProjectParticipantRepository participantRepository;
    private final UserRepository userRepository;
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
        project.setStatus("모집중"); // ✅ 상태 초기화

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
     * 프로젝트 참여 처리
     */
    @Transactional
    public String joinProject(String slug, String email) {
        Project project = projectRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 프로젝트입니다."));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        if (participantRepository.existsByUserAndProject(user, project)) {
            return "이미 참여한 프로젝트입니다.";
        }

        long currentCount = participantRepository.countByProject(project);
        if (currentCount >= project.getCapacity()) {
            return "정원이 모두 찼습니다.";
        }

        ProjectParticipant participant = ProjectParticipant.builder()
                .user(user)
                .project(project)
                .build();
        participantRepository.save(participant);

        if (currentCount + 1 == project.getCapacity()) {
            project.setStatus("마감");
        }

        return "참여가 완료되었습니다.";
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
        dto.setStatus(project.getStatus());

        ProjectDescriptionDto descDto = new ProjectDescriptionDto();
        descDto.setSummary(project.getDescription().getSummary());
        descDto.setContent(project.getDescription().getContent());
        descDto.setPreviewUrl(project.getDescription().getPreviewUrl());
        descDto.setBackground(project.getDescription().getBackground());
        descDto.setRoles(project.getDescription().getRoles());
        descDto.setSchedule(project.getDescription().getSchedule());
        descDto.setCompensation(project.getDescription().getCompensation());
        dto.setDescription(descDto);

        List<RewardDto> rewardDtos = project.getRewards().stream().map(r -> {
            RewardDto rd = new RewardDto();
            rd.setTitle(r.getTitle());
            rd.setPrice(r.getPrice());
            rd.setDescription(r.getDescription());

            List<RewardOptionDto> optionDtos = r.getOptions().stream().map(opt -> {
                RewardOptionDto ro = new RewardOptionDto();
                ro.setOptionName(opt.getOptionName());
                ro.setOptionValues(opt.getOptionValues());
                return ro;
            }).collect(Collectors.toList());

            rd.setOptions(optionDtos);
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

        ProjectDescriptionDto descDto = dto.getDescription();
        ProjectDescription desc = new ProjectDescription();
        desc.setSummary(descDto.getSummary());
        desc.setContent(descDto.getContent());
        desc.setPreviewUrl(descDto.getPreviewUrl());
        desc.setBackground(descDto.getBackground());
        desc.setRoles(descDto.getRoles());
        desc.setSchedule(descDto.getSchedule());
        desc.setCompensation(descDto.getCompensation());
        project.setDescription(desc);

        List<Reward> rewards = dto.getRewards().stream().map(r -> {
            Reward reward = new Reward();
            reward.setTitle(r.getTitle());
            reward.setPrice(r.getPrice());
            reward.setDescription(r.getDescription());
            reward.setProject(project);

            List<RewardOption> optionEntities = r.getOptions().stream().map(opt -> {
                RewardOption option = new RewardOption();
                option.setOptionName(opt.getOptionName());
                option.setOptionValues(opt.getOptionValues());
                option.setReward(reward);
                return option;
            }).collect(Collectors.toList());

            reward.setOptions(optionEntities);
            return reward;
        }).collect(Collectors.toList());

        project.setRewards(rewards);
        return project;
    }
}