package com.example.demo.user.util;

import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@Service
public class SmsService {

    private final String API_KEY = "-";       // Solapi 콘솔에서 복사한 API Key
    private final String API_SECRET = "-"; // Solapi 콘솔에서 복사한 API Secret
    private final String SENDER = "-";          // 발신번호 사전 등록한 것

    public boolean sendSms(String to, String verificationCode) {
        OkHttpClient client = new OkHttpClient();

        // 하이픈 제거
        to = to.replaceAll("-", "");

        String json = "{"
                + "\"message\":{"
                + "\"to\":\"" + to + "\","
                + "\"from\":\"" + SENDER + "\","
                + "\"text\":\"[ArtsHub] 인증번호는 [" + verificationCode + "] 입니다.\""
                + "}"
                + "}";

        RequestBody body = RequestBody.create(json, MediaType.get("application/json"));

        Request request = new Request.Builder()
                .url("https://api.solapi.com/messages/v4/send")
                .post(body)
                .addHeader("Authorization", "Bearer " + API_KEY)
                .addHeader("Content-Type", "application/json")
                .build();

        try (Response response = client.newCall(request).execute()) {
            String responseBody = response.body().string();
            log.info("SMS 전송 응답: {}", responseBody);
            return response.isSuccessful();
        } catch (IOException e) {
            log.error("SMS 전송 실패", e);
            return false;
        }
    }
}
