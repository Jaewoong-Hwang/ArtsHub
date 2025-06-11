package com.example.demo.user.repository;


import com.example.demo.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 이메일 중복 여부 (회원가입)
    boolean existsByEmail(String email);

    // 로그인, 사용자 조회 등에 사용
    Optional<User> findByEmail(String email);

    // PK로 조회 시 사용
    Optional<User> findById(Long userId);
}