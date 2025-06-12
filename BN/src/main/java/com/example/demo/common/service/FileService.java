package com.example.demo.common.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@Slf4j
public class FileService {

    private static final String BASE_UPLOAD_DIR = "C:/upload"; // 또는 "src/main/resources/static/img"

    public String upload(MultipartFile file, String subDir) {
        try {
            // 서브 디렉토리 지정 (예: profile, thumbnail 등)
            File dir = new File(BASE_UPLOAD_DIR + "/" + subDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // 저장할 파일명 (UUID_원본파일명)
            String originalFilename = file.getOriginalFilename();
            String savedFilename = UUID.randomUUID() + "_" + originalFilename;

            // 저장 경로 설정
            File dest = new File(dir, savedFilename);
            file.transferTo(dest);

            log.info(" 파일 저장 경로: {}", dest.getAbsolutePath());

            // 저장된 파일명만 반환 (혹은 전체 경로, 필요 시)
            return savedFilename;

        } catch (IOException e) {
            log.error("파일 저장 실패", e);
            throw new RuntimeException("파일 저장 실패");
        }
    }
}
