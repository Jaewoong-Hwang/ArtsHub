package com.example.demo.interest.repository;

import com.example.demo.interest.entity.Interest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestRepository extends JpaRepository<Interest, Long> {
    // 관심분야 이름들로 검색
    List<Interest> findByNameIn(List<String> names);

    // (선택) 단일 이름으로 중복 확인용
    boolean existsByName(String name);
}
