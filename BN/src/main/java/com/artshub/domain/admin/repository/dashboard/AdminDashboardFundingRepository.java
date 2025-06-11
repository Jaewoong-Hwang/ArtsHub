package com.artshub.domain.admin.repository.dashboard;

import com.artshub.domain.user.entity.Funding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminDashboardFundingRepository extends JpaRepository<Funding, Long> {

    @Query("SELECT SUM(f.amount) FROM Funding f WHERE f.isSuccess = true")
    Long getTotalFundingAmount();

    @Query("SELECT SUM(f.amount) FROM Funding f WHERE f.isSuccess = true AND MONTH(f.createdAt) = MONTH(CURRENT_DATE) AND YEAR(f.createdAt) = YEAR(CURRENT_DATE)")
    Long getMonthlyFundingAmount();
}
