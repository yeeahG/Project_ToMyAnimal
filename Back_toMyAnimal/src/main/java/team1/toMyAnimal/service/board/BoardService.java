package team1.toMyAnimal.service.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.board.Board;
import team1.toMyAnimal.domain.dto.board.*;
import team1.toMyAnimal.domain.image.BoardImage;
import team1.toMyAnimal.exception.BoardNotFoundException;
import team1.toMyAnimal.repository.board.BoardRepository;
import team1.toMyAnimal.repository.category.CategoryRepository;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.service.image.FileService;

import java.util.List;
import java.util.stream.IntStream;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;

    private final FileService fileService;

    @Transactional
    public BoardCreateResponse create(BoardCreateRequest req) {
        Board board = boardRepository.save(BoardCreateRequest.toEntity(req, memberRepository, categoryRepository));
        uploadImages(board.getBoardImages(), req.getImages());
        return new BoardCreateResponse(board.getId());
    }

    private void uploadImages(List<BoardImage> boardImages, List<MultipartFile> fileImages) {
        IntStream.range(0, boardImages.size()).forEach(i -> fileService.upload(fileImages.get(i), boardImages.get(i).getUniqueName()));
    }

    public BoardDto read(Long id) {
        return BoardDto.toDto(boardRepository.findById(id).orElseThrow(BoardNotFoundException::new));
    }

    public List<BoardDto> readAll(BoardReadCondition cond) {
        return BoardDto.toDtoList(boardRepository.findByIdWithMemberAndCategoryAndType(cond.getMemberId(), cond.getCategoryId(), cond.getType()));
    }

    @Transactional
    public void delete(Long id) {

        Board board = boardRepository.findById(id).orElseThrow(BoardNotFoundException::new);
        deleteImages(board.getBoardImages());
        boardRepository.delete(board);
    }

    private void deleteImages(List<BoardImage> boardImages) {
        boardImages.stream().forEach(i -> fileService.delete(i.getUniqueName()));
    }

    @Transactional
    public BoardUpdateResponse update(Long id, BoardUpdateRequest req) {
        Board board = boardRepository.findById(id).orElseThrow(BoardNotFoundException::new);
        Board.ImageUpdatedResult result = board.update(req);
        uploadImages(result.getAddedBoardImages(), result.getAddedImageFiles());
        deleteImages(result.getDeletedBoardImages());
        return new BoardUpdateResponse(id);
    }
}
