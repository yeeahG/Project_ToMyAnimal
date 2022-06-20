package team1.toMyAnimal.domain.dto.pet;

import lombok.AllArgsConstructor;
import lombok.Data;
import team1.toMyAnimal.domain.dto.member.MemberDto;
import team1.toMyAnimal.domain.image.PetImageDto;
import team1.toMyAnimal.domain.pet.Pet;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Data
@AllArgsConstructor
public class PetDto {
    private Long id;
    private String registrationNumber;
    private String petName;
    private String birthday;
    private Long weight;
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
                pet.getPetImages().stream().map(i -> PetImageDto.toDto(i)).collect(toList())
        );
    }
}
