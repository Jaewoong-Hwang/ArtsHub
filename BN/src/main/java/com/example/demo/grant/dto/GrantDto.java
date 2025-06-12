package com.example.demo.grant.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GrantDto {
    private String title;       // 공모사업명
    private String period;      // 기간 (예: 2025.06.01 ~ 2025.06.30)
    private String detailUrl;   // 상세 페이지 URL
}
