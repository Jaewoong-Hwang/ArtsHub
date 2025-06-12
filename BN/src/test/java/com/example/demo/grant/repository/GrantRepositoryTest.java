package com.example.demo.grant.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional // 테스트 후 롤백
public class GrantRepositoryTest {

    @Autowired
    private GrantRepository grantRepository;

    @Test
    void testSaveAndFind() {
        // 💾 테스트 데이터 저장
        GrantEntity grant = GrantEntity.builder()
                .title("테스트 공모")
                .period("2025.06.01 ~ 2025.06.30")
                .detailUrl("https://example.com/grant/test")
                .build();

        grantRepository.save(grant);

        // 🔍 detailUrl 기준으로 조회
        Optional<GrantEntity> found = grantRepository.findByDetailUrl("https://example.com/grant/test");

        // ✅ 확인
        assertTrue(found.isPresent());
        assertEquals("테스트 공모", found.get().getTitle());
    }
}
