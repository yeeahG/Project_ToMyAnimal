package team1.toMyAnimal.domain.dto.image;

import lombok.AllArgsConstructor;
import lombok.Data;
import team1.toMyAnimal.domain.image.BoardImage;

@Data
@AllArgsConstructor
public class BoardImageDto {

    private Long id;
    private String originName;
    private String uniqueName;

    public static BoardImageDto toDto(BoardImage boardImage) {
        return new BoardImageDto(boardImage.getId(), boardImage.getOriginName(), boardImage.getUniqueName());
    }
}
