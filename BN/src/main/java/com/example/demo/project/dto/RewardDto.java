package com.example.demo.project.dto;

import lombok.Data;
import java.util.List;

@Data
public class RewardDto {
    private String title;
    private int price;
    private List<String> options;
}