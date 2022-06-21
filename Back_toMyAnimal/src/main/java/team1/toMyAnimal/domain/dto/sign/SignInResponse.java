package team1.toMyAnimal.domain.dto.sign;

import lombok.AllArgsConstructor;
import lombok.Data;
import team1.toMyAnimal.domain.member.Member;

@Data
@AllArgsConstructor
public class SignInResponse {
    private String accessToken;
    private String refreshToken;
    private Long member;

}
