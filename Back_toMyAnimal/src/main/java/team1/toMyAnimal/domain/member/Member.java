package team1.toMyAnimal.domain.member;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team1.toMyAnimal.domain.common.EntityDate;
import team1.toMyAnimal.domain.dto.member.MemberUpdateRequest;
import team1.toMyAnimal.domain.pet.Pet;

import javax.persistence.*;

import java.util.List;
import java.util.Set;

import static java.util.stream.Collectors.toSet;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@NamedEntityGraph(
        name = "Member.roles",
        attributeNodes = @NamedAttributeNode(value = "roles", subgraph = "Member.roles.role"),
        subgraphs = @NamedSubgraph(name = "Member.roles.role", attributeNodes = @NamedAttributeNode("role"))
)
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

    private String email;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MemberRole> roles;


//    id, 폰번호, 이름, 비밀번호 , 이메일, 권한
    public Member(String id, String phoneNumber, String username, String password, String email,List<Role> roles){
        this.userId = id;
        this.userPhoneNumber = phoneNumber;
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = roles.stream().map(r -> new MemberRole(this, r)).collect(toSet());

    }

    // 회원 정보 수정
    public void updateUserInfo(MemberUpdateRequest req) {
        this.userPhoneNumber = req.getUserPhoneNumber();
        this.username = req.getUsername();
    }
}
