package team1.toMyAnimal.domain.dto.pet;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import team1.toMyAnimal.domain.dto.member.MemberDto;
import team1.toMyAnimal.domain.pet.Pet;

import java.util.Date;

@Data
@AllArgsConstructor
public class PetDto {
    private Long id;
    private String registrationNumber;
    private String petName;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date birthday;
    private Long weight;
    private MemberDto member;

    public static PetDto toDto(Pet pet){
        return new PetDto(
                pet.getId(),
                pet.getRegistrationNumber(),
                pet.getPetName(),
                pet.getBirthday(),
                pet.getWeight(),
                MemberDto.toDto(pet.getMember())
        );
    }
}
