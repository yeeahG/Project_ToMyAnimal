package team1.toMyAnimal.repository.board;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import team1.toMyAnimal.domain.board.Board;
import team1.toMyAnimal.domain.category.Category;
import team1.toMyAnimal.domain.image.BoardImage;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.exception.BoardNotFoundException;
import team1.toMyAnimal.repository.category.CategoryRepository;
import team1.toMyAnimal.repository.image.ImageRepository;
import team1.toMyAnimal.repository.member.MemberRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.awt.*;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static team1.toMyAnimal.factory.BoardFactory.createBoard;
import static team1.toMyAnimal.factory.BoardFactory.createBoardWithImages;
import static team1.toMyAnimal.factory.CategoryFactory.createCategory;
import static team1.toMyAnimal.factory.ImageFactory.createImage;
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
        Assertions.assertThat(result.size()).isZero();
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

    void clear() {
        em.flush();
        em.clear();
    }
}