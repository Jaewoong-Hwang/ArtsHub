package com.artshub.domain.user.entity;

import com.artshub.domain.user.entity.Project;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Funding {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;  // 후원자

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;  // 후원 대상

    private Integer amount;

    private LocalDateTime createdAt;

    private Boolean isSuccess;

    private String genre;

    // getter/setter 생략
}
