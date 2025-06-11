package com.example.demo.mypage.dto;

import lombok.*;

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
    // TODO: 관심분야 필드도 원하면 추가
}
