package team1.toMyAnimal.controller.board;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import team1.toMyAnimal.domain.board.Board;
import team1.toMyAnimal.domain.board.BoardType;
import team1.toMyAnimal.domain.category.Category;
import team1.toMyAnimal.domain.dto.board.BoardCreateRequest;
import team1.toMyAnimal.domain.dto.sign.SignInResponse;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.exception.BoardNotFoundException;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.init.TestInitDB;
import team1.toMyAnimal.repository.board.BoardRepository;
import team1.toMyAnimal.repository.category.CategoryRepository;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.service.board.BoardService;
import team1.toMyAnimal.repository.service.sign.SignService;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static team1.toMyAnimal.factory.BoardCreateRequestFactory.createBoardCreateRequest;
import static team1.toMyAnimal.factory.BoardFactory.createBoard;
import static team1.toMyAnimal.factory.SignInRequestFactory.createSignInRequest;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles(value = "test")
@Transactional
public class BoardControllerIntegrationTest {
    @Autowired
    WebApplicationContext context;
    @Autowired
    MockMvc mockMvc;

    @Autowired
    TestInitDB initDB;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    BoardRepository boardRepository;
    @Autowired
    SignService signService;

    @Autowired
    BoardService boardService;

    Member member1, member2, admin;
    Category category;

    @BeforeEach
    void beforeEach() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
        initDB.initDB();
        member1 = memberRepository.findByIdentifier(initDB.getMember1Identifer()).orElseThrow(MemberNotFoundException::new);
        member2 = memberRepository.findByIdentifier(initDB.getMember2identifer()).orElseThrow(MemberNotFoundException::new);
        admin = memberRepository.findByIdentifier(initDB.getAdminidentifer()).orElseThrow(MemberNotFoundException::new);

