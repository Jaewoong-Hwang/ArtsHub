package com.example.demo.user.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "`user`")
public class User {

    @Id
    private String username; // ID로 사용할 값

    private String password;

    private String role; // ROLE_USER, ROLE_ADMIN 등
}
