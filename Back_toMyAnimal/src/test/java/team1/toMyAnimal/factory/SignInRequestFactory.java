package team1.toMyAnimal.factory;

import team1.toMyAnimal.domain.dto.sign.SignInRequest;

public class SignInRequestFactory {
    public static SignInRequest createSignInRequest() {
        return new SignInRequest("id0", "123456a!");
    }

    public static SignInRequest createSignInRequest(String id, String password) {
        return new SignInRequest(id, password);
    }

    public static SignInRequest createSignInRequestWithEmail(String id) {
        return new SignInRequest(id, "123456a!");
    }

    public static SignInRequest createSignInRequestWithPassword(String password) {
        return new SignInRequest("id0", password);
    }
}
