package team1.toMyAnimal.service.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team1.toMyAnimal.domain.board.Board;
import team1.toMyAnimal.domain.dto.board.*;
import team1.toMyAnimal.exception.BoardNotFoundException;
import team1.toMyAnimal.repository.board.BoardRepository;
import team1.toMyAnimal.repository.category.CategoryRepository;
import team1.toMyAnimal.repository.member.MemberRepository;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public BoardCreateResponse create(BoardCreateRequest req) {
        Board board = boardRepository.save(BoardCreateRequest.toEntity(req, memberRepository, categoryRepository));
        return new BoardCreateResponse(board.getId());
    }

    public BoardDto read(Long id) {
        return BoardDto.toDto(boardRepository.findById(id).orElseThrow(BoardNotFoundException::new));
    }

    public List<BoardDto> readAll(BoardReadCondition cond) {
        return BoardDto.toDtoList(boardRepository.findByIdWithMemberAndCategory(cond.getMemberId(), cond.getCategoryId()));
    }

    @Transactional
    public void delete(Long id) {
        Board board = boardRepository.findById(id).orElseThrow(BoardNotFoundException::new);
        boardRepository.delete(board);
    }

    @Transactional
    public BoardUpdateResponse update(Long id, BoardUpdateRequest req) {
        Board board = boardRepository.findById(id).orElseThrow(BoardNotFoundException::new);
        board.update(req);
        return new BoardUpdateResponse(id);
    }
}
