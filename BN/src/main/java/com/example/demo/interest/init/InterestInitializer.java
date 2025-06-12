package com.example.demo.interest.init;

import com.example.demo.interest.entity.Interest;
import com.example.demo.interest.repository.InterestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class InterestInitializer implements CommandLineRunner {

    private final InterestRepository interestRepository;

    @Override
    public void run(String... args) {
        List<String> defaultInterests = List.of("뮤지컬", "연극", "클래식", "국악", "어린이", "밴드", "무용", "재즈", "인디", "오페라", "퓨전", "퍼포먼스");

        for (String name : defaultInterests) {
            if (!interestRepository.existsByName(name)) {
                interestRepository.save(Interest.builder().name(name).build());
            }
        }

        System.out.println("관심분야 초기화 완료");
    }
}
