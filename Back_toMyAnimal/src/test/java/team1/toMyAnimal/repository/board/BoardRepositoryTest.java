package team1.toMyAnimal.repository.board;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import team1.toMyAnimal.domain.board.Board;
import team1.toMyAnimal.domain.category.Category;
import team1.toMyAnimal.domain.dto.board.BoardUpdateRequest;
import team1.toMyAnimal.domain.image.BoardImage;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.exception.BoardNotFoundException;
import team1.toMyAnimal.repository.category.CategoryRepository;
import team1.toMyAnimal.repository.image.ImageRepository;
import team1.toMyAnimal.repository.member.MemberRepository;



import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static team1.toMyAnimal.factory.BoardFactory.createBoard;
import static team1.toMyAnimal.factory.BoardFactory.createBoardWithImages;
import static team1.toMyAnimal.factory.BoardUpdateRequestFactory.createBoardUpdateRequest;
import static team1.toMyAnimal.factory.CategoryFactory.createCategory;
import static team1.toMyAnimal.factory.ImageFactory.createImage;
import static team1.toMyAnimal.factory.ImageFactory.createImageWithOriginName;
import static team1.toMyAnimal.factory.MemberFactory.createMember;


@DataJpaTest
class BoardRepositoryTest {
    @Autowired
    BoardRepository boardRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ImageRepository imageRepository;
    @PersistenceContext
    EntityManager em;

    Member member;
    Category category;

    @BeforeEach
    void beforeEach() {
        member = memberRepository.save(createMember());
        category = categoryRepository.save(createCategory());
    }

    @Test
    void createAndReadTest() { // 생성 및 조회 검증
        // given
        Board Board = boardRepository.save(createBoard(member, category));
        clear();

        // when
        Board foundBoard = boardRepository.findById(Board.getId()).orElseThrow(BoardNotFoundException::new);

        // then
        assertThat(foundBoard.getId()).isEqualTo(Board.getId());
        assertThat(foundBoard.getTitle()).isEqualTo(Board.getTitle());
    }

    @Test
    void deleteTest() { // 삭제 검증
        // given
        Board Board = boardRepository.save(createBoard(member, category));
        clear();

        // when
        boardRepository.deleteById(Board.getId());
        clear();

        // then
        assertThatThrownBy(() -> boardRepository.findById(Board.getId()).orElseThrow(BoardNotFoundException::new))
                .isInstanceOf(BoardNotFoundException.class);
    }

    @Test
    void createCascadeImageTest() { // 이미지도 연쇄적으로 생성되는지 검증
        // given
        Board Board = boardRepository.save(createBoardWithImages(member, category, List.of(createImage(), createImage())));
        clear();

        // when
        Board foundBoard = boardRepository.findById(Board.getId()).orElseThrow(BoardNotFoundException::new);

        // then
        List<BoardImage> images = foundBoard.getBoardImages();
        assertThat(images.size()).isEqualTo(2);
    }

    @Test
    void deleteCascadeImageTest() { // 이미지도 연쇄적으로 제거되는지 검증
        // given
        Board Board = boardRepository.save(createBoardWithImages(member, category, List.of(createImage(), createImage())));
        clear();

        // when
        boardRepository.deleteById(Board.getId());
        clear();

        // then
        List<BoardImage> images = imageRepository.findAll();
        assertThat(images.size()).isZero();
    }

    @Test
    void deleteCascadeByMemberTest() { // Member가 삭제되었을 때 연쇄적으로 Board도 삭제되는지 검증
        // given
        boardRepository.save(createBoardWithImages(member, category, List.of(createImage(), createImage())));
        clear();

        // when
        memberRepository.deleteById(member.getId());
        clear();

        // then
        List<Board> result = boardRepository.findAll();
        assertThat(result.size()).isZero();
    }

    @Test
    void deleteCascadeByCategoryTest() { // Category가 삭제되었을 때 연쇄적으로 Board도 삭제되는지 검증
        // given
        boardRepository.save(createBoardWithImages(member, category, List.of(createImage(), createImage())));
        clear();

        // when
        categoryRepository.deleteById(category.getId());
        clear();

        // then
        List<Board> result = boardRepository.findAll();
        assertThat(result.size()).isZero();
    }

    @Test
    void findByIdWithMemberTest() {
        // given
        Board board = boardRepository.save(createBoard(member, category));

        // when
        Board foundBoard = boardRepository.findById(board.getId()).orElseThrow(BoardNotFoundException::new);

        // then
        Member foundMember = foundBoard.getMember();
        assertThat(foundMember.getEmail()).isEqualTo(member.getEmail());
    }

    void clear() {
        em.flush();
        em.clear();
    }

    @Test
    void updateTest() {
        // given
        BoardImage a = createImageWithOriginName("a.jpg");
        BoardImage b = createImageWithOriginName("b.png");
        Board board = boardRepository.save(createBoardWithImages(member, category, List.of(a, b)));
        clear();

        // when
        MockMultipartFile cFile = new MockMultipartFile("c", "c.png", MediaType.IMAGE_PNG_VALUE, "cFile".getBytes());
        BoardUpdateRequest postUpdateRequest = createBoardUpdateRequest("update title", "update content", 1, List.of(cFile), List.of(a.getId()));
        Board foundBoard = boardRepository.findById(board.getId()).orElseThrow(BoardNotFoundException::new);
        foundBoard.update(postUpdateRequest);
        clear();

        // then
        Board result = boardRepository.findById(board.getId()).orElseThrow(BoardNotFoundException::new);
        assertThat(result.getTitle()).isEqualTo(postUpdateRequest.getTitle());
        assertThat(result.getContent()).isEqualTo(postUpdateRequest.getContent());
        assertThat(result.getType()).isEqualTo(postUpdateRequest.getType());
        List<BoardImage> images = result.getBoardImages();
        List<String> originNames = images.stream().map(i -> i.getOriginName()).collect(toList());
        assertThat(images.size()).isEqualTo(2);
        assertThat(originNames).contains(b.getOriginName(), cFile.getOriginalFilename());
        List<BoardImage> resultImages = imageRepository.findAll();
        assertThat(resultImages.size()).isEqualTo(2);
    }
}