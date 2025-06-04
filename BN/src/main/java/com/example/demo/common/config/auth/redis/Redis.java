package com.example.demo.common.config.auth.redis;

import com.example.demo.common.config.auth.jwt.JwtProperties;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "JwtToken", timeToLive = JwtProperties.REFRESH_TOKEN_EXPIRATION_TIME)
@AllArgsConstructor
@Data
public class Redis {
    @Id
    private String email;
    private String refreshToken;
}