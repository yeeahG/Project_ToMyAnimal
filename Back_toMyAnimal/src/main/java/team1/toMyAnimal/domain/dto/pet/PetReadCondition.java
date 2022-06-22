package team1.toMyAnimal.domain.dto.pet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.PositiveOrZero;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetReadCondition {
    @NotNull(message = "페이지 번호를 입력해주세요.")
    @PositiveOrZero
    private Integer page;

    @NotNull(message = "페이지 크기를 입력해주세요.")
    private Integer size;

    @Null
    private Long memberId;
}
