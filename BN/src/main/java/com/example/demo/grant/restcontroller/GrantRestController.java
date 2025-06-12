package com.example.demo.grant.restcontroller;

import com.example.demo.grant.dto.GrantDto;
import com.example.demo.grant.service.GrantCrawlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/grants")
public class GrantRestController {

    private final GrantCrawlerService crawlerService;

    /**
     * 🔍 크롤링된 공모사업 미리보기 (DB 저장 없음)
     * GET /api/grants/preview
     */
    @GetMapping("/preview")
    public ResponseEntity<List<GrantDto>> previewGrants() throws IOException {
        List<GrantDto> preview = crawlerService.previewGrants();
        return ResponseEntity.ok(preview);
    }

    /**
     * 💾 공모사업 크롤링 후 DB 저장
     * POST /api/grants/crawl
     */
    @PostMapping("/crawl")
    public ResponseEntity<String> crawlAndSave() {
        try {
            crawlerService.crawlAndSaveGrants();
            return ResponseEntity.ok("크롤링 및 저장 완료");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("❌ 크롤링 중 오류 발생: " + e.getMessage());
        }
    }

}
