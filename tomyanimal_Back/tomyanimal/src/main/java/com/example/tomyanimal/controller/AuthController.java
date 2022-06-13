package com.example.tomyanimal.controller;

// 로그인 및 가입

import com.example.tomyanimal.exception.AppException;
import com.example.tomyanimal.model.Member;
import com.example.tomyanimal.model.Role;
import com.example.tomyanimal.model.RoleName;
import com.example.tomyanimal.payload.request.LoginRequest;
import com.example.tomyanimal.payload.request.SignUpRequest;
import com.example.tomyanimal.payload.response.ApiResponse;
import com.example.tomyanimal.payload.response.JwtAuthenticationResponse;
import com.example.tomyanimal.repository.MemberRepository;
import com.example.tomyanimal.repository.RoleRepository;
import com.example.tomyanimal.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUserPhoneNumberOrUserId(), loginRequest.getUserPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (memberRepository.existsByUserId(signUpRequest.getUserId())) {
            return new ResponseEntity(new ApiResponse(false, "이미 존재하는 아이디 입니다."), HttpStatus.BAD_REQUEST);
        }

        if (memberRepository.existsByUserPhoneNumber(signUpRequest.getPhoneNumber())) {
            return new ResponseEntity(new ApiResponse(false, "이미 존재하는 휴대폰 번호입니다."), HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        Member member = new Member(signUpRequest.getUserId(), signUpRequest.getUserName(), signUpRequest.getPhoneNumber(),
                signUpRequest.getUserPassword());

        member.setUserPassword(passwordEncoder.encode(member.getUserPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("유저 권한이 설정되지 않았습니다."));

        member.setRoles(Collections.singleton(userRole));

        Member result = memberRepository.save(member);


        // URL에 user이름 안바뀌면 여기 => ("/api/users/{username}")
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/{userId}")
                .buildAndExpand(result.getUserId()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "등록이 완료되었습니다."));
    }
}
