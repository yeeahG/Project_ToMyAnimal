package team1.toMyAnimal.domain.dto.reservation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import team1.toMyAnimal.domain.reservation.Reservation;
import team1.toMyAnimal.exception.AnimalNotFoundException;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.animal.AnimalRepository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationCreateRequest {
    @NotBlank(message = "예약날짜를 입력해주세요.")
    private LocalDate date;

    @NotBlank(message = "예약하실 동물의 종류를 입력해주세요.")
    private String type;

    @Null
    private Long memberId;

    @Null
    private Long animalId;

    public static Reservation toEntity(ReservationCreateRequest req, MemberRepository memberRepository, AnimalRepository animalRepository){
        return new Reservation(
                req.date,
                req.type,
                memberRepository.findById(req.getMemberId()).orElseThrow(MemberNotFoundException::new),
                animalRepository.findById(req.getAnimalId()).orElseThrow(AnimalNotFoundException::new));
    }
}
