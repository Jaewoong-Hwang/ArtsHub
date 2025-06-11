package com.example.demo.common.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;

/**
 * 🔧 전역 캐시 설정 클래스
 * - @EnableCaching 을 통해 Spring Cache 기능 활성화
 * - EhCache, Redis, Caffeine 등 다양한 캐시 전략 적용 시 확장 가능
 */
@Configuration
@EnableCaching
public class CacheConfig {
    // 기본 설정은 필요 없음
    // EhCache의 경우 ehcache.xml 설정만 있으면 자동 적용됨
}
