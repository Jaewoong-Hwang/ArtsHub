package com.artshub.domain.admin.service;

import com.artshub.domain.admin.repository.dashboard.AdminDashboardFundingRepository;
import com.artshub.domain.admin.repository.dashboard.AdminDashboardProjectRepository;
import com.artshub.domain.admin.repository.dashboard.AdminDashboardUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

    private final AdminDashboardFundingRepository fundingRepo;
    private final AdminDashboardProjectRepository projectRepo;
    private final AdminDashboardUserRepository userRepo;

    public List<Map<String, Object>> getFundingStats() {
        Long total = fundingRepo.getTotalFundingAmount();
        Long monthly = fundingRepo.getMonthlyFundingAmount();

        return List.of(
                Map.of("label", "누적 펀딩 금액", "value", total != null ? total : 0),
                Map.of("label", "이번 달 펀딩 금액", "value", monthly != null ? monthly : 0)
        );
    }
    public List<Map<String, Object>> getProjectStats() {
        return List.of(
                Map.of("label", "전체", "value", projectRepo.getTotalProjectCount()),
                Map.of("label", "진행 중", "value", projectRepo.getInProgressCount()),
                Map.of("label", "정산 대기중", "value", projectRepo.getPendingSettlementCount())
        );
    }
    public List<Map<String, Object>> getUserStats() {
        LocalDateTime startOfMonth = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        return List.of(
                Map.of("label", "총 회원", "value", userRepo.getTotalUserCount()),
                Map.of("label", "신규 가입자", "value", userRepo.getNewUserCount(startOfMonth)),
                Map.of("label", "신고 대상자", "value", userRepo.getReportedUserCount())
        );
    }
}
