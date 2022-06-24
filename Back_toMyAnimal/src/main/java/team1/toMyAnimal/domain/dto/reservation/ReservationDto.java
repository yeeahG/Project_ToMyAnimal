package team1.toMyAnimal.domain.dto.reservation;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import team1.toMyAnimal.domain.common.EntityDate;
import team1.toMyAnimal.domain.dto.member.MemberDto;
import team1.toMyAnimal.domain.dto.pet.PetDto;
import team1.toMyAnimal.domain.dto.post.PostDto;
import team1.toMyAnimal.domain.reservation.Reservation;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ReservationDto{
    private Long id;

    private String type;

    private MemberDto member;

    private PetDto pet;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime modifiedAt;

    public static ReservationDto toDto(Reservation reserv) {
        return new ReservationDto(
                reserv.getId(),
                reserv.getType(),
                MemberDto.toDto(reserv.getMember()),
                PetDto.toDto(reserv.getPet()),
                reserv.getCreatedAt(),
                reserv.getModifiedAt()
        );
    }

}
