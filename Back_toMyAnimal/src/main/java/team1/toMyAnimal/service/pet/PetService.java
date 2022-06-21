package team1.toMyAnimal.service.pet;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.dto.pet.*;
import team1.toMyAnimal.domain.pet.Pet;
import team1.toMyAnimal.exception.PetNotFoundException;
import team1.toMyAnimal.image.PetImage;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.pet.PetRepository;
import team1.toMyAnimal.service.image.FileService;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PetService {
    private final PetRepository petRepository;
    private final MemberRepository memberRepository;

    private final FileService fileService;

    @Transactional
    public PetCreateResponse create(PetCreateRequest req){
        Pet pet = petRepository.save(PetCreateRequest.toEntity(req, memberRepository));
        uploadImages(pet.getPetImages(), req.getImages());
        return new PetCreateResponse(pet.getId());
    }

    private void uploadImages(List<PetImage> petImages, List<MultipartFile> fileImages) {
        IntStream.range(0, petImages.size()).forEach(i -> fileService.upload(fileImages.get(i), petImages.get(i).getUniqueName()));
    }

    public PetDto read(Long id){
        return PetDto.toDto(petRepository.findById(id).orElseThrow(PetNotFoundException::new));
    }


    @Transactional
    public void delete(Long id) {
        Pet pet = petRepository.findById(id).orElseThrow(PetNotFoundException::new);
        deleteImages(pet.getPetImages());
        petRepository.delete(pet);
    }
    private void deleteImages(List<PetImage> petImages) {
        petImages.stream().forEach(i -> fileService.delete(i.getUniqueName()));
    }


    @Transactional
    public PetUpdateResponse update(Long id, PetUpdateRequest req) {
        Pet pet = petRepository.findById(id).orElseThrow(PetNotFoundException::new);
        Pet.ImageUpdatedResult result = pet.update(req);
        uploadImages(result.getAddedPetImages(), result.getAddedImageFiles());
        deleteImages(result.getDeletedPetImages());
        return new PetUpdateResponse(id);
    }
}
