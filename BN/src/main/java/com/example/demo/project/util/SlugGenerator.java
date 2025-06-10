package com.example.demo.project.util;

import org.springframework.stereotype.Component;

@Component
public class SlugGenerator {

    public String generate(String title) {
        return title.toLowerCase()
                .trim()
                .replaceAll("\s+", "-")
                .replaceAll("[^\w-]", "")
                .replaceAll("-{2,}", "-");
    }
}