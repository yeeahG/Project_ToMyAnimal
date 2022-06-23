package team1.toMyAnimal.domain.dto.pet;

import lombok.AllArgsConstructor;
import lombok.Data;
import team1.toMyAnimal.domain.dto.member.MemberDto;
import team1.toMyAnimal.domain.image.PetImageDto;
import team1.toMyAnimal.domain.pet.Pet;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Data
@AllArgsConstructor
public class PetDto {
    private Long id;
    private String registrationNumber;
    private String petName;
    private String birthday;
    private double weight;
    private MemberDto member;
    private List<PetImageDto> images;

    public static PetDto toDto(Pet pet){

        return new PetDto(
                pet.getId(),
                pet.getRegistrationNumber(),
                pet.getPetName(),
                pet.getBirthday(),
                pet.getWeight(),
                MemberDto.toDto(pet.getMember()),
                pet.getPetImages().stream().map(p -> PetImageDto.toDto(p)).collect(toList())
        );
    }
    public static List<PetDto> toDtoList(List<Pet> pets) {
        return pets.stream().map(p -> PetDto.toDto(p)).collect(Collectors.toList());
    }
}
