package com.example.tomyanimal.payload.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class BoardPostRequest {
    @NotBlank
    private String userId;
    @NotBlank
    private String title;
    private String content;
}
