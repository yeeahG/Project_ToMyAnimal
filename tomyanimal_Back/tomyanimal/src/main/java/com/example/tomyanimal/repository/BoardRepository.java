package com.example.tomyanimal.repository;



import com.example.tomyanimal.model.Board;
import com.example.tomyanimal.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// JpaRepository<Entity 클래스, PK 타입>
public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findByTitleContaining(String keyword);

    Board findByMember(Member member);
}
