package com.example.demo.mypage.dto;

import com.example.demo.user.entity.Role;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MypageDto {
    private String nickname;
    private String email;
    private String phoneNumber;
    private String address;
    private String profileImage;
    private List<String> interests;
    private String role;
}
