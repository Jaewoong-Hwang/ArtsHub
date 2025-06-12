package com.example.demo.common.controller;

import com.example.demo.common.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class FileUploadController {

    private final FileService fileService;


    @PostMapping("/upload/profile")
    public ResponseEntity<?> uploadProfile(@RequestParam("file") MultipartFile file) {
        String fileName = fileService.upload(file, "profile");
        return ResponseEntity.ok(Map.of("fileName", fileName));
    }

    @PostMapping("/upload/thumbnail")
    public ResponseEntity<?> uploadThumbnail(@RequestParam("file") MultipartFile file) {
        String fileName = fileService.upload(file, "thumbnail");
        return ResponseEntity.ok(Map.of("fileName", fileName));
    }
}
