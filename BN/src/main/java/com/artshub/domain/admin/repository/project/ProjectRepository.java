package com.artshub.domain.admin.repository.project;

import com.artshub.domain.user.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("SELECT p.genre, COUNT(p) FROM Project p GROUP BY p.genre")
    List<Object[]> countByGenre(); // genre, count

    long countByIsSettled(boolean isSettled);

    long countByStatus(Project.ProjectStatus status);

    @Query("SELECT COUNT(p) FROM Project p WHERE MONTH(p.createdAt) = MONTH(CURRENT_DATE) AND YEAR(p.createdAt) = YEAR(CURRENT_DATE)")
    long countThisMonthProjects();

    @Query("""
    SELECT p.genre
    FROM Project p
    WHERE MONTH(p.createdAt) = MONTH(CURRENT_DATE) AND YEAR(p.createdAt) = YEAR(CURRENT_DATE)
    GROUP BY p.genre
    ORDER BY COUNT(p) DESC
    LIMIT 1
""")
    String findTopGenreThisMonth();
}