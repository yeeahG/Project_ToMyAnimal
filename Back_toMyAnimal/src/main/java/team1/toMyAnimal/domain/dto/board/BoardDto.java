package team1.toMyAnimal.domain.dto.board;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import team1.toMyAnimal.domain.board.Board;
import team1.toMyAnimal.domain.dto.member.MemberDto;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class BoardDto {
    private Long id;
    private String title;
    private String content;
    private MemberDto member;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime modifiedAt;

    public static BoardDto toDto(Board board){
        return new BoardDto(
                board.getId(),
                board.getTitle(),
                board.getContent(),
                MemberDto.toDto(board.getMember()),
                board.getCreatedAt(),
                board.getModifiedAt()
        );
    }

}
