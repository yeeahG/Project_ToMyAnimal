package team1.toMyAnimal.domain.dto.reservation;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.junit.jupiter.params.shadow.com.univocity.parsers.annotations.Format;
import org.springframework.format.annotation.DateTimeFormat;
import team1.toMyAnimal.domain.reservation.Reservation;
import team1.toMyAnimal.domain.reservation.ReservationType;
import team1.toMyAnimal.exception.AnimalNotFoundException;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.animal.AnimalRepository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationCreateRequest {
    //    @NotBlank(message = "예약날짜를 입력해주세요.")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;

    //    @NotBlank(message = "예약 종류를 입력해주세요.")
    private ReservationType type;

    @Null
    private Long memberId;

    private Long animalId;

    public static Reservation toEntity(ReservationCreateRequest req, MemberRepository memberRepository, AnimalRepository animalRepository) {
        return new Reservation(
                req.date,
                req.type,
                memberRepository.findById(req.getMemberId()).orElseThrow(MemberNotFoundException::new),
                animalRepository.findById(req.getAnimalId()).orElseThrow(AnimalNotFoundException::new));
    }
}
