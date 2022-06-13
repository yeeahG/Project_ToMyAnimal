package team1.toMyAnimal.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignInRequest {
    private String userId;
    private String userPassword;
}