        category = categoryRepository.findAll().get(0);
    }

    @Test
    void createTest() throws Exception {
        // given
        SignInResponse signInRes = signService.signIn(createSignInRequest(member1.getIdentifier(), initDB.getPassword()));
        BoardCreateRequest req = createBoardCreateRequest("title", "content", BoardType.PUBLIC, member1.getId(), category.getId(), List.of());

        // when, then
        mockMvc.perform(
                        multipart("/api/board")
                                .param("title", req.getTitle())
                                .param("content", req.getContent())
                                .param("type", String.valueOf(req.getType()))
                                .param("categoryId", String.valueOf(req.getCategoryId()))
                                .with(requestBoardProcessor -> {
                                    requestBoardProcessor.setMethod("Board");
                                    return requestBoardProcessor;
                                })
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                                .header("Authorization", signInRes.getAccessToken()))
                .andExpect(status().isCreated());

        Board Board = boardRepository.findAll().get(0);
        assertThat(Board.getTitle()).isEqualTo("title");
        assertThat(Board.getContent()).isEqualTo("content");
        assertThat(Board.getMember().getId()).isEqualTo(member1.getId()); // 1
    }

    @Test
    void createUnauthorizedByNoneTokenTest() throws Exception {
        // given
        BoardCreateRequest req = createBoardCreateRequest("title", "content", BoardType.PUBLIC, member1.getId(), category.getId(), List.of());

        // when, then
        mockMvc.perform(
                        multipart("/api/board")
                                .param("title", req.getTitle())
                                .param("content", req.getContent())
                                .param("type", String.valueOf(req.getType()))
                                .param("categoryId", String.valueOf(req.getCategoryId()))
                                .with(requestBoardProcessor -> {
                                    requestBoardProcessor.setMethod("Board");
                                    return requestBoardProcessor;
                                })
                                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/exception/entry-point"));
    }

    @Test
    void readTest() throws Exception {
        // given
        Board board = boardRepository.save(createBoard(member1, category));

        // when, then
        mockMvc.perform(
                        get("/api/board/{id}", board.getId()))
                .andExpect(status().isOk());
    }

    @Test
    void deleteByResourceOwnerTest() throws Exception {
        // given
        Board board = boardRepository.save(createBoard(member1, category));
        SignInResponse signInRes = signService.signIn(createSignInRequest(member1.getIdentifier(), initDB.getPassword()));

        // when, then
        mockMvc.perform(
                        delete("/api/board/{id}", board.getId())
                                .header("Authorization", signInRes.getAccessToken()))
                .andExpect(status().isOk());

        assertThatThrownBy(() -> boardService.read(board.getId())).isInstanceOf(BoardNotFoundException.class);
    }

    @Test
    void deleteByAdminTest() throws Exception {
        // given
        Board board = boardRepository.save(createBoard(member1, category));
        SignInResponse adminSignInRes = signService.signIn(createSignInRequest(admin.getEmail(), initDB.getPassword()));

        // when, then
        mockMvc.perform(
                        delete("/api/board/{id}", board.getId())
                                .header("Authorization", adminSignInRes.getAccessToken()))
                .andExpect(status().isOk());

        assertThatThrownBy(() -> boardService.read(board.getId())).isInstanceOf(BoardNotFoundException.class);
    }

    @Test
    void deleteAccessDeniedByNotResourceOwnerTest() throws Exception {
        // given
        Board board = boardRepository.save(createBoard(member1, category));
        SignInResponse notOwnerSignInRes = signService.signIn(createSignInRequest(member2.getEmail(), initDB.getPassword()));

        // when, then
        mockMvc.perform(
                        delete("/api/board/{id}", board.getId())
                                .header("Authorization", notOwnerSignInRes.getAccessToken()))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/exception/access-denied"));
    }

    @Test
    void deleteUnauthorizedByNoneTokenTest() throws Exception {
        // given
        Board board = boardRepository.save(createBoard(member1, category));

        // when, then
        mockMvc.perform(
                        delete("/api/board/{id}", board.getId()))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/exception/entry-point"));
    }

    @Test
    void updateByResourceOwnerTest() throws Exception {
        // given
        SignInResponse signInRes = signService.signIn(createSignInRequest(member1.getEmail(), initDB.getPassword()));
        Board board = boardRepository.save(createBoard(member1, category));
        String updatedTitle = "updatedTitle";
        String updatedContent = "updatedContent";
        Integer updatedType = 1;

        // when, then
        mockMvc.perform(
                        multipart("/api/board/{id}", board.getId())
                                .param("title", updatedTitle)
                                .param("content", updatedContent)
                                .param("type", String.valueOf(updatedType))
                                .with(requestBoardProcessor -> {
                                    requestBoardProcessor.setMethod("PUT");
                                    return requestBoardProcessor;
                                })
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                                .header("Authorization", signInRes.getAccessToken()))
                .andExpect(status().isOk());

        Board updatedBoard = boardRepository.findById(board.getId()).orElseThrow(BoardNotFoundException::new);
        assertThat(updatedBoard.getTitle()).isEqualTo(updatedTitle);
        assertThat(updatedBoard.getContent()).isEqualTo(updatedContent);
        assertThat(updatedBoard.getType()).isEqualTo(updatedType);
    }

    @Test
    void updateByAdminTest() throws Exception {
        // given
        SignInResponse adminSignInRes = signService.signIn(createSignInRequest(admin.getEmail(), initDB.getPassword()));
        Board board = boardRepository.save(createBoard(member1, category));
        String updatedTitle = "updatedTitle";
        String updatedContent = "updatedContent";
        Integer updatedType = 1;

        // when, then
        mockMvc.perform(
                        multipart("/api/Board/{id}", board.getId())
                                .param("title", updatedTitle)
                                .param("content", updatedContent)
                                .param("type", String.valueOf(updatedType))
                                .with(requestBoardProcessor -> {
                                    requestBoardProcessor.setMethod("PUT");
                                    return requestBoardProcessor;
                                })
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                                .header("Authorization", adminSignInRes.getAccessToken()))
                .andExpect(status().isOk());

        Board updatedBoard = boardRepository.findById(board.getId()).orElseThrow(BoardNotFoundException::new);
        assertThat(updatedBoard.getTitle()).isEqualTo(updatedTitle);
        assertThat(updatedBoard.getContent()).isEqualTo(updatedContent);
        assertThat(updatedBoard.getType()).isEqualTo(updatedType);
    }

    @Test
    void updateUnauthorizedByNoneTokenTest() throws Exception {
        // given
        Board board = boardRepository.save(createBoard(member1, category));
        String updatedTitle = "updatedTitle";
        String updatedContent = "updatedContent";
        Integer updatedType = 1;

        // when, then
        mockMvc.perform(
                        multipart("/api/board/{id}", board.getId())
                                .param("title", updatedTitle)
                                .param("content", updatedContent)
                                .param("type", String.valueOf(updatedType))
                                .with(requestBoardProcessor -> {
                                    requestBoardProcessor.setMethod("PUT");
                                    return requestBoardProcessor;
                                })
                                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/exception/entry-point"));
    }
    @Test
    void updateAccessDeniedByNotResourceOwnerTest() throws Exception {
        // given
        SignInResponse notOwnerSignInRes = signService.signIn(createSignInRequest(member2.getEmail(), initDB.getPassword()));
        Board board = boardRepository.save(createBoard(member1, category));
        String updatedTitle = "updatedTitle";
        String updatedContent = "updatedContent";
        Integer updatedType = 1;

        // when, then
        mockMvc.perform(
                        multipart("/api/board/{id}", board.getId())
                                .param("title", updatedTitle)
                                .param("content", updatedContent)
                                .param("type", String.valueOf(updatedType))
                                .with(requestBoardProcessor -> {
                                    requestBoardProcessor.setMethod("PUT");
                                    return requestBoardProcessor;
                                })
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                                .header("Authorization", notOwnerSignInRes.getAccessToken()))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/exception/access-denied"));
    }
}

