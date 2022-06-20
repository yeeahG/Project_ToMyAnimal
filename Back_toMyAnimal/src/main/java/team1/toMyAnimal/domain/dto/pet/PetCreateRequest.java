package team1.toMyAnimal.domain.dto.pet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.pet.Pet;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.image.PetImage;
import team1.toMyAnimal.repository.member.MemberRepository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetCreateRequest {
    private String registrationNumber;

    @NotBlank(message = "펫의 이름을 등록해주세요")
    private String petName;

    private String birthday;


    private Long weight;

    @Null
    private Long memberId;

    private List<MultipartFile> images = new ArrayList<>();

    public static Pet toEntity(PetCreateRequest req, MemberRepository memberRepository) {
        return new Pet(
                req.registrationNumber,
                req.petName,
                req.birthday,
                req.weight,
                memberRepository.findById(req.getMemberId()).orElseThrow(MemberNotFoundException::new),
                req.images.stream().map(i -> new PetImage(i.getOriginalFilename())).collect(toList())
        );
    }

}
