package team1.toMyAnimal.repository.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import team1.toMyAnimal.domain.board.Board;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("select b from Board b join fetch b.member where b.member.id = :memberId and b.category.id = :categoryId and b.type = :boardType")
    List<Board> findByIdWithMemberAndCategoryAndType(@Param("memberId") Long memberId, @Param("categoryId") Long categoryId, @Param("boardType") Integer boardType);
}
