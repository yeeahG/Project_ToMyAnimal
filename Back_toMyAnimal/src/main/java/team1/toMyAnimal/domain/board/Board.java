package team1.toMyAnimal.domain.board;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.category.Category;
import team1.toMyAnimal.domain.common.EntityDate;
import team1.toMyAnimal.domain.dto.board.BoardUpdateRequest;
import team1.toMyAnimal.domain.image.BoardImage;
import team1.toMyAnimal.domain.member.Member;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board extends EntityDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 30)
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

    @OneToMany(mappedBy = "board", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<BoardImage> boardImages;

    @Column(nullable = false)
    @Enumerated(EnumType.ORDINAL)
    //0 :공용 , 1:개인
    private BoardType type;

    public Board(String title, String content, BoardType type, Member member, Category category , List<BoardImage> boardImages){
        this.title = title;
        this.content = content;
        this.type = type;
        this.member = member;
        this.category = category;
        this.boardImages = new ArrayList<>();
        addImages(boardImages);
    }

    private void addImages(List<BoardImage> added) {
        added.stream().forEach(i -> {
            boardImages.add(i);
            i.initBoard(this);
        });
    }

    public ImageUpdatedResult update(BoardUpdateRequest req) {
        this.title = req.getTitle();
        this.content = req.getContent();
        ImageUpdatedResult result = findImageUpdatedResult(req.getAddedImages(), req.getDeletedImages());
        addImages(result.getAddedBoardImages());
        deleteImages(result.getDeletedBoardImages());
        return result;
    }


    private void deleteImages(List<BoardImage> deleted) {
        deleted.stream().forEach(di -> this.boardImages.remove(di));
    }

    private ImageUpdatedResult findImageUpdatedResult(List<MultipartFile> addedImageFiles, List<Long> deletedImageIds) {
        List<BoardImage> addedBoardImages = convertImageFilesToImages(addedImageFiles);
        List<BoardImage> deletedBoardImages = convertImageIdsToImages(deletedImageIds);
        return new ImageUpdatedResult(addedImageFiles, addedBoardImages, deletedBoardImages);
    }
    private List<BoardImage> convertImageIdsToImages(List<Long> imageIds) {
        return imageIds.stream()
                .map(id -> convertImageIdToImage(id))
                .filter(i -> i.isPresent())
                .map(i -> i.get())
                .collect(toList());
    }
    private Optional<BoardImage> convertImageIdToImage(Long id) {
        return this.boardImages.stream().filter(i -> i.getId().equals(id)).findAny();
    }

    private List<BoardImage> convertImageFilesToImages(List<MultipartFile> imageFiles) {
        return imageFiles.stream().map(imageFile -> new BoardImage(imageFile.getOriginalFilename())).collect(toList());
    }

    @Getter
    @AllArgsConstructor
    public static class ImageUpdatedResult {
        private List<MultipartFile> addedImageFiles;
        private List<BoardImage> addedBoardImages;
        private List<BoardImage> deletedBoardImages;


    }


}
