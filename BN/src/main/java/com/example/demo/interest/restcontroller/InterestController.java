package com.example.demo.interest.restcontroller;

import com.example.demo.interest.entity.Interest;
import com.example.demo.interest.repository.InterestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interests")
@RequiredArgsConstructor
public class InterestController {

    private final InterestRepository interestRepository;

    // 관심분야 전체 조회 API
    @GetMapping
    public ResponseEntity<List<Interest>> getAllInterests() {
        List<Interest> interests = interestRepository.findAll();
        return ResponseEntity.ok(interests);
    }
}
