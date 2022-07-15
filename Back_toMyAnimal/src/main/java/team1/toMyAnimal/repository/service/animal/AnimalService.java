package team1.toMyAnimal.repository.service.animal;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.dto.animal.*;
import team1.toMyAnimal.domain.animal.Animal;
import team1.toMyAnimal.domain.image.AnimalImage;
import team1.toMyAnimal.exception.AnimalNotFoundException;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.animal.AnimalRepository;
import team1.toMyAnimal.repository.service.image.FileService;

import java.util.List;
import java.util.stream.IntStream;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AnimalService {
    private final AnimalRepository animalRepository;
    private final MemberRepository memberRepository;
    private final FileService fileService;

    @Transactional
    public AnimalCreateResponse create(AnimalCreateRequest req) {
        Animal animal = animalRepository.save(AnimalCreateRequest.toEntity(req, memberRepository));
        uploadImages(animal.getAnimalImages(), req.getImages());
        return new AnimalCreateResponse(animal.getId());
    }

    private void uploadImages(List<AnimalImage> animalImages, List<MultipartFile> fileImages) {
        IntStream.range(0, animalImages.size()).forEach(i -> fileService.upload(fileImages.get(i), animalImages.get(i).getUniqueName()));
    }

    public AnimalDto read(Long id) {
        return AnimalDto.toDto(animalRepository.findById(id).orElseThrow(AnimalNotFoundException::new));
    }

    public List<AnimalDto> readAll(AnimalReadCondition cond) {
        return AnimalDto.toDtoList(animalRepository.findWithMemberById(cond.getMemberId()));
    }

    @Transactional
    public void delete(Long id) {
        Animal animal = animalRepository.findById(id).orElseThrow(AnimalNotFoundException::new);
        deleteImages(animal.getAnimalImages());
        animalRepository.delete(animal);
    }

    private void deleteImages(List<AnimalImage> animalImages) {
        animalImages.stream().forEach(i -> fileService.delete(i.getUniqueName()));
    }

    @Transactional
    public AnimalUpdateResponse update(Long id, AnimalUpdateRequest req) {
        Animal animal = animalRepository.findById(id).orElseThrow(AnimalNotFoundException::new);
        Animal.ImageUpdatedResult result = animal.update(req);
        uploadImages(result.getAddedAnimalImages(), result.getAddedImageFiles());
        deleteImages(result.getDeletedAnimalImages());
        return new AnimalUpdateResponse(id);
    }
}
