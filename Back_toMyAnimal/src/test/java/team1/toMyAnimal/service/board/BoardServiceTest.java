package team1.toMyAnimal.service.board;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import team1.toMyAnimal.domain.dto.board.BoardCreateRequest;
import team1.toMyAnimal.exception.CategoryNotFoundException;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.exception.UnsupportedImageFormatException;
import team1.toMyAnimal.repository.category.CategoryRepository;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.service.image.FileService;

import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static team1.toMyAnimal.factory.BoardCreateRequestFactory.createBoardCreateRequest;
import static team1.toMyAnimal.factory.BoardCreateRequestFactory.createBoardCreateRequestWithImages;
import static team1.toMyAnimal.factory.BoardFactory.createBoardWithImages;
import static team1.toMyAnimal.factory.CategoryFactory.createCategory;
import static team1.toMyAnimal.factory.ImageFactory.createImage;
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
}