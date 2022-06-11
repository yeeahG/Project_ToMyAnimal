package com.example.tomyanimal.model;

import lombok.*;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Member {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NaturalId
    @NotBlank
    @Size(max = 20)
    private String userId;

    @NotBlank
    @Size(max = 15)
    private String userPhoneNumber;

    @NotBlank
    @Size(max = 15)
    private String userName;

    @NotBlank
    @Size(max = 100)
    private String userPassword;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "member_roles", joinColumns = @JoinColumn(name = "member_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    // Postman 입력 값
    public Member(String userId, String username, String phoneNumber, String password) {
        this.userId = userId;
        this.userName = username;
        this.userPhoneNumber = phoneNumber;
        this.userPassword = password;
    }
}
