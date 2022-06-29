package team1.toMyAnimal.domain.dto.board;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import team1.toMyAnimal.domain.board.Board;
import team1.toMyAnimal.domain.dto.image.BoardImageDto;
import team1.toMyAnimal.domain.dto.image.PostImageDto;
import team1.toMyAnimal.domain.dto.member.MemberDto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Data
@AllArgsConstructor
public class BoardDto {
    private Long id;
    private String title;
    private String content;
    private MemberDto member;
    private List<BoardImageDto> images;
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
                board.getBoardImages().stream().map(i -> BoardImageDto.toDto(i)).collect(toList()),
                board.getCreatedAt(),
                board.getModifiedAt()
        );
    }

    public static List<BoardDto> toDtoList(List<Board> boards){
        return boards.stream().map(b -> BoardDto.toDto(b)).collect(Collectors.toList());
    }

}
