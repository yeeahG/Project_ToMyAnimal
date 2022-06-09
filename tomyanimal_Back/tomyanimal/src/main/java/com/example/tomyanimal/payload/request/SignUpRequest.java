package com.example.tomyanimal.payload.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter

public class SignUpRequest {
    @NotBlank
    @Size(min = 4, max = 20)
    private String userId;

    @Size(min = 2, max = 15)
    private String userName;

    @NotBlank
    @Size(max = 15)
    private String phoneNumber;

    @NotBlank
    @Size(min=4, max = 20)
    private String userPassword;
}
