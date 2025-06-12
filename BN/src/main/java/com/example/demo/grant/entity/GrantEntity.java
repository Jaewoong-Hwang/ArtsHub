package com.example.demo.grant.entity;

import jakarta.persistence.*;
import lombok.*;

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
}
