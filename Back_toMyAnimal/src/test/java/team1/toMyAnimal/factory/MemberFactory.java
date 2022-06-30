package team1.toMyAnimal.factory;

import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.domain.member.Role;

import java.util.List;

import static java.util.Collections.emptyList;

public class MemberFactory {

    public static Member createMember() {
        return new Member("id0","01011112222", "username", "123456a!", "email@email.com", emptyList());
    }

    public static Member createMember(String id, String email, String password, String username, String nickname) {
        return new Member(id,email, password, username, nickname, emptyList());
    }

    public static Member createMemberWithRoles(List<Role> roles) {
        return new Member("id0","01011112222", "username", "123456a!", "email@email.com", roles);
    }

}