package com.example.demo.project.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class RewardOption {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String optionName;

    @ElementCollection
    @CollectionTable(name = "reward_option_values", joinColumns = @JoinColumn(name = "option_id"))
    @Column(name = "value")
    private List<String> optionValues;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reward_id")
    private Reward reward;
}
