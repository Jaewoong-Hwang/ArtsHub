package com.example.demo.user.Repository;


import com.example.demo.user.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    // username(PK)으로 User 찾는 기본 메서드는 자동 제공됨
}
