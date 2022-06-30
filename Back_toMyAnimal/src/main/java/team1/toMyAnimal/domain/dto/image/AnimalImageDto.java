package team1.toMyAnimal.domain.dto.image;

import lombok.AllArgsConstructor;
import lombok.Data;
import team1.toMyAnimal.domain.image.AnimalImage;

@Data
@AllArgsConstructor
public class AnimalImageDto {
    private Long id;
    private String originName;
    private String uniqueName;
    public static AnimalImageDto toDto(AnimalImage animalImage) {
        return new AnimalImageDto(animalImage.getId(), animalImage.getOriginName(), animalImage.getUniqueName());
    }
}
