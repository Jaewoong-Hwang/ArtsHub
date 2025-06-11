package com.artshub.domain.admin.controller;

import com.artshub.domain.admin.repository.user.UserRepository;
import com.artshub.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

// AdminUserController.java
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserRepository userRepository;

    @GetMapping("/user-stats")
    public Map<String, Object> getUserStats() {
        long activeUsers = userRepository.countByRoleAndHasPendingApprovalFalse(User.Role.USER);
        long pendingUsers = userRepository.countByHasPendingApprovalTrue();
        long expertUsers = userRepository.countByRoleAndHasPendingApprovalFalse(User.Role.EXPERT);
        long adminUsers = userRepository.countByRole(User.Role.ADMIN);

        List<String> labels = List.of("활동 중", "승인 대기", "전문가", "관리자");
        List<Long> data = List.of(activeUsers, pendingUsers, expertUsers, adminUsers);

        Map<String, Object> result = new HashMap<>();
        result.put("labels", labels);
        result.put("data", data);
        return result;
    }
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll(); // OK!
    }
}
