package team1.toMyAnimal.domain.dto.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberUpdateRequest {
    private String userPhoneNumber;
    private String username;
}
