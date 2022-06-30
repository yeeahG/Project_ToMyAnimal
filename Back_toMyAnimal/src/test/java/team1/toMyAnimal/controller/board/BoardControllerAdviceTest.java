package team1.toMyAnimal.controller.board;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import team1.toMyAnimal.domain.dto.board.BoardCreateRequest;
import team1.toMyAnimal.exception.*;
import team1.toMyAnimal.service.board.BoardService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static team1.toMyAnimal.factory.BoardCreateRequestFactory.createBoardCreateRequest;

@ExtendWith(MockitoExtension.class)
public class BoardControllerAdviceTest {
    @InjectMocks
    BoardController boardController;
    @Mock
    BoardService boardService;
    MockMvc mockMvc;

    @BeforeEach
    void beforeEach() {
        mockMvc = MockMvcBuilders.standaloneSetup(boardController).setControllerAdvice(new ExceptionAdvice()).build();
    }

    @Test
    void createExceptionByMemberNotFoundException() throws Exception{
        // given
        given(boardService.create(any())).willThrow(MemberNotFoundException.class);

        // when, then
        performCreate()
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(-1007));
    }

    @Test
    void createExceptionByCategoryNotFoundException() throws Exception{
        // given
        given(boardService.create(any())).willThrow(CategoryNotFoundException.class);

        // when, then
        performCreate()
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(-1010));
    }

    @Test
    void createExceptionByUnsupportedImageFormatException() throws Exception{
        // given
        given(boardService.create(any())).willThrow(UnsupportedImageFormatException.class);

        // when, then
        performCreate()
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(-1013));
    }

    private ResultActions performCreate() throws Exception {
        BoardCreateRequest req = createBoardCreateRequest();
        return mockMvc.perform(
                multipart("/api/board")
                        .param("title", req.getTitle())
                        .param("content", req.getContent())
                        .param("type", String.valueOf(req.getType()))
                        .param("categoryId", String.valueOf(req.getCategoryId()))
                        .with(requestBoardProcessor -> {
                            requestBoardProcessor.setMethod("Board");
                            return requestBoardProcessor;
                        })
                        .contentType(MediaType.MULTIPART_FORM_DATA));
    }
    @Test
    void readExceptionByBoardNotFoundTest() throws Exception {
        // given
        given(boardService.read(anyLong())).willThrow(BoardNotFoundException.class);

        // when, then
        mockMvc.perform(
                        get("/api/board/{id}", 1L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(-1012));
    }

    @Test
    void deleteExceptionByBoardNotFoundTest() throws Exception {
        // given
        doThrow(BoardNotFoundException.class).when(boardService).delete(anyLong());

        // when, then
        mockMvc.perform(
                        delete("/api/board/{id}", 1L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(-1012));
    }

}