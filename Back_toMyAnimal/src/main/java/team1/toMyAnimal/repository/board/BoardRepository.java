package team1.toMyAnimal.repository.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import team1.toMyAnimal.domain.board.Board;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("select b from Board b join fetch b.member where b.id = :id")
    Optional<Board> findByIdWithMember(Long id);
}
