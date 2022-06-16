package team1.toMyAnimal.domain.member;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team1.toMyAnimal.domain.common.EntityDate;

import javax.persistence.*;

import java.util.List;
import java.util.Set;

import static java.util.stream.Collectors.toSet;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends EntityDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(nullable = false, length = 15, unique = true)
    private String userId;

    @Column(nullable = false, unique = true)
    private String userPhoneNumber;

    @Column(nullable = false, length = 20)
    private String username;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MemberRole> roles;

//    id, 폰번호, 이름, 비밀번호 , 권한
    public Member(String id, String phoneNumber, String username, String password, List<Role> roles){
        this.userId = id;
        this.userPhoneNumber = phoneNumber;
        this.username = username;
        this.password = password;
        this.roles = roles.stream().map(r -> new MemberRole(this, r)).collect(toSet());

    }

    public void updateUserInfo(String phoneNumber, String username) {
        this.userPhoneNumber = phoneNumber;
        this.username = username;
    }
}
