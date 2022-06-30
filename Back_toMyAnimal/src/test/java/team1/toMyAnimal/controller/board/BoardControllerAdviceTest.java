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
import team1.toMyAnimal.exception.CategoryNotFoundException;
import team1.toMyAnimal.exception.ExceptionAdvice;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.exception.UnsupportedImageFormatException;
import team1.toMyAnimal.service.board.BoardService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static team1.toMyAnimal.factory.BoardCreateRequestFactory.createBoardCreateRequest;

@ExtendWith(MockitoExtension.class)
public class BoardControllerAdviceTest {
    @InjectMocks
    BoardController boardController;
    @Mock
    team1.toMyAnimal.service.board.BoardService boardService;
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
                multipart("/api/Boards")
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
}