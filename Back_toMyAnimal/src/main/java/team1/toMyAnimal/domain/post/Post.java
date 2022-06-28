package team1.toMyAnimal.domain.post;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.category.Category;
import team1.toMyAnimal.domain.common.EntityDate;
import team1.toMyAnimal.domain.dto.post.PostUpdateRequest;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.domain.image.PostImage;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends EntityDate {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Lob
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Category category;

    @OneToMany(mappedBy = "post", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<PostImage> postImages;

    public Post(String title, String content, Member member, Category category, List<PostImage> postImages) {
        this.title = title;
        this.content = content;
        this.member = member;
        this.category = category;
        this.postImages = new ArrayList<>();
        addImages(postImages);
    }

    public ImageUpdatedResult update(PostUpdateRequest req) {
        this.title = req.getTitle();
        this.content = req.getContent();
        ImageUpdatedResult result = findImageUpdatedResult(req.getAddedImages(), req.getDeletedImages());
        addImages(result.getAddedPostImages());
        deleteImages(result.getDeletedPostImages());
        return result;
    }

    private void addImages(List<PostImage> added) {
        added.stream().forEach(i -> {
            postImages.add(i);
            i.initPost(this);
        });
    }

    private void deleteImages(List<PostImage> deleted) {
        deleted.stream().forEach(di -> this.postImages.remove(di));
    }

    private ImageUpdatedResult findImageUpdatedResult(List<MultipartFile> addedImageFiles, List<Long> deletedImageIds) {
        List<PostImage> addedPostImages = convertImageFilesToImages(addedImageFiles);
        List<PostImage> deletedPostImages = convertImageIdsToImages(deletedImageIds);
        return new ImageUpdatedResult(addedImageFiles, addedPostImages, deletedPostImages);
    }

    private List<PostImage> convertImageIdsToImages(List<Long> imageIds) {
        return imageIds.stream()
                .map(id -> convertImageIdToImage(id))
                .filter(i -> i.isPresent())
                .map(i -> i.get())
                .collect(toList());
    }
    private Optional<PostImage> convertImageIdToImage(Long id) {
        return this.postImages.stream().filter(i -> i.getId().equals(id)).findAny();
    }

    private List<PostImage> convertImageFilesToImages(List<MultipartFile> imageFiles) {
        return imageFiles.stream().map(imageFile -> new PostImage(imageFile.getOriginalFilename())).collect(toList());
    }

    @Getter
    @AllArgsConstructor
    public static class ImageUpdatedResult {
        private List<MultipartFile> addedImageFiles;
        private List<PostImage> addedPostImages;
        private List<PostImage> deletedPostImages;
    }
}
