package team1.toMyAnimal.factory;

import team1.toMyAnimal.domain.dto.sign.SignInResponse;
import team1.toMyAnimal.domain.member.Member;

public class SignInResponseFactory {
    public static SignInResponse createSignInResponse(String accessToken, String refreshToken, Member member) {
        return new SignInResponse(accessToken, refreshToken, member.getId());
    }
}