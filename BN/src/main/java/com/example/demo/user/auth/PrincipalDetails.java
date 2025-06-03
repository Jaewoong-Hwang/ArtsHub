package com.example.demo.user.auth;

import com.example.demo.user.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Getter
@AllArgsConstructor
public class PrincipalDetails implements UserDetails {

    // 로그인한 사용자의 정보를 담고 있는 객체
    // 우리가 만든 User 엔티티를 이 클래스에 포함시켜서,
    // Security가 사용하는 인증 객체로 포장해주는 역할
    private final User user;

    // 사용자의 권한(Role)을 반환
    // 예: ROLE_USER, ROLE_ADMIN
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 사용자 1명당 권한 1개라고 가정하고, 하나만 반환함
        return Collections.singleton(() -> user.getRole());
    }

    // 로그인에 사용되는 비밀번호
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    // 로그인에 사용되는 사용자 ID (username)
    @Override
    public String getUsername() {
        return user.getUsername();
    }

    // 계정이 만료되지 않았는가? → true면 사용 가능
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정이 잠겨있지 않은가? → true면 사용 가능
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    //  비밀번호가 만료되지 않았는가? → true면 사용 가능
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 계정이 활성화되어 있는가? → true면 사용 가능
    @Override
    public boolean isEnabled() {
        return true;
    }
}
