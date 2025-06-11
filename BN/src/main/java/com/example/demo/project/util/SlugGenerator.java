package com.example.demo.project.util;

import org.springframework.stereotype.Component;

@Component
public class SlugGenerator {

    public String generate(String title) {
        return title.toLowerCase()
                .trim()
                .replaceAll("\\s+", "-")         // ✅ 공백 -> 하이픈
                .replaceAll("[^\\w-]", "")       // ✅ 문자/숫자/하이픈 외 제거
                .replaceAll("-{2,}", "-");       // ✅ 하이픈 2개 이상 -> 하나로
    }
}