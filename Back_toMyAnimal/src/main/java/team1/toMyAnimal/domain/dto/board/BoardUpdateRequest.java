package team1.toMyAnimal.domain.dto.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.board.BoardType;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardUpdateRequest {
    @NotBlank(message = "게시글 제목을 입력해주세요.")
    private String title;

    @NotBlank(message = "게시글 본문을 입력해주세요.")
    private String content;

    private BoardType type;

    private List<MultipartFile> addedImages = new ArrayList<>();

    private List<Long> deletedImages = new ArrayList<>();
}
