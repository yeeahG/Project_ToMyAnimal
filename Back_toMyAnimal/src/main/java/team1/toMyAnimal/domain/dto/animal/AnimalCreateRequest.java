package team1.toMyAnimal.domain.dto.animal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.animal.Animal;
import team1.toMyAnimal.domain.image.AnimalImage;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.repository.member.MemberRepository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnimalCreateRequest {
    private String registrationNumber;

    @NotBlank(message = "펫의 이름을 등록해주세요")
    private String name;

    private String birthday;


    private double weight;

    @Null
    private Long memberId;

    private List<MultipartFile> images = new ArrayList<>();

    public static Animal toEntity(AnimalCreateRequest req, MemberRepository memberRepository) {
        return new Animal(
                req.registrationNumber,
                req.name,
                req.birthday,
                req.weight,
                memberRepository.findById(req.getMemberId()).orElseThrow(MemberNotFoundException::new),
                req.images.stream().map(i -> new AnimalImage(i.getOriginalFilename())).collect(toList())
        );
    }

}
