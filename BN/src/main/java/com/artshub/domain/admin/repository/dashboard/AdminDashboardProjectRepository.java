package com.artshub.domain.admin.repository.dashboard;

import com.artshub.domain.user.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminDashboardProjectRepository extends JpaRepository<Project, Long> {

    @Query("SELECT COUNT(p) FROM Project p")
    Long getTotalProjectCount();

    @Query("SELECT COUNT(p) FROM Project p WHERE p.status = 'IN_PROGRESS'")
    Long getInProgressCount();

    @Query("SELECT COUNT(p) FROM Project p WHERE p.isSettled = false AND p.status = 'COMPLETED'")
    Long getPendingSettlementCount();
}
