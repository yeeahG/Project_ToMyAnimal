package team1.toMyAnimal.factory;

import team1.toMyAnimal.domain.dto.sign.SignUpRequest;

public class SignUpRequestFactory {

    public static SignUpRequest createSignUpRequest() {
        return new SignUpRequest("id0","01011112222", "name", "123456a!", "email@email.com");
    }

    public static SignUpRequest createSignUpRequest(String id, String phoneNumber ,String password, String username, String email) {
        return new SignUpRequest(id, phoneNumber, username, password, email);
    }

    public static SignUpRequest createSignUpRequestWithEmail(String id) {
        return new SignUpRequest(id, "01064700107","username!", "123456a!", "email@email.com");
    }

    public static SignUpRequest createSignUpRequestWithPassword(String password) {
        return new SignUpRequest("id0", "01064700107","username", password, "email@email.com");
    }

    public static SignUpRequest createSignUpRequestWithUsername(String username) {
        return new SignUpRequest("id0", "01064700107",username, "123456a!", "email@email.com");
    }

    public static SignUpRequest createSignUpRequestWithNickname(String phoneNumber) {
        return new SignUpRequest("id0", phoneNumber,"username", "123456a!", "email@email.com");
    }
}