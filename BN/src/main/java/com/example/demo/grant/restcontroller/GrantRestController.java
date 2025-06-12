package com.example.demo.grant.restcontroller;

import com.example.demo.grant.dto.GrantDto;
import com.example.demo.grant.service.GrantCrawlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/grants")
public class GrantRestController {

    private final GrantCrawlerService grantService;

    /**
     * 🔍 크롤링된 공모사업 미리보기 (DB 저장 없음)
     * GET /api/grants/preview
     */
    @GetMapping("/preview")
    public ResponseEntity<List<GrantDto>> previewGrants() throws IOException {
        List<GrantDto> preview = grantService.previewGrants();
        return ResponseEntity.ok(preview);
    }

    /**
     * 💾 공모사업 크롤링 후 DB 저장
     * POST /api/grants/crawl
     */
    @PostMapping("/crawl")
    public ResponseEntity<String> crawlAndSave() {
        try {
            grantService.crawlAndSaveGrants();
            return ResponseEntity.ok("크롤링 및 저장 완료");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("❌ 크롤링 중 오류 발생: " + e.getMessage());
        }
    }

    /**
     * 전체 공모사업 조회
     * GET /api/grants
     */
    @GetMapping
    public ResponseEntity<List<GrantDto>> getAllGrants() {
        List<GrantDto> grants = grantService.findAllGrants();
        return ResponseEntity.ok(grants);
    }

    /**
     * 특정 배지로 검색
     * GET /api/grants/badge?badge=시각
     */
    @GetMapping("/badge")
    public ResponseEntity<List<GrantDto>> searchByBadge(@RequestParam String badge) {
        List<GrantDto> result = grantService.findByBadgeName(badge);
        return ResponseEntity.ok(result);
    }

    /**
     * 여러 배지 중 하나라도 포함된 공모사업 검색
     * GET /api/grants/badges?badges=시각&badges=아트누리
     */
    @GetMapping("/badges")
    public ResponseEntity<List<GrantDto>> searchByBadges(@RequestParam List<String> badges) {
        List<GrantDto> result = grantService.findByAnyBadge(badges);
        return ResponseEntity.ok(result);
    }
}
