package com.example.tomyanimal.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
public class UserProfile {
    private Long id;
    private String userId;
    private String userName;
    private Instant joinedAt;
}
