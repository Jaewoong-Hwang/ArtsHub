package com.example.demo.common.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
public class FileService {

    private static final String UPLOAD_DIR = "C:/upload/profile"; // 또는 resources/static/img 등 원하는 경로

    public String save(MultipartFile file) {
        try {
            // 디렉토리 없으면 생성
            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // 저장할 파일명 설정 (예: UUID_원본파일명)
            String originalFilename = file.getOriginalFilename();
            String savedFilename = UUID.randomUUID() + "_" + originalFilename;

            // 실제 저장할 전체 경로
            File dest = new File(dir, savedFilename);

            // 저장
            file.transferTo(dest);

            return savedFilename;

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("파일 저장 실패");
        }
    }
}
