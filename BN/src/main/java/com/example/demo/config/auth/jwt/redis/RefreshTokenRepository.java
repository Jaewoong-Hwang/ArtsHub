package com.example.demo.config.auth.jwt.redis;

/**
 * RefreshToken 저장/조회/삭제 기능 정의
 */
public interface RefreshTokenRepository {
    void save(String username, String refreshToken, long expirationMs);
    String findByUsername(String username);
    void delete(String username);
}
