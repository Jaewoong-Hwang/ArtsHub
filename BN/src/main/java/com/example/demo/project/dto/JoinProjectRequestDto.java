package com.example.demo.project.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinProjectRequestDto {
    private String email; // ✅ 실제로 email을 담는 필드
}