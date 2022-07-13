package team1.toMyAnimal.dto.board;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.board.Board;
import team1.toMyAnimal.domain.board.BoardType;
import team1.toMyAnimal.domain.dto.board.BoardUpdateRequest;
import team1.toMyAnimal.domain.image.BoardImage;

import java.util.List;

import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThat;
import static team1.toMyAnimal.factory.BoardFactory.createBoardWithImages;
import static team1.toMyAnimal.factory.BoardUpdateRequestFactory.createBoardUpdateRequest;
import static team1.toMyAnimal.factory.CategoryFactory.createCategory;
import static team1.toMyAnimal.factory.ImageFactory.createImageWithIdAndOriginName;
import static team1.toMyAnimal.factory.MemberFactory.createMember;

public class BoardTest {
    @Test
    void updateTest() {
        // given
        BoardImage a = createImageWithIdAndOriginName(1L, "a.jpg");
        BoardImage b = createImageWithIdAndOriginName(2L, "b.jpg");
        Board board = createBoardWithImages(createMember(), createCategory(), List.of(a, b));

        // when
        MockMultipartFile cFile = new MockMultipartFile("c", "c.png", MediaType.IMAGE_PNG_VALUE, "cFile".getBytes());
        BoardUpdateRequest boardUpdateRequest = createBoardUpdateRequest("update title", "update content", BoardType.PUBLIC, List.of(cFile), List.of(a.getId()));
        Board.ImageUpdatedResult imageUpdatedResult = board.update(boardUpdateRequest);

        // then
        assertThat(board.getTitle()).isEqualTo(boardUpdateRequest.getTitle());
        assertThat(board.getContent()).isEqualTo(boardUpdateRequest.getContent());
        assertThat(board.getType()).isEqualTo(boardUpdateRequest.getType());

        List<BoardImage> resultImages = board.getBoardImages();
        List<String> resultOriginNames = resultImages.stream().map(i -> i.getOriginName()).collect(toList());
        assertThat(resultImages.size()).isEqualTo(2);
        assertThat(resultOriginNames).contains(b.getOriginName(), cFile.getOriginalFilename());

        List<MultipartFile> addedImageFiles = imageUpdatedResult.getAddedImageFiles();
        assertThat(addedImageFiles.size()).isEqualTo(1);
        assertThat(addedImageFiles.get(0).getOriginalFilename()).isEqualTo(cFile.getOriginalFilename());

        List<BoardImage> addedImages = imageUpdatedResult.getAddedBoardImages();
        List<String> addedOriginNames = addedImages.stream().map(i -> i.getOriginName()).collect(toList());
        assertThat(addedImages.size()).isEqualTo(1);
        assertThat(addedOriginNames).contains(cFile.getOriginalFilename());

        List<BoardImage> deletedImages = imageUpdatedResult.getDeletedBoardImages();
        List<String> deletedOriginNames = deletedImages.stream().map(i -> i.getOriginName()).collect(toList());
        assertThat(deletedImages.size()).isEqualTo(1);
        assertThat(deletedOriginNames).contains(a.getOriginName());
    }
}
