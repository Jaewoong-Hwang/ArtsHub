package com.example.demo.project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RewardDto {
    private String title;
    private int price;
    private String description;
    private List<RewardOptionDto> options;}