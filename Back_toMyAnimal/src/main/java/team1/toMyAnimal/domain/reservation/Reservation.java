package team1.toMyAnimal.domain.reservation;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import team1.toMyAnimal.domain.common.EntityDate;
import team1.toMyAnimal.domain.dto.reservation.ReservationUpdateRequest;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.domain.animal.Animal;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Reservation extends EntityDate {

    // 날짜, 장소, 시간, 동물의 종류, 회원 ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id;
    private Date date;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ReservationType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Animal animal;

    public Reservation(Date date, ReservationType type, Member member, Animal animal){
        this.date = date;
        this.type = type;
        this.member = member;
        this.animal = animal;
    }

    public void update(ReservationUpdateRequest req) {
        this.date = req.getDate();
        this.type = req.getType();
    }

}
