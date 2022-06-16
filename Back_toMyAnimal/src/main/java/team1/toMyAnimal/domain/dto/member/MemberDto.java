package team1.toMyAnimal.domain.dto.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import team1.toMyAnimal.domain.member.Member;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {
    private Long id;
    private String userId;
    private String userName;
    private String userPhoneNumber;
    private String password;

    //    id, 폰번호, 이름, 비밀번호 , 권한
    public static MemberDto toDto(Member member) {
        return new MemberDto(member.getId(), member.getUserId(), member.getUserPhoneNumber(), member.getUsername(), member.getPassword());
    }

}