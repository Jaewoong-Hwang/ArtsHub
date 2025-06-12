package com.example.demo.project.util;

import org.springframework.stereotype.Component;

import java.text.Normalizer;
import java.util.regex.Pattern;

@Component
public class SlugGenerator {

    public String generate(String input) {
        // 1. 한글/영문/숫자/공백 허용 → 공백을 -로 바꾸고 나머지 특수문자는 제거
        String slug = input
                .toLowerCase()
                .replaceAll("[^\\p{L}\\p{Nd} ]+", "") // 글자(L), 숫자(Nd), 공백만 허용
                .trim()
                .replaceAll("\\s+", "-");

        // 2. 비어 있으면 기본값 반환
        return slug.isEmpty() ? "project" : slug;
    }
}