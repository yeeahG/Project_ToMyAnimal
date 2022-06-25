package team1.toMyAnimal.domain.dto.reservation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.jni.Local;
import team1.toMyAnimal.domain.dto.pet.PetCreateRequest;
import team1.toMyAnimal.domain.pet.Pet;
import team1.toMyAnimal.domain.reservation.Reservation;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.exception.PetNotFoundException;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.pet.PetRepository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationCreateRequest {
    @NotBlank
    private LocalDate date;

    @NotBlank
    private LocalDateTime time;

    @NotBlank
    private String type;

    @Null
    private Long memberId;

    private Long petId;

    public static Reservation toEntity(ReservationCreateRequest req, MemberRepository memberRepository, PetRepository petRepository){
        return new Reservation(
                req.date,
                req.time,
                req.type,
                memberRepository.findById(req.getMemberId()).orElseThrow(MemberNotFoundException::new),
                petRepository.findById(req.getPetId()).orElseThrow(PetNotFoundException::new));
    }
}
