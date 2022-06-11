package com.example.tomyanimal.controller;

import com.example.tomyanimal.exception.ResourceNotFoundException;
import com.example.tomyanimal.model.Member;
import com.example.tomyanimal.payload.UserIdentityAvailability;
import com.example.tomyanimal.payload.UserSummary;
import com.example.tomyanimal.repository.MemberRepository;
import com.example.tomyanimal.security.CurrentUser;
import com.example.tomyanimal.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class MemberController {
    @Autowired
    private MemberRepository memberRepository;

    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @GetMapping("/member/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser){
        UserSummary userSummary = new UserSummary(currentUser.getId(), currentUser.getUserId() , currentUser.getUsername());

        return userSummary;
    }

    @GetMapping("/user/checkUserIdAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String userId) {
        Boolean isAvailable = !memberRepository.existsByUserId(userId);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "phoneNumber") String userPhoneNumber) {
        Boolean isAvailable = !memberRepository.existsByUserPhoneNumber(userPhoneNumber);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{userId}")
    public UserSummary getUserProfile(@PathVariable(value = "userId") String userId) {
        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Member", "userId", userId));


        UserSummary userSummary = new UserSummary(member.getId(), member.getUserId(), member.getUserName());

        return userSummary;
    }

    @PostMapping("/users/delete")
    public String delete(String userId, String userPassword){
        Member member = memberRepository.findByUserId(userId)
                .get();
        Member member1 = memberRepository.findByUserPassword(userPassword).get();

        System.out.println("id :"+ member + "pw:"+member1);
        return "";
    }








}
