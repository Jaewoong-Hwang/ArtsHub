package com.example.demo.common.config.auth.principal;


import com.example.demo.common.config.auth.provider.GoogleUserinfo;
import com.example.demo.common.config.auth.provider.KakaoUserInfo;
import com.example.demo.common.config.auth.provider.NaverUserinfo;
import com.example.demo.common.config.auth.provider.OAuth2UserInfo;
import com.example.demo.user.dto.UserDto;
import com.example.demo.user.entity.Role;
import com.example.demo.user.entity.User;
import com.example.demo.user.repository.UserRepository;
import com.example.demo.user.util.RandomNicknameGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.Map;
import java.util.Optional;

@Service
public class PrincipalDetailsOAuth2Service extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        System.out.println("PrincipalDetailsOAuth2Service's loadUser invoke..");
//        System.out.println("userRequest : " + userRequest);
        System.out.println("userRequest.getClientRegistration() :" + userRequest.getClientRegistration());
//        System.out.println("userRequest.getAccessToken() : "+ userRequest.getAccessToken());
//        System.out.println("userRequest.getAdditionalParameters() : "+ userRequest.getAdditionalParameters());
//        System.out.println("userRequest.getAccessToken().getTokenValue() : "+ userRequest.getAccessToken().getTokenValue());
//        System.out.println("userRequest.getAccessToken().getTokenType().getValue() : "+ userRequest.getAccessToken().getTokenType().getValue());
//        System.out.println("userRequest.getAccessToken().getScopes() : "+ userRequest.getAccessToken().getScopes());

        //OAuth2UserInfo
        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println("oAuth2User : " + oAuth2User);
        System.out.println("getAttributes : " + oAuth2User.getAttributes());

        OAuth2UserInfo oAuth2UserInfo = null;
        //'kakao','naver','google','in-'
        String provider = userRequest.getClientRegistration().getRegistrationId();

        Map<String, Object> attributes = oAuth2User.getAttributes();

        Map<String, Object> properties = null;
        if (provider.startsWith("kakao")) {
            //카카오 로그인시
            Long id = (Long) attributes.get("id");
            LocalDateTime connected_at = OffsetDateTime.parse(attributes.get("connected_at").toString()).toLocalDateTime();
            properties = (Map<String, Object>) attributes.get("properties");
            Map<String, Object> kakao_account = (Map<String, Object>) attributes.get("kakao_account");
            System.out.println("id :" + id);
            System.out.println("connected_at :" + connected_at);
            System.out.println("properties :" + properties);
            oAuth2UserInfo = new KakaoUserInfo(id, connected_at, properties, kakao_account);


        } else if (provider.startsWith("naver")) {
            //네이버 로그인시
            Map<String, Object> response = (Map<String, Object>) attributes.get("response");
            String id = (String) response.get("id");
            oAuth2UserInfo = new NaverUserinfo(id, response);


        } else if (provider.startsWith("google")) {
            //구글 로그인시
            String id = (String) attributes.get("sub");
            oAuth2UserInfo = new GoogleUserinfo(id, attributes);


            //  GoogleUserinfo 내부 값 출력
            System.out.println(" oAuth2UserInfo.getEmail(): " + oAuth2UserInfo.getEmail());
            System.out.println(" oAuth2UserInfo.getName(): " + oAuth2UserInfo.getName());
            System.out.println(" oAuth2UserInfo.getProfileImage(): " + oAuth2UserInfo.getProfileImage());

        }

        System.out.println("oAuth2UserInfo : " + oAuth2UserInfo);


        // 최초 로그인시 로컬계정 DB 저장 처리
        String username = oAuth2UserInfo.getProvider() + "_" + oAuth2UserInfo.getProviderId();
        String password = passwordEncoder.encode("1234");
        String email = oAuth2UserInfo.getEmail();
        Optional<User> userOptional = userRepository.findByEmail(email);
        //UserDto 생성 (이유 : PrincipalDetails에 포함)
        //UserEntity 생성 (이유 : 최초 로그인시 DB 저장용도)
        UserDto userDto = null;
        if (userOptional.isEmpty()) {
            //최초 로그인(Dto , Entity)
            userDto = UserDto.builder()
                    .email(email)
                    .password(password)
                    .name(oAuth2UserInfo.getName() != null ? oAuth2UserInfo.getName() : "소셜유저") // 기본 이름
                    .nickname(RandomNicknameGenerator.generate())
                    .phoneNumber("010-0000-0000") // 소셜에서는 없으므로 기본값
                    .profileImage(oAuth2UserInfo.getProfileImage() != null ? oAuth2UserInfo.getProfileImage() : "default.jpg")
                    .role(Role.ROLE_USER)
                    .build();
            User user = userDto.toEntity();
            userRepository.save(user); //계정 등록
        } else {
            //기존 유저 존재(Dto)
            User user = userOptional.get();
            userDto = UserDto.toDto(user);
        }


        //PrincipalDetails 전달
        PrincipalDetails principalDetails = new PrincipalDetails();
        userDto.setProvider(provider);
        userDto.setProviderId(oAuth2UserInfo.getProviderId());
        principalDetails.setUserDto(userDto);
        principalDetails.setAttributes(oAuth2User.getAttributes());
        principalDetails.setAccess_token(userRequest.getAccessToken().getTokenValue());


        return principalDetails;

    }
}
