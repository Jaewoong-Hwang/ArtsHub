package com.example.demo.user.restcontroller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeControllerlogin {

    @GetMapping("/home")
    public String home() {
        return "로그인 성공 후 이동한 페이지입니다.";
    }
}
