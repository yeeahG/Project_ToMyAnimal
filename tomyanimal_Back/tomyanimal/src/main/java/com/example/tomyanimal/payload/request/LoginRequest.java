package com.example.tomyanimal.payload.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LoginRequest {
    @NotBlank
    private String userPhoneNumberOrUserId;
    @NotBlank
    private String userPassword;
}
