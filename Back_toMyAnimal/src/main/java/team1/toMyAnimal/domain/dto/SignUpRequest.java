package team1.toMyAnimal.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.domain.member.Role;

import java.util.List;

@Data
@AllArgsConstructor
public class SignUpRequest {
    private String userId;
    private String userPassword;
    private String userName;
    private String userPhoneNumber;

    public static Member toEntity(SignUpRequest req, Role role, PasswordEncoder encoder) {
        return new Member(req.userId, encoder.encode(req.userPassword), req.userName, req.userPhoneNumber, List.of(role));
    }
}
