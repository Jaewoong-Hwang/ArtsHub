package com.example.demo;

import com.example.demo.grant.service.GrantCrawlerService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication

public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public CommandLineRunner run(GrantCrawlerService grantCrawlerService) {
		return args -> {
			System.out.println("🟡 크롤링 실행 중...");
			grantCrawlerService.crawlAndSaveGrants();
			System.out.println("🟢 크롤링 완료!");
		};
	}
}
