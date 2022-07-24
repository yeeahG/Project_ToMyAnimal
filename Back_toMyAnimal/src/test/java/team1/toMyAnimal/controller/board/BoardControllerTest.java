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
import team1.toMyAnimal.domain.board.BoardType;
import team1.toMyAnimal.domain.dto.board.BoardCreateRequest;
import team1.toMyAnimal.domain.dto.board.BoardUpdateRequest;
import team1.toMyAnimal.repository.service.board.BoardService;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static team1.toMyAnimal.factory.BoardCreateRequestFactory.createBoardCreateRequestWithImages;
import static team1.toMyAnimal.factory.BoardUpdateRequestFactory.createBoardUpdateRequest;

@ExtendWith(MockitoExtension.class)
class BoardControllerTest {
    @InjectMocks
    BoardController boardController;
    @Mock
    BoardService boardService;
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
                        multipart("/api/board")
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

    @Test
    void readTest() throws Exception {
        // given
        Long id = 1L;

        // when, then
        mockMvc.perform(
                        get("/api/board/{id}", id))
                .andExpect(status().isOk());
        verify(boardService).read(id);
    }

    @Test
    void deleteTest() throws Exception {
        // given
        Long id = 1L;

        // when, then
        mockMvc.perform(
                        delete("/api/board/{id}", id))
                .andExpect(status().isOk());
        verify(boardService).delete(id);
    }

    @Test
    void updateTest() throws Exception{
        // given
        ArgumentCaptor<BoardUpdateRequest> boardUpdateRequestArgumentCaptor = ArgumentCaptor.forClass(BoardUpdateRequest.class);

        List<MultipartFile> addedImages = List.of(
                new MockMultipartFile("test1", "test1.PNG", MediaType.IMAGE_PNG_VALUE, "test1".getBytes()),
                new MockMultipartFile("test2", "test2.PNG", MediaType.IMAGE_PNG_VALUE, "test2".getBytes())
        );
        List<Long> deletedImages = List.of(1L, 2L);

        BoardUpdateRequest req = createBoardUpdateRequest("title", "content", BoardType.PUBLIC, addedImages, deletedImages);

        // when, then
        mockMvc.perform(
                        multipart("/api/board/{id}", 1L)
                                .file("addedImages", addedImages.get(0).getBytes())
                                .file("addedImages", addedImages.get(1).getBytes())
                                .param("deletedImages", String.valueOf(deletedImages.get(0)), String.valueOf(deletedImages.get(1)))
                                .param("title", req.getTitle())
                                .param("content", req.getContent())
                                .param("type", String.valueOf(req.getType()))
                                .with(requestBoardProcessor -> {
                                    requestBoardProcessor.setMethod("PUT");
                                    return requestBoardProcessor;
                                })
                                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk());
        verify(boardService).update(anyLong(), boardUpdateRequestArgumentCaptor.capture());

        BoardUpdateRequest capturedRequest = boardUpdateRequestArgumentCaptor.getValue();
        List<MultipartFile> capturedAddedImages = capturedRequest.getAddedImages();
        assertThat(capturedAddedImages.size()).isEqualTo(2);

        List<Long> capturedDeletedImages = capturedRequest.getDeletedImages();
        assertThat(capturedDeletedImages.size()).isEqualTo(2);
        assertThat(capturedDeletedImages).contains(deletedImages.get(0), deletedImages.get(1));
    }
}
