package com.example.demo.user.dto;

import com.example.demo.user.entity.User;
import com.example.demo.user.util.RandomNicknameGenerator;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
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

    @NotBlank(message = "이메일은 필수입니다.")
    @Email(message = "올바른 이메일 형식을 입력해주세요.")
    private String email;

    @Pattern(
            regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,20}$",
            message = "비밀번호는 영문, 숫자, 특수문자를 포함한 8~20자여야 합니다."
    )
    @NotBlank(message = "비밀번호는 필수입니다.")
    private String password;

    @NotBlank(message = "이름은 필수입니다.")
    private String name;

    private String nickname;         // 랜덤 생성 or 수정용
    private String phoneNumber;
    private String role;
    private String profileImage;
    private String address;
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
                .profileImage(this.profileImage != null ? this.profileImage : "default.png")
                .address(this.address)
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
                .address(user.getAddress())
                .build();
    }
}
