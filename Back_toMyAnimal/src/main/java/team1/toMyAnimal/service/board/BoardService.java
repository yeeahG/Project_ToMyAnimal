package team1.toMyAnimal.service.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team1.toMyAnimal.domain.board.Board;
import team1.toMyAnimal.domain.dto.board.BoardDto;
import team1.toMyAnimal.domain.dto.board.BoardUpdateRequest;
import team1.toMyAnimal.domain.dto.board.BoardUpdateResponse;
import team1.toMyAnimal.exception.BoardNotFoundException;
import team1.toMyAnimal.repository.board.BoardRepository;
import team1.toMyAnimal.repository.member.MemberRepository;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class BoardService {
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public BoardCreateResponse create(BoardCreateRequest req) {
        Board board = boardRepository.save(BoardCreateRequest.toEntity(req, memberRepository));
        return new BoardCreateResponse(board.getId());
    }

    public BoardDto read(Long id) {
        return BoardDto.toDto(boardRepository.findById(id).orElseThrow(BoardNotFoundException::new));
    }

    @Transactional
    public void delete(Long id) {
        Board board = boardRepository.findById(id).orElseThrow(BoardNotFoundException::new);
        boardRepository.delete(board);
    }

    @Transactional
    public BoardUpdateResponse update(Long id, BoardUpdateRequest req) {
        Board board = boardRepository.findById(id).orElseThrow(BoardNotFoundException::new);

        return new BoardUpdateResponse(id);
    }
}
