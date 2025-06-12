package com.example.demo.interest.restcontroller;

import com.example.demo.interest.entity.Interest;
import com.example.demo.interest.repository.InterestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/interests")
@RequiredArgsConstructor
public class InterestController {

    private final InterestRepository interestRepository;

    // 관심분야 전체 조회 API
    @GetMapping
    public ResponseEntity<?> getAllInterests() {
        List<Interest> interests = interestRepository.findAll();

        List<Map<String, Object>> result = interests.stream()
                .map(interest -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("interestId", interest.getInterestId());
                    map.put("name", interest.getName());
                    return map;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

}
