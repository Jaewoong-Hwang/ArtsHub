package com.example.demo.user.util;

import java.util.UUID;

public class RandomNicknameGenerator {

    public static String generate() {
        // 예: u_5f2a83c9
        return "u_" + UUID.randomUUID().toString().substring(0, 8);
    }
}
