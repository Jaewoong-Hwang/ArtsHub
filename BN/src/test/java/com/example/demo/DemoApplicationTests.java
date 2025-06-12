package com.example.demo;

import com.zaxxer.hikari.HikariDataSource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
class DemoApplicationTests {

	@TestConfiguration
	static class TestDataSourceConfig {
		@Bean
		public HikariDataSource dataSource() {
			HikariDataSource dataSource = new HikariDataSource();
			dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
			dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/testdb");
			dataSource.setUsername("root");
			dataSource.setPassword("1234");
			return dataSource;
		}
	}

	@Test
	void contextLoads() {
		System.out.println("✅ Spring Context 로딩 테스트 성공");
	}
}
