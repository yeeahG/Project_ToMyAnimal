package com.example.tomyanimal.security;

import com.example.tomyanimal.model.Member;
import com.example.tomyanimal.repository.MemberRepository;
import com.example.tomyanimal.security.UserPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    MemberRepository memberRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userPhoneNumberOrUserId) throws UsernameNotFoundException {
        // 휴대폰 번호 또는 아이디로 로그인
        Member member = memberRepository.findByUserPhoneNumberOrUserId(userPhoneNumberOrUserId, userPhoneNumberOrUserId).orElseThrow(
                () -> new UsernameNotFoundException("User not found with phonenumber or id : " + userPhoneNumberOrUserId));

        return UserPrincipal.create(member);
    }

    // This method is used by JWTAuthenticationFilter
    @Transactional
    public UserDetails loadUserById(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + id));

        return UserPrincipal.create(member);
    }
}
