package com.example.demo.project.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class ProjectDescription {
    private String summary;
    private String content;
    private String previewUrl;
}