package team1.toMyAnimal.domain.dto.pet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Null;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetReadCondition {
    private Long memberId;
}
