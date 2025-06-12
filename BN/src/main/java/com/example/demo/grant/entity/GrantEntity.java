package com.example.demo.grant.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "grant_info")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GrantEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String period;

    @Column(name = "detail_url", length = 255, unique = true)
    private String detailUrl;

    // ✅ 배지와 1:N 관계 설정
    @OneToMany(mappedBy = "grant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GrantBadgeEntity> badges = new ArrayList<>();
}
