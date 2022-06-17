package team1.toMyAnimal.domain.dto.pet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import team1.toMyAnimal.domain.pet.Pet;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.repository.member.MemberRepository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetCreateRequest {
    private String registrationNumber;

    @NotBlank(message = "펫의 이름을 등록해주세요")
    private String petName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date petAge;

    private Long weight;

    @Null
    private Long memberId;

    public static Pet toEntity(PetCreateRequest req, MemberRepository memberRepository) {
        return new Pet(
                req.registrationNumber,
                req.petName,
                req.petAge,
                req.weight,
                memberRepository.findById(req.getMemberId()).orElseThrow(MemberNotFoundException::new));
    }

}
