package com.example.demo.project.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Reward {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private int price;
    private String description;

    @OneToMany(mappedBy = "reward", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<RewardOption> options;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;
}
