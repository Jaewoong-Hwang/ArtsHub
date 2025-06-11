package com.example.demo.project.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProjectResponseDto {
    private Long id;
    private String title;
    private String slug;
    private String genre;
    private int capacity;
    private String deadline;
    private String thumbnail;
    private String descriptionSummary;
    private ProjectDescriptionDto description;
    private List<RewardDto> rewards;
}
