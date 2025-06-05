package com.example.demo.common.config.auth.principal;



import com.example.demo.user.dto.UserDto;
import com.example.demo.user.entity.User;
import com.example.demo.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class PrincipalDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		System.out.println("loadUserByUsername .. " + username);
		Optional<User> userOption  = userRepository.findById(username);
		if(userOption.isEmpty())
			throw new UsernameNotFoundException(username + " 존재하지 않는 계정입니다.");

		//entity-> dto
		UserDto userDto = UserDto.toDto( userOption.get()    );
		return new PrincipalDetails(userDto);
	}

}


