package team1.toMyAnimal.factory.member;

import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.domain.member.Role;

import java.util.List;

import static java.util.Collections.emptyList;

public class MemberFactory {

    public static Member createMember() {
        return new Member("userId", "01012345678", "username", "1234", emptyList());
    }

    public static Member createMember(String userId, String password, String username, String phoneNumber) {
        return new Member(userId, phoneNumber, username,  password, emptyList());
    }

    public static Member createMemberWithRoles(List<Role> roles) {
        return new Member("userId", "01012345678", "username", "1234", roles);
    }

}