package team1.toMyAnimal.domain.dto.reservation;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import team1.toMyAnimal.domain.dto.animal.AnimalDto;
import team1.toMyAnimal.domain.dto.member.MemberDto;
import team1.toMyAnimal.domain.reservation.Reservation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class ReservationDto{
    private Long id;

    private String type;

    private MemberDto member;

    private AnimalDto animal;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime modifiedAt;

    public static ReservationDto toDto(Reservation reserv) {
        return new ReservationDto(
                reserv.getId(),
                reserv.getType(),
                MemberDto.toDto(reserv.getMember()),
                AnimalDto.toDto(reserv.getAnimal()),
                reserv.getCreatedAt(),
                reserv.getModifiedAt()
        );
    }
    public static List<ReservationDto> toDtoList(List<Reservation> reserv) {
        return reserv.stream().map(r -> ReservationDto.toDto(r)).collect(Collectors.toList());
    }

}
