package team1.toMyAnimal.domain.dto.pet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import team1.toMyAnimal.domain.pet.Pet;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.repository.member.MemberRepository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetCreateRequest {
    @NotBlank(message = "펫 등록번호를 입력해주세요.")
    private String registrationNumber;

    private String petName;

    private Date petAge;

    private Long weight;

    @NotNull(message = "주인분의 아이디를 입력해주세요")
    @PositiveOrZero(message = "올바른 회원 아이디를 입력해주세요.")
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
