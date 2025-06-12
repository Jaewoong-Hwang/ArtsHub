// src/main/java/com/example/demo/project/entity/ProjectParticipant.java
package com.example.demo.project.entity;

import com.example.demo.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ 참가한 사용자
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    // ✅ 어떤 프로젝트에 참가했는지
    @ManyToOne(fetch = FetchType.LAZY)
    private Project project;
}