package com.example.demo.grant.service;

import com.example.demo.grant.dto.GrantDto;
import com.example.demo.grant.entity.GrantBadgeEntity;
import com.example.demo.grant.entity.GrantEntity;
import com.example.demo.grant.repository.GrantRepository;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GrantCrawlerService {

    private static final String BASE_URL = "https://thearts.arko.or.kr";
    private static final String TARGET_URL = BASE_URL + "/thearts/news/contest";

    private final GrantRepository grantRepository;

    public List<GrantDto> previewGrants() throws IOException {
        trustAllCertificates();
        return fetchGrants(false);
    }

    public List<GrantDto> crawlAndSaveGrants() throws IOException {
        trustAllCertificates();
        return fetchGrants(true);
    }

    public List<GrantDto> findAllGrants() {
        return grantRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    public List<GrantDto> findByBadgeName(String badge) {
        return grantRepository.findByBadgeName(badge).stream()
                .map(this::toDto)
                .toList();
    }

    public List<GrantDto> findByAnyBadge(List<String> badges) {
        return grantRepository.findByBadgeNames(badges).stream()
                .map(this::toDto)
                .toList();
    }

    private List<GrantDto> fetchGrants(boolean saveToDb) throws IOException {
        List<GrantDto> grantList = new ArrayList<>();
        int page = 1;

        while (true) {
            String pageUrl = TARGET_URL + "?page=" + page;
            Document doc = Jsoup.connect(pageUrl).get();
            Elements items = doc.select("div.output-list ul li");

            if (items.isEmpty()) break;

            for (Element item : items) {
                Element link = item.selectFirst("a");
                if (link == null) continue;

                String href = link.absUrl("href");
                String title = link.selectFirst("h2.title") != null ? link.selectFirst("h2.title").text() : "제목 없음";
                String date = link.selectFirst("p.date") != null ? link.selectFirst("p.date").text() : "기간 없음";

                // ✅ 배지 정보 수집
                Element badgeContainer = link.selectFirst("div.badges");
                List<String> badges = new ArrayList<>();
                if (badgeContainer != null) {
                    for (Element badge : badgeContainer.select("span.badge")) {
                        badges.add(badge.text());
                    }
                }

                // 중복 방지
                if (grantRepository.findByDetailUrl(href).isPresent()) continue;

                if (saveToDb) {
                    // ✅ 안전한 방식으로 직접 생성
                    GrantEntity grant = new GrantEntity();
                    grant.setTitle(title);
                    grant.setPeriod(date);
                    grant.setDetailUrl(href);

                    List<GrantBadgeEntity> badgeEntities = new ArrayList<>();
                    for (String badgeName : badges) {
                        GrantBadgeEntity badge = new GrantBadgeEntity();
                        badge.setName(badgeName);
                        badge.setGrant(grant);
                        badgeEntities.add(badge);
                    }

                    // ✅ 디버깅 로그 추가 위치
                    System.out.println("✅ 저장 직전 배지 리스트: " + badges);
                    System.out.println("👉 badgeEntities size: " + badgeEntities.size());

                    grant.setBadges(badgeEntities);

                    GrantEntity saved = grantRepository.save(grant);
                    grantList.add(toDto(saved));
                } else {
                    grantList.add(GrantDto.builder()
                            .title(title)
                            .period(date)
                            .detailUrl(href)
                            .badges(badges)
                            .build());
                }
            }

            if (++page > 10) break;
        }

        return grantList;
    }

    private void trustAllCertificates() {
        try {
            javax.net.ssl.TrustManager[] trustAllCerts = new javax.net.ssl.TrustManager[]{
                    new javax.net.ssl.X509TrustManager() {
                        public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                            return new java.security.cert.X509Certificate[0];
                        }

                        public void checkClientTrusted(java.security.cert.X509Certificate[] certs, String authType) {}
                        public void checkServerTrusted(java.security.cert.X509Certificate[] certs, String authType) {}
                    }
            };

            javax.net.ssl.SSLContext sc = javax.net.ssl.SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new java.security.SecureRandom());
            javax.net.ssl.HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
        } catch (Exception e) {
            throw new RuntimeException("SSL 인증 우회 설정 실패", e);
        }
    }

    private GrantDto toDto(GrantEntity entity) {
        List<String> badgeNames = entity.getBadges().stream()
                .map(GrantBadgeEntity::getName)
                .collect(Collectors.toList());

        return GrantDto.builder()
                .title(entity.getTitle())
                .period(entity.getPeriod())
                .detailUrl(entity.getDetailUrl())
                .badges(badgeNames)
                .build();
    }
}
