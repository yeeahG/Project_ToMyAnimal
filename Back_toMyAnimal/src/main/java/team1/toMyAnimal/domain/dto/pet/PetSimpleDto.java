package team1.toMyAnimal.domain.dto.pet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import team1.toMyAnimal.domain.image.PetImageDto;
import team1.toMyAnimal.domain.pet.Pet;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetSimpleDto {
    private Long id;
    private String registrationNumber;
    private String petName;
    private String birthday;
    private double weight;
    private List<PetImageDto> images;

    public static List<PetSimpleDto> toDto(List<Pet> pets) {
        List<PetSimpleDto> pt = new ArrayList<>();
//        pets.stream().map(p -> PetDto.toDto(p)).collect(Collectors.toList());

        System.out.println("pets: "+ pets);
        System.out.println("Test");
        System.out.println("List : " + pets.stream().map(p -> PetDto.toDto(p)).collect(Collectors.toList()));

        return pt;
    }
}
