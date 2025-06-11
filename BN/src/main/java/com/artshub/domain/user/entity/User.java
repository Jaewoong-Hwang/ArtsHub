package com.artshub.domain.user.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "users")
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;      // 아이디
    private String name;          // 이름

    @Enumerated(EnumType.STRING)
    private Role role;            // USER, EXPERT, ADMIN

    private LocalDateTime joinedAt;

    private Boolean hasPendingApproval; // 승인 대기 여부

    // getter/setter 생략
    public enum Role {
        USER, EXPERT, ADMIN
    }
}

