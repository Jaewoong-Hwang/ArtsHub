package com.artshub.domain.admin.repository.user;

import com.artshub.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    long countByRoleAndHasPendingApprovalFalse(User.Role role);
    long countByHasPendingApprovalTrue();
    long countByRole(User.Role role);
}
