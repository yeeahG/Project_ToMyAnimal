package team1.toMyAnimal.domain.dto.animal;

import lombok.AllArgsConstructor;
import lombok.Data;
import team1.toMyAnimal.domain.dto.image.AnimalImageDto;
import team1.toMyAnimal.domain.dto.member.MemberDto;
import team1.toMyAnimal.domain.animal.Animal;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Data
@AllArgsConstructor
public class AnimalDto {
    private Long id;
    private String registrationNumber;
    private String name;
    private String birthday;
    private double weight;
    private MemberDto member;
    private List<AnimalImageDto> images;

    public static AnimalDto toDto(Animal animal){

        return new AnimalDto(
                animal.getId(),
                animal.getRegistrationNumber(),
                animal.getName(),
                animal.getBirthday(),
                animal.getWeight(),
                MemberDto.toDto(animal.getMember()),
                animal.getAnimalImages().stream().map(p -> AnimalImageDto.toDto(p)).collect(toList())
        );
    }
    public static List<AnimalDto> toDtoList(List<Animal> animals) {
        return animals.stream().map(p -> AnimalDto.toDto(p)).collect(Collectors.toList());
    }
}
