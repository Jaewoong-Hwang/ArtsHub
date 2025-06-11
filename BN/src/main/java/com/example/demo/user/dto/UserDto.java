package com.example.demo.user.dto;

import com.example.demo.user.entity.User;
import com.example.demo.user.util.RandomNicknameGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {

    private Long userId;
    private String email;
    private String password;
    private String name;
    private String nickname;         // 랜덤 생성 or 수정용
    private String phoneNumber;
    private String role;
    private String profileImage;
    //OAUTH2 CLIENT INFO
    private String provider;
    private String providerId;

    // DTO → Entity
    public User toEntity() {
        return User.builder()
                .userId(this.userId)
                .email(this.email)
                .password(this.password)
                .name(this.name)
                .nickname(this.nickname != null ? this.nickname : RandomNicknameGenerator.generate())
                .phoneNumber(this.phoneNumber)
                .role(this.role != null ? this.role : "ROLE_USER")
                .profileImage(this.profileImage != null ? this.profileImage : "default.jpg")
                .build();
    }

    // Entity → DTO
    public static UserDto toDto(User user) {
        return UserDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .password(user.getPassword())
                .name(user.getName())
                .nickname(user.getNickname())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .profileImage(user.getProfileImage())
                .build();
    }
}
