package com.example.demo.grant.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "grant_badge")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GrantBadgeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ 배지 이름 (예: "아트누리", "시각")
    @Column(nullable = false)
    private String name;

    // ✅ 공모사업과 다대일 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grant_id")
    private GrantEntity grant;
}
