package com.artshub.domain.admin.repository.dashboard;

import com.artshub.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface AdminDashboardUserRepository extends JpaRepository<User, Long> {

    @Query("SELECT COUNT(u) FROM User u")
    Long getTotalUserCount();

    @Query("SELECT COUNT(u) FROM User u WHERE u.joinedAt >= :startOfMonth")
    Long getNewUserCount(@Param("startOfMonth") LocalDateTime startOfMonth);

    @Query("SELECT COUNT(u) FROM User u WHERE u.hasPendingApproval = true")
    Long getReportedUserCount();
}
