package com.example.demo.grant.repository;

import com.example.demo.grant.entity.GrantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GrantRepository extends JpaRepository<GrantEntity, Long> {
    Optional<GrantEntity> findByDetailUrl(String detailUrl);
}
