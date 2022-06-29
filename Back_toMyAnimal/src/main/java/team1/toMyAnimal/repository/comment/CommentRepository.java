package team1.toMyAnimal.repository.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import team1.toMyAnimal.domain.comment.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("select c from Comment c left join fetch c.parent where c.id = :id")
    Optional<Comment> findWithParentById(Long id);

    @Query("select c from Comment c join fetch c.member left join fetch c.parent where c.board.id = :boardId order by c.parent.id asc nulls first, c.id asc")
    List<Comment> findAllWithMemberAndParentByBoardIdOrderByParentIdAscNullsFirstCommentIdAsc(Long boardId);
}