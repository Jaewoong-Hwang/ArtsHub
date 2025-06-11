package com.example.demo.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Lob;
import lombok.Data;

@Data
@Embeddable
public class ProjectDescription {
    private String summary;
    private String content;

    @Lob
    @Column(columnDefinition = "LONGTEXT") // ✅ Base64 긴 문자열 저장
    private String previewUrl;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String background;   // 기획 배경

    @Lob
    @Column(columnDefinition = "TEXT")
    private String roles;        // 모집 역할

    @Lob
    @Column(columnDefinition = "TEXT")
    private String schedule;     // 일정

    @Lob
    @Column(columnDefinition = "TEXT")
    private String compensation; // 보상
}