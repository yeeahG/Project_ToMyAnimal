package team1.toMyAnimal.repository.service.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team1.toMyAnimal.domain.comment.Comment;
import team1.toMyAnimal.domain.dto.comment.CommentCreateRequest;
import team1.toMyAnimal.domain.dto.comment.CommentDto;
import team1.toMyAnimal.domain.dto.comment.CommentReadCondition;
import team1.toMyAnimal.exception.CommentNotFoundException;
import team1.toMyAnimal.repository.board.BoardRepository;
import team1.toMyAnimal.repository.comment.CommentRepository;
import team1.toMyAnimal.repository.member.MemberRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;

    public List<CommentDto> readAll(CommentReadCondition condition) {
        return CommentDto.toDtoList(
                commentRepository.findAllWithMemberAndParentByBoardIdOrderByParentIdAscNullsFirstCommentIdAsc(condition.getBoardId())
        );
    }

    @Transactional
    public void create(CommentCreateRequest req) {
        commentRepository.save(CommentCreateRequest.toEntity(req, memberRepository, boardRepository, commentRepository));
    }

    @Transactional
    public void delete(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(CommentNotFoundException::new);
        comment.findDeletableComment().ifPresentOrElse(commentRepository::delete, comment::delete);
    }
}
