package team1.toMyAnimal.domain.pet;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;
import team1.toMyAnimal.domain.dto.pet.PetUpdateRequest;
import team1.toMyAnimal.domain.member.Member;

import javax.persistence.*;
import java.time.LocalDate;
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

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date petAge;

    private Long weight;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    public Pet(String registrationNumber, String petName, Date petAge, Long weight, Member member){
        this.registrationNumber = registrationNumber;
        this.petName = petName;
        this.petAge = petAge;
        this.weight = weight;
        this.member = member;
    }

    public void update (PetUpdateRequest req) {
        this.registrationNumber = req.getRegistrationNumber();
        this.petName = req.getPetName();
        this.weight = req.getWeight();
    }

}
