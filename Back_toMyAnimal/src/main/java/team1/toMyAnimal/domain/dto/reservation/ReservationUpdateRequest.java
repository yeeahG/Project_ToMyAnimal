package team1.toMyAnimal.domain.dto.reservation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationUpdateRequest {

    @NotBlank(message = "변경하실 날짜를 입력해주세요.")
    private LocalDate date;

    @NotBlank(message = "변경하실 시간을 입력해주세요.")
    private LocalDateTime time;

    @NotBlank(message = "동물의 종류를 입력해주세요")
    private String type;
}
