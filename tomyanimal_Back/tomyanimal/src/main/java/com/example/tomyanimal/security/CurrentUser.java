package com.example.tomyanimal.security;

// 현재 로그인한 사용자에게 접근하는 사용자 정의
// security 관련 Annotation이 너무 많아 의존성이 높아지는것을 막기위한 코드
// 프로젝트에서 Spring security를 제거해야한다면 해당 클래스 변경으로 쉽게 제거
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.lang.annotation.*;

@Target({ElementType.PARAMETER, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@AuthenticationPrincipal
public @interface CurrentUser {

}