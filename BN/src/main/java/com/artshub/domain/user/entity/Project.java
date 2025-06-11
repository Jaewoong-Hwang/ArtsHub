package com.artshub.domain.user.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Project {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    @Enumerated(EnumType.STRING)
    private ProjectStatus status;  // PLANNED, IN_PROGRESS, COMPLETED, REJECTED

    private String genre;

    private Boolean isSettled;

    private LocalDateTime createdAt;

    // getter/setter 생략
    public enum ProjectStatus {
        PLANNED, IN_PROGRESS, COMPLETED, REJECTED
    }
}
