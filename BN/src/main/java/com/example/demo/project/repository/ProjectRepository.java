package com.example.demo.project.repository;

import com.example.demo.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findBySlug(String slug);
    boolean existsBySlug(String slug);
    @Query("SELECT p FROM Project p WHERE p.creator.userId = :userId")
    List<Project> findByCreatorUserId(@Param("userId") Long userId);

    @Query("SELECT p FROM Project p LEFT JOIN FETCH p.creator")
    List<Project> findAllWithCreator();
}