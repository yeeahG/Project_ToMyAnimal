package team1.toMyAnimal.domain.pet;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.dto.pet.PetUpdateRequest;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.domain.image.PetImage;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String registrationNumber;

    private String petName;

    private String birthday;

    private double weight;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @OneToMany(mappedBy = "pet", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<PetImage> petImages;

    public Pet(String registrationNumber, String petName, String birthday, double weight, Member member, List<PetImage> petImages){
        this.registrationNumber = registrationNumber;
        this.petName = petName;
        this.birthday = birthday;
        this.weight = weight;
        this.member = member;
        this.petImages = new ArrayList<>();
        addImages(petImages);
    }

    public ImageUpdatedResult update (PetUpdateRequest req) {
        this.registrationNumber = req.getRegistrationNumber();
        this.petName = req.getPetName();
        this.weight = req.getWeight();
        ImageUpdatedResult result = findImageUpdatedResult(req.getAddedImages(), req.getDeletedImages());
        addImages(result.getAddedPetImages());
        deleteImages(result.getDeletedPetImages());
        return result;
    }

    private void addImages(List<PetImage> added) {
        added.stream().forEach(i -> {
            petImages.add(i);
            i.initPet(this);
        });
    }

    private void deleteImages(List<PetImage> deleted) {
        deleted.stream().forEach(di -> this.petImages.remove(di));
    }

    private ImageUpdatedResult findImageUpdatedResult(List<MultipartFile> addedImageFiles, List<Long> deletedImageIds) {
        List<PetImage> addedPetImages = convertImageFilesToImages(addedImageFiles);
        List<PetImage> deletedPetImages = convertImageIdsToImages(deletedImageIds);
        return new ImageUpdatedResult(addedImageFiles, addedPetImages, deletedPetImages);
    }

    private List<PetImage> convertImageIdsToImages(List<Long> imageIds) {
        return imageIds.stream()
                .map(id -> convertImageIdToImage(id))
                .filter(i -> i.isPresent())
                .map(i -> i.get())
                .collect(toList());
    }
    private Optional<PetImage> convertImageIdToImage(Long id) {
        return this.petImages.stream().filter(i -> i.getId().equals(id)).findAny();
    }

    private List<PetImage> convertImageFilesToImages(List<MultipartFile> imageFiles) {
        return imageFiles.stream().map(imageFile -> new PetImage(imageFile.getOriginalFilename())).collect(toList());
    }

    @Getter
    @AllArgsConstructor
    public static class ImageUpdatedResult {
        private List<MultipartFile> addedImageFiles;
        private List<PetImage> addedPetImages;
        private List<PetImage> deletedPetImages;
    }

}
