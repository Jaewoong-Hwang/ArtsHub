package com.artshub.domain.admin.repository.funding;

import com.artshub.domain.user.entity.Funding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public interface FundingRepository extends JpaRepository<Funding, Long> {

    // 월별 펀딩 금액 (성공한 펀딩만)
    @Query("""
        SELECT MONTH(f.createdAt), SUM(f.amount)
        FROM Funding f
        WHERE f.isSuccess = true
        GROUP BY MONTH(f.createdAt)
        ORDER BY MONTH(f.createdAt)
    """)
    List<Object[]> getMonthlyFundingRaw();

    default List<Long> getMonthlyFundingAmounts() {
        Map<Integer, Long> map = getMonthlyFundingRaw().stream()
                .collect(Collectors.toMap(
                        row -> ((Number) row[0]).intValue(),
                        row -> ((Number) row[1]).longValue()
                ));
        return IntStream.rangeClosed(1, 12)
                .mapToObj(m -> map.getOrDefault(m, 0L))
                .toList();
    }

    // 장르별 펀딩 금액
    @Query("""
        SELECT f.genre, SUM(f.amount)
        FROM Funding f
        WHERE f.isSuccess = true
        GROUP BY f.genre
    """)
    List<Object[]> getFundingAmountByGenre();

    // 성공 여부 통계 (is_success 기준) - JPQL
    @Query("""
        SELECT 
            SUM(CASE WHEN f.isSuccess = true THEN 1 ELSE 0 END),
            SUM(CASE WHEN f.isSuccess = false THEN 1 ELSE 0 END)
        FROM Funding f
    """)
    List<Object[]> getFundingSuccessCountRaw();  // ← Object[] → List<Object[]>

    default List<Long> getFundingSuccessRateGroups() {
        Object[] row = getFundingSuccessCountRaw().get(0);
        long success = ((Number) row[0]).longValue();
        long fail = ((Number) row[1]).longValue();
        return List.of(success, 0L, 0L, fail); // 중간 구간은 0으로 대체
    }
}
