package team1.toMyAnimal.service.board;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import team1.toMyAnimal.domain.board.Board;
import team1.toMyAnimal.domain.board.BoardType;
import team1.toMyAnimal.domain.dto.board.BoardCreateRequest;
import team1.toMyAnimal.domain.dto.board.BoardDto;
import team1.toMyAnimal.domain.dto.board.BoardUpdateRequest;
import team1.toMyAnimal.domain.image.BoardImage;
import team1.toMyAnimal.exception.BoardNotFoundException;
import team1.toMyAnimal.exception.CategoryNotFoundException;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.exception.UnsupportedImageFormatException;
import team1.toMyAnimal.repository.category.CategoryRepository;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.service.board.BoardService;
import team1.toMyAnimal.repository.service.image.FileService;

import java.awt.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static team1.toMyAnimal.factory.BoardCreateRequestFactory.createBoardCreateRequest;
import static team1.toMyAnimal.factory.BoardCreateRequestFactory.createBoardCreateRequestWithImages;
import static team1.toMyAnimal.factory.BoardFactory.createBoardWithImages;
import static team1.toMyAnimal.factory.BoardUpdateRequestFactory.createBoardUpdateRequest;
import static team1.toMyAnimal.factory.CategoryFactory.createCategory;
import static team1.toMyAnimal.factory.ImageFactory.createImage;
import static team1.toMyAnimal.factory.ImageFactory.createImageWithIdAndOriginName;
import static team1.toMyAnimal.factory.MemberFactory.createMember;

@ExtendWith(MockitoExtension.class)
class BoardServiceTest {
    @InjectMocks
    BoardService boardService;
    @Mock
    team1.toMyAnimal.repository.board.BoardRepository boardRepository;
    @Mock
    MemberRepository memberRepository;
    @Mock
    CategoryRepository categoryRepository;
    @Mock
    FileService fileService;

    @Test
    void createTest() {
        // given
        BoardCreateRequest req = createBoardCreateRequest();
        given(memberRepository.findById(anyLong())).willReturn(Optional.of(createMember()));
        given(categoryRepository.findById(anyLong())).willReturn(Optional.of(createCategory()));
        given(boardRepository.save(any())).willReturn(createBoardWithImages(
                IntStream.range(0, req.getImages().size()).mapToObj(i -> createImage()).collect(toList()))
        );

        // when
        boardService.create(req);

        // then
        verify(boardRepository).save(any());
        verify(fileService, times(req.getImages().size())).upload(any(), anyString());
    }

    @Test
    void createExceptionByMemberNotFoundTest() {
        // given
        given(memberRepository.findById(anyLong())).willReturn(Optional.ofNullable(null));

        // when, then
        assertThatThrownBy(() -> boardService.create(createBoardCreateRequest())).isInstanceOf(MemberNotFoundException.class);
    }

    @Test
    void createExceptionByCategoryNotFoundTest() {
        // given
        given(memberRepository.findById(anyLong())).willReturn(Optional.of(createMember()));
        given(categoryRepository.findById(anyLong())).willReturn(Optional.ofNullable(null));

        // when, then
        assertThatThrownBy(() -> boardService.create(createBoardCreateRequest())).isInstanceOf(CategoryNotFoundException.class);
    }

    @Test
    void createExceptionByUnsupportedImageFormatExceptionTest() {
        // given
        BoardCreateRequest req = createBoardCreateRequestWithImages(
                List.of(new MockMultipartFile("test", "test.txt", MediaType.TEXT_PLAIN_VALUE, "test".getBytes()))
        );
        given(memberRepository.findById(anyLong())).willReturn(Optional.of(createMember()));
        given(categoryRepository.findById(anyLong())).willReturn(Optional.of(createCategory()));

        // when, then
        assertThatThrownBy(() -> boardService.create(req)).isInstanceOf(UnsupportedImageFormatException.class);
    }

    @Test
    void readTest() {
        // given
        Board board = createBoardWithImages(List.of(createImage(), createImage()));
        given(boardRepository.findById(anyLong())).willReturn(Optional.of(board));

        // when
        BoardDto BoardDto = boardService.read(1L);

        // then
        assertThat(BoardDto.getTitle()).isEqualTo(board.getTitle());
        assertThat(BoardDto.getImages().size()).isEqualTo(board.getBoardImages().size());
    }

    @Test
    void readExceptionByBoardNotFoundTest() {
        // given
        given(boardRepository.findById(anyLong())).willReturn(Optional.ofNullable(null));

        // when, then
        assertThatThrownBy(() -> boardService.read(1L)).isInstanceOf(BoardNotFoundException.class);
    }

    @Test
    void deleteTest() {
        // given
        Board board = createBoardWithImages(List.of(createImage(), createImage()));
        given(boardRepository.findById(anyLong())).willReturn(Optional.of(board));

        // when
        boardService.delete(1L);

        // then
        verify(fileService, times(board.getBoardImages().size())).delete(anyString());
        verify(boardRepository).delete(any());
    }

    @Test
    void deleteExceptionByNotFoundPostTest() {
        // given
        given(boardRepository.findById(anyLong())).willReturn(Optional.ofNullable(null));

        // when, then
        assertThatThrownBy(() -> boardService.delete(1L)).isInstanceOf(BoardNotFoundException.class);
    }

    @Test
    void updateTest() {
        // given
        BoardImage a = createImageWithIdAndOriginName(1L, "a.png");
        BoardImage b = createImageWithIdAndOriginName(2L, "b.png");
        Board board = createBoardWithImages(List.of(a, b));
        given(boardRepository.findById(anyLong())).willReturn(Optional.of(board));
        MockMultipartFile cFile = new MockMultipartFile("c", "c.png", MediaType.IMAGE_PNG_VALUE, "c".getBytes());
        BoardUpdateRequest postUpdateRequest = createBoardUpdateRequest("title", "content", BoardType.PUBLIC, List.of(cFile), List.of(a.getId()));

        // when
        boardService.update(1L, postUpdateRequest);

        // then
        List<BoardImage> images = board.getBoardImages();
        List<String> originNames = images.stream().map(i -> i.getOriginName()).collect(toList());
        assertThat(originNames.size()).isEqualTo(2);
        assertThat(originNames).contains(b.getOriginName(), cFile.getOriginalFilename());

        verify(fileService, times(1)).upload(any(), anyString());
        verify(fileService, times(1)).delete(anyString());
    }

    @Test
    void updateExceptionByBoardNotFoundTest() {
        // given
        given(boardRepository.findById(anyLong())).willReturn(Optional.ofNullable(null));

        // when, then
        assertThatThrownBy(() -> boardService.update(1L, createBoardUpdateRequest("title", "content", BoardType.PUBLIC, List.of(), List.of())))
                .isInstanceOf(BoardNotFoundException.class);
    }
}