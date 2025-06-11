package com.artshub.domain.admin.service;

import com.artshub.domain.admin.repository.funding.FundingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class AdminChartService {

    private final FundingRepository fundingRepo;

    public Map<String, Object> getMonthlyFundingChart() {
        List<String> labels = IntStream.rangeClosed(1, 12)
                .mapToObj(i -> i + "월")
                .toList();
        List<Long> values = fundingRepo.getMonthlyFundingAmounts(); // 12개

        return Map.of("labels", labels, "values", values);
    }

    public Map<String, Object> getGenreFundingChart() {
        List<Object[]> raw = fundingRepo.getFundingAmountByGenre();
        List<String> labels = raw.stream().map(r -> (String) r[0]).toList();
        List<Long> values = raw.stream().map(r -> ((Number) r[1]).longValue()).toList();

        return Map.of("labels", labels, "values", values);
    }

    public Map<String, Object> getFundingSuccessRateChart() {
        List<String> labels = List.of("100% 이상", "70~99%", "50~69%", "0~49%");
        List<Long> values = fundingRepo.getFundingSuccessRateGroups();
        return Map.of("labels", labels, "values", values);
    }
}

