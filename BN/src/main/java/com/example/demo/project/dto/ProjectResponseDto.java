package com.example.demo.project.dto;

import com.example.demo.user.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
    private String status;
    private int currentMembers;
    @JsonProperty("joined")
    private boolean joined;
    private String creatorNickname;

    // 썸네일 전체 URL 반환용
    public String getThumbnailUrl() {
        if (thumbnail == null || thumbnail.isBlank()) return null;
        return "http://localhost:8090/img/thumbnail/" + thumbnail;
    }

}
