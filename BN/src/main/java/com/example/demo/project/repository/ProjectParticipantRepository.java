// src/main/java/com/example/demo/project/repository/ProjectParticipantRepository.java
package com.example.demo.project.repository;

import com.example.demo.project.entity.ProjectParticipant;
import com.example.demo.user.entity.User;
import com.example.demo.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectParticipantRepository extends JpaRepository<ProjectParticipant, Long> {
    boolean existsByUserAndProject(User user, Project project);
    long countByProject(Project project);
    Optional<ProjectParticipant> findByUserAndProject(User user, Project project);
    boolean existsByProject_IdAndUser_UserId(Long projectId, Long userId);


}