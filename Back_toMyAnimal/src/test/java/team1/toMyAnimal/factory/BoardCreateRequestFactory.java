package team1.toMyAnimal.factory;

import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.board.BoardType;
import team1.toMyAnimal.domain.dto.board.BoardCreateRequest;

import java.util.List;

import static team1.toMyAnimal.domain.board.BoardType.PUBLIC;

public class BoardCreateRequestFactory {
    public static BoardCreateRequest createBoardCreateRequest() {
        return new BoardCreateRequest("title", "content", PUBLIC, 1L, 1L, List.of(
                new MockMultipartFile("test1", "test1.PNG", MediaType.IMAGE_PNG_VALUE, "test1".getBytes()),
                new MockMultipartFile("test2", "test2.PNG", MediaType.IMAGE_PNG_VALUE, "test2".getBytes()),
                new MockMultipartFile("test3", "test3.PNG", MediaType.IMAGE_PNG_VALUE, "test3".getBytes())
        ));
    }

    public static BoardCreateRequest createBoardCreateRequest(String title, String content, BoardType type, Long memberId, Long categoryId, List<MultipartFile> images) {
        return new BoardCreateRequest(title, content, type, memberId, categoryId, images);
    }

    public static BoardCreateRequest createBoardCreateRequestWithTitle(String title) {
        return new BoardCreateRequest(title, "content", PUBLIC, 1L, 1L, List.of());
    }

    public static BoardCreateRequest createBoardCreateRequestWithContent(String content) {
        return new BoardCreateRequest("title", content, PUBLIC, 1L, 1L, List.of());
    }

    public static BoardCreateRequest createBoardCreateRequestWithType(BoardType type) {
        return new BoardCreateRequest("title", "content", type, 1L, 1L, List.of());
    }

    public static BoardCreateRequest createBoardCreateRequestWithMemberId(Long memberId) {
        return new BoardCreateRequest("title", "content", PUBLIC, memberId, 1L, List.of());
    }

    public static BoardCreateRequest createBoardCreateRequestWithCategoryId(Long categoryId) {
        return new BoardCreateRequest("title", "content", PUBLIC, 1L, categoryId, List.of());
    }

    public static BoardCreateRequest createBoardCreateRequestWithImages(List<MultipartFile> images) {
        return new BoardCreateRequest("title", "content", PUBLIC, 1L, 1L, images);
    }

}