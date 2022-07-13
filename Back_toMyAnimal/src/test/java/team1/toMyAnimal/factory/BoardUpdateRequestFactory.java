package team1.toMyAnimal.factory;

import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.board.BoardType;
import team1.toMyAnimal.domain.dto.board.BoardUpdateRequest;

import java.util.List;

public class BoardUpdateRequestFactory {
    public static BoardUpdateRequest createBoardUpdateRequest(String title, String content, BoardType type, List<MultipartFile> addedImages, List<Long> deletedImages) {
        return new BoardUpdateRequest(title, content, type, addedImages, deletedImages);
    }
}
