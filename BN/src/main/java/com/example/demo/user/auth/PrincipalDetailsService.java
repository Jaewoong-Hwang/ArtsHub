package com.example.demo.user.auth;

import com.example.demo.user.Entity.User;
import com.example.demo.user.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    //로그인 시 Security가 호출하는 메서드. 사용자 ID로 DB 조회
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // username을 PK로 사용하기때문에 findById로 DB에서 사용자 조회
        Optional<User> userOptional = userRepository.findById(username);

        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다: " + username);
        }

        // 조회된 User 객체를 PrincipalDetails로 감싸서 반환
        return new PrincipalDetails(userOptional.get());
    }
}
