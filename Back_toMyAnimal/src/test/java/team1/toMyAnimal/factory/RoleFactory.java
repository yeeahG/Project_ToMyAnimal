package team1.toMyAnimal.factory;


import team1.toMyAnimal.domain.member.Role;
import team1.toMyAnimal.domain.member.RoleType;

public class RoleFactory {
    public static Role createRole() {
        return new Role(RoleType.ROLE_USER);
    }
}
