package com.example.demo.project.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String slug;

    private String genre;
    private int capacity;
    private String deadline;
    private String thumbnail;
    private String descriptionSummary;

    @Embedded
    private ProjectDescription description;

    @ElementCollection
    private List<Reward> rewards;

    private int views;

    private LocalDateTime createdAt;
}