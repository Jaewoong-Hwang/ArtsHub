package com.example.demo.grant.service;

import com.example.demo.grant.dto.GrantDto;
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

@Service
@RequiredArgsConstructor
public class GrantCrawlerService {

    private static final String BASE_URL = "https://thearts.arko.or.kr";
    private static final String TARGET_URL = BASE_URL + "/thearts/news/contest";

    private final GrantRepository grantRepository;

    /**
     * 🔍 크롤링된 공모사업 미리보기 (저장 X)
     */
    public List<GrantDto> previewGrants() throws IOException {
        trustAllCertificates();
        return fetchGrants(false);
    }

    /**
     * 💾 크롤링 후 DB 저장
     */
    public List<GrantDto> crawlAndSaveGrants() throws IOException {
        trustAllCertificates();
        return fetchGrants(true);
    }

    /**
     * 📌 공모사업 크롤링 수행 (DB 저장 여부 선택)
     */
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

                // 중복 방지
                if (grantRepository.findByDetailUrl(href).isPresent()) continue;

                if (saveToDb) {
                    // DB 저장
                    GrantEntity saved = grantRepository.save(
                            GrantEntity.builder()
                                    .title(title)
                                    .period(date)
                                    .detailUrl(href)
                                    .build()
                    );

                    // 반환용 DTO 생성
                    grantList.add(toDto(saved));
                } else {
                    // 미리보기용 DTO만 생성
                    grantList.add(GrantDto.builder()
                            .title(title)
                            .period(date)
                            .detailUrl(href)
                            .build()
                    );
                }
            }

            if (++page > 10) break;
        }

        return grantList;
    }

    /**
     * 🔒 HTTPS 인증 무시 설정 (크롤링용)
     */
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

    /**
     * ✅ Entity → DTO 변환
     */
    private GrantDto toDto(GrantEntity entity) {
        return GrantDto.builder()
                .title(entity.getTitle())
                .period(entity.getPeriod())
                .detailUrl(entity.getDetailUrl())
                .build();
    }
}
