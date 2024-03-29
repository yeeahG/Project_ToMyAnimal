package team1.toMyAnimal.controller.category;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import team1.toMyAnimal.exception.CannotConvertNestedStructureException;
import team1.toMyAnimal.exception.CategoryNotFoundException;
import team1.toMyAnimal.exception.ExceptionAdvice;
import team1.toMyAnimal.repository.service.category.CategoryService;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class CategoryControllerAdviceTest {
    @InjectMocks
    CategoryController categoryController;
    @Mock
    CategoryService categoryService;
    MockMvc mockMvc;

    @BeforeEach
    void beforeEach() {
        mockMvc = MockMvcBuilders.standaloneSetup(categoryController).setControllerAdvice(new ExceptionAdvice()).build();
    }

    @Test
    void readAllTest() throws Exception {
        // given
        given(categoryService.readAll()).willThrow(CannotConvertNestedStructureException.class);

        // when, then
        mockMvc.perform(get("/api/categories"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.code").value(-1011));
    }

    @Test
    void deleteTest() throws Exception {
        // given
        doThrow(CategoryNotFoundException.class).when(categoryService).delete(anyLong());

        // when, then
        mockMvc.perform(delete("/api/categories/{id}", 1L))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(-1010));
    }
}