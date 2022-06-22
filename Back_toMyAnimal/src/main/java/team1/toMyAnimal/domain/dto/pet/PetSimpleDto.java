package team1.toMyAnimal.domain.dto.pet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import team1.toMyAnimal.domain.image.PetImageDto;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetSimpleDto {
    private Long id;
    private String registrationNumber;
    private String petName;
    private double weight;
    private String birthday;
    private List<PetImageDto> images;
}
