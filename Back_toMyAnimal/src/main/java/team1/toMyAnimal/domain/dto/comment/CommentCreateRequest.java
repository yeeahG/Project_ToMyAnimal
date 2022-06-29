package team1.toMyAnimal.domain.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import team1.toMyAnimal.domain.comment.Comment;
import team1.toMyAnimal.exception.BoardNotFoundException;
import team1.toMyAnimal.exception.CommentNotFoundException;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.repository.board.BoardRepository;
import team1.toMyAnimal.repository.comment.CommentRepository;
import team1.toMyAnimal.repository.member.MemberRepository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Positive;
import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentCreateRequest {

    @NotBlank(message = "댓글을 입력해주세요.")
    private String content;

    @NotNull(message = "게시글 아이디를 입력해주세요.")
    @Positive(message = "올바른 게시글 아이디를 입력해주세요.")
    private Long boardId;

    @Null
    private Long memberId;

    private Long parentId;

    public static Comment toEntity(CommentCreateRequest req, MemberRepository memberRepository, BoardRepository boardRepository, CommentRepository commentRepository) {
        return new Comment(
                req.content,
                memberRepository.findById(req.memberId).orElseThrow(MemberNotFoundException::new),
                boardRepository.findById(req.boardId).orElseThrow(BoardNotFoundException::new),
                Optional.ofNullable(req.parentId)
                        .map(id -> commentRepository.findById(id).orElseThrow(CommentNotFoundException::new))
                        .orElse(null)
        );
    }
}