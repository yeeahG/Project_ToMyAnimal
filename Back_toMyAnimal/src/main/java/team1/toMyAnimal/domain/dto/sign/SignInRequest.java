package team1.toMyAnimal.domain.dto.sign;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignInRequest {

    @NotBlank(message = "아이디를 입력해주세요.")
    private String identifier;
    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String password;
}
