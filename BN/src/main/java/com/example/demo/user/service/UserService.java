package com.example.demo.user.service;

import com.example.demo.user.entity.User;
import com.example.demo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // 이메일로 사용자 조회
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
