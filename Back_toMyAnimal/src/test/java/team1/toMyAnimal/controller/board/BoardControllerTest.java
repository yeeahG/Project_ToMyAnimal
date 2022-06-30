package team1.toMyAnimal.controller.board;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.dto.board.BoardCreateRequest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static team1.toMyAnimal.factory.BoardCreateRequestFactory.createBoardCreateRequestWithImages;

@ExtendWith(MockitoExtension.class)
class BoardControllerTest {
    @InjectMocks
    BoardController boardController;
    @Mock
    team1.toMyAnimal.service.board.BoardService boardService;
    MockMvc mockMvc;

    @BeforeEach
    void beforeEach() {
        mockMvc = MockMvcBuilders.standaloneSetup(boardController).build();
    }

    @Test
    void createTest() throws Exception{
        // given
        ArgumentCaptor<BoardCreateRequest> BoardCreateRequestArgumentCaptor = ArgumentCaptor.forClass(BoardCreateRequest.class);

        List<MultipartFile> imageFiles = List.of(
                new MockMultipartFile("test1", "test1.PNG", MediaType.IMAGE_PNG_VALUE, "test1".getBytes()),
                new MockMultipartFile("test2", "test2.PNG", MediaType.IMAGE_PNG_VALUE, "test2".getBytes())
        );
        BoardCreateRequest req = createBoardCreateRequestWithImages(imageFiles);

        // when, then
        mockMvc.perform(
                        multipart("/api/Boards")
                                .file("images", imageFiles.get(0).getBytes())
                                .file("images", imageFiles.get(1).getBytes())
                                .param("title", req.getTitle())
                                .param("content", req.getContent())
                                .param("type", String.valueOf(req.getType()))
                                .param("categoryId", String.valueOf(req.getCategoryId()))
                                .with(requestBoardProcessor -> { // 3
                                    requestBoardProcessor.setMethod("Board");
                                    return requestBoardProcessor;
                                })
                                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isCreated());

        verify(boardService).create(BoardCreateRequestArgumentCaptor.capture());

        BoardCreateRequest capturedRequest = BoardCreateRequestArgumentCaptor.getValue();
        assertThat(capturedRequest.getImages().size()).isEqualTo(2);
    }
}
