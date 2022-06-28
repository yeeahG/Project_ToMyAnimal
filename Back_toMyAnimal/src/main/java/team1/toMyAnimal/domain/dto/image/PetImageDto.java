package team1.toMyAnimal.domain.dto.image;

import lombok.AllArgsConstructor;
import lombok.Data;
import team1.toMyAnimal.domain.image.PetImage;

@Data
@AllArgsConstructor
public class PetImageDto {
    private Long id;
    private String originName;
    private String uniqueName;
    public static PetImageDto toDto(PetImage petImage) {
        return new PetImageDto(petImage.getId(), petImage.getOriginName(), petImage.getUniqueName());
    }
}
