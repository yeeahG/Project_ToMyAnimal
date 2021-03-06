package team1.toMyAnimal.domain.dto.sign;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.domain.member.Role;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {
    @NotBlank(message = "ID를 입력해주세요.")
    private String identifier;

    @NotBlank(message = "휴대폰 번호를 입력해주세요")
    @Pattern(regexp = "^[0-9]+$", message = "숫자만 입력해주세요.")
    private String phoneNumber;

    @NotBlank(message = "사용자 이름 입력해주세요.")
    @Size(min=2, message = "사용자 이름이 너무 짧습니다.")
    @Pattern(regexp = "^[A-Za-z가-힣]+$", message = "사용자 이름은 한글 또는 알파벳만 입력해주세요.")
    private String name;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String password;

    @Email(message = "이메일 형식을 맞춰주세요.")
    @NotBlank(message = "메일을 입력해주세요.")
    private String email;



    public static Member toEntity(SignUpRequest req, Role role, PasswordEncoder encoder) {
        return new Member(req.identifier, req.phoneNumber, req.name,  encoder.encode(req.password),req.email,List.of(role));
    }
}
