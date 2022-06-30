package team1.toMyAnimal.domain.animal;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.dto.animal.AnimalUpdateRequest;
import team1.toMyAnimal.domain.image.AnimalImage;
import team1.toMyAnimal.domain.member.Member;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String registrationNumber;

    @Column(length = 25)
    private String name;

    @Column(length = 11)
    private String birthday;

    @Column(length = 4) // kg 단위
    private double weight;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @OneToMany(mappedBy = "animal", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<AnimalImage> animalImages;

    public Animal(String registrationNumber, String name, String birthday, double weight, Member member, List<AnimalImage> animalImages){
        this.registrationNumber = registrationNumber;
        this.name = name;
        this.birthday = birthday;
        this.weight = weight;
        this.member = member;
        this.animalImages = new ArrayList<>();
        addImages(animalImages);
    }

    public ImageUpdatedResult update (AnimalUpdateRequest req) {
        this.registrationNumber = req.getRegistrationNumber();
        this.name = req.getName();
        this.weight = req.getWeight();
        ImageUpdatedResult result = findImageUpdatedResult(req.getAddedImages(), req.getDeletedImages());
        addImages(result.getAddedAnimalImages());
        deleteImages(result.getDeletedAnimalImages());
        return result;
    }

    private void addImages(List<AnimalImage> added) {
        added.stream().forEach(i -> {
            animalImages.add(i);
            i.initAnimal(this);
        });
    }

    private void deleteImages(List<AnimalImage> deleted) {
        deleted.stream().forEach(di -> this.animalImages.remove(di));
    }

    private ImageUpdatedResult findImageUpdatedResult(List<MultipartFile> addedImageFiles, List<Long> deletedImageIds) {
        List<AnimalImage> addedAnimalImages = convertImageFilesToImages(addedImageFiles);
        List<AnimalImage> deletedAnimalImages = convertImageIdsToImages(deletedImageIds);
        return new ImageUpdatedResult(addedImageFiles, addedAnimalImages, deletedAnimalImages);
    }

    private List<AnimalImage> convertImageIdsToImages(List<Long> imageIds) {
        return imageIds.stream()
                .map(id -> convertImageIdToImage(id))
                .filter(i -> i.isPresent())
                .map(i -> i.get())
                .collect(toList());
    }
    private Optional<AnimalImage> convertImageIdToImage(Long id) {
        return this.animalImages.stream().filter(i -> i.getId().equals(id)).findAny();
    }

    private List<AnimalImage> convertImageFilesToImages(List<MultipartFile> imageFiles) {
        return imageFiles.stream().map(imageFile -> new AnimalImage(imageFile.getOriginalFilename())).collect(toList());
    }

    @Getter
    @AllArgsConstructor
    public static class ImageUpdatedResult {
        private List<MultipartFile> addedImageFiles;
        private List<AnimalImage> addedAnimalImages;
        private List<AnimalImage> deletedAnimalImages;
    }

}
