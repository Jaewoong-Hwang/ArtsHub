package com.example.demo.grant.repository;

import com.example.demo.grant.entity.GrantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GrantRepository extends JpaRepository<GrantEntity, Long> {
    Optional<GrantEntity> findByDetailUrl(String detailUrl);

    // ✅ 특정 배지를 가진 공모사업만 조회
    @Query("SELECT g FROM GrantEntity g JOIN g.badges b WHERE b.name = :badgeName")
    List<GrantEntity> findByBadgeName(String badgeName);

    // ✅ 여러 배지 중 하나라도 포함된 공모사업 조회 (IN 조건)
    @Query("SELECT DISTINCT g FROM GrantEntity g JOIN g.badges b WHERE b.name IN :badgeNames")
    List<GrantEntity> findByBadgeNames(List<String> badgeNames);
}
