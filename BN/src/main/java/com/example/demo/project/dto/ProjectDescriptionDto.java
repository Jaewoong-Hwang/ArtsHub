package com.example.demo.project.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProjectDescriptionDto {
    private String summary;
    private String content;
    private String previewUrl;
    private String background;    // 기획 배경
    private String roles;         // 모집 역할
    private String schedule;      // 일정
    private String compensation;  // 보상
}