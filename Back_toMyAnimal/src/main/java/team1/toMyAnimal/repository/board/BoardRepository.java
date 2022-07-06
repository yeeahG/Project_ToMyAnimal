package team1.toMyAnimal.repository.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import team1.toMyAnimal.domain.board.Board;
import team1.toMyAnimal.domain.board.BoardType;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("select b from Board b join fetch b.member where b.member.id = :memberId and b.category.id = :categoryId and b.type = :boardType")
    List<Board> findByIdWithMemberAndCategoryAndType(@Param("memberId") Long memberId, @Param("categoryId") Long categoryId, @Param("boardType") BoardType boardType);

    @Query("select b from Board b join fetch b.category where b.category.id = :categoryId and b.type = :boardType")
    List<Board> findByIdWithCategoryIdAndType(@Param("categoryId") Long categoryId, @Param("boardType") BoardType boardType);
}
