package com.example.demo.project.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.List;

@Data
@Embeddable
public class Reward {
    private String title;
    private int price;

    @ElementCollection
    private List<String> options;
}