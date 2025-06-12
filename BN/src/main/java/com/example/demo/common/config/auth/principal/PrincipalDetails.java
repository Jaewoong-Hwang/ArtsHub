package com.example.demo.common.config.auth.principal;

import com.example.demo.user.dto.UserDto;
import com.example.demo.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrincipalDetails implements UserDetails, OAuth2User {

	private UserDto userDto;
	private User user;

	// 일반 로그인용 생성자
	public PrincipalDetails(User user) {
		this.user = user;
		this.userDto = UserDto.toDto(user); //  UserDto 자동 생성
	}

	// Oauth2User용
	private Map<String, Object> attributes;
	private String access_token;

	public PrincipalDetails(User user, Map<String, Object> attributes) {
		this.user = user;
		this.userDto = UserDto.toDto(user);
		this.attributes = attributes;
	}

	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	@Override
	public String getName() {
		// OAuth2에서 username 대신 email을 식별자로 사용
		return userDto.getEmail();
	}

	// UserDetails용
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(userDto.getRole().name()));

		return authorities;
	}

	@Override
	public String getPassword() {
		return userDto.getPassword();
	}

	@Override
	public String getUsername() {
		// 로그인 식별자: email 사용
		return userDto.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
