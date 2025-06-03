package com.example.demo.config.auth.jwt.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

/**
 * Redis를 이용한 RefreshToken 저장소 구현체
 */
@Repository
@RequiredArgsConstructor
public class RefreshTokenRepositoryImpl implements RefreshTokenRepository {

    private final StringRedisTemplate redisTemplate;

    // username을 key로, refreshToken을 value로 저장
    @Override
    public void save(String username, String refreshToken, long expirationMs) {
        redisTemplate.opsForValue().set(username, refreshToken, expirationMs, TimeUnit.MILLISECONDS);
    }

    // username으로 저장된 refreshToken 조회
    @Override
    public String findByUsername(String username) {
        return redisTemplate.opsForValue().get(username);
    }

    // username으로 저장된 refreshToken 삭제
    @Override
    public void delete(String username) {
        redisTemplate.delete(username);
    }
}
