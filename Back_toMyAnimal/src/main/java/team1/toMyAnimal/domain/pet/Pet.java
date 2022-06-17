package team1.toMyAnimal.domain.pet;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import team1.toMyAnimal.domain.member.Member;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String registrationNumber;

//    @Column(nullable = false)
    private String petName;

    private Date birthday;

    private Long weight;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    public Pet(String registrationNumber, String petName, Date birthday, Long weight, Member member){
        this.registrationNumber = registrationNumber;
        this.petName = petName;
        this.birthday = birthday;
        this.weight = weight;
        this.member = member;
    }

}
