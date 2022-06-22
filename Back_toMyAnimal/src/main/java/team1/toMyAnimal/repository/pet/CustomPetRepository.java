package team1.toMyAnimal.repository.pet;

import org.springframework.data.domain.Page;
import team1.toMyAnimal.domain.dto.pet.PetReadCondition;
import team1.toMyAnimal.domain.dto.pet.PetSimpleDto;

public interface CustomPetRepository {
    Page<PetSimpleDto> findAllByCondition(PetReadCondition cond);
}
