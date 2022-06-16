package team1.toMyAnimal.category;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import team1.toMyAnimal.domain.dto.category.CategoryCreateRequest;
import team1.toMyAnimal.domain.dto.category.CategoryDto;
import team1.toMyAnimal.exception.CategoryNotFoundException;
import team1.toMyAnimal.factory.category.CategoryFactory;
import team1.toMyAnimal.repository.category.CategoryRepository;
import team1.toMyAnimal.service.category.CategoryService;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static team1.toMyAnimal.factory.category.CategoryCreateRequestFactory.createCategoryCreateRequest;
import static team1.toMyAnimal.factory.category.CategoryFactory.createCategory;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @InjectMocks
    CategoryService categoryService;
    @Mock
    CategoryRepository categoryRepository;

    @Test
    void readAllTest() {
        // given
        given(categoryRepository.findAllOrderByParentIdAscNullsFirstCategoryIdAsc())
                .willReturn(
                        List.of(CategoryFactory.createCategoryWithName("name1"),
                                CategoryFactory.createCategoryWithName("name2")
                        )
                );

        // when
        List<CategoryDto> result = categoryService.readAll();

        // then
        assertThat(result.size()).isEqualTo(2);
        assertThat(result.get(0).getName()).isEqualTo("name1");
        assertThat(result.get(1).getName()).isEqualTo("name2");
    }

    @Test
    void createTest() {
        // given
        CategoryCreateRequest req = createCategoryCreateRequest();

        // when
        categoryService.create(req);

        // then
        verify(categoryRepository).save(any());
    }

    @Test
    void deleteTest() {
        // given
        given(categoryRepository.findById(anyLong())).willReturn(Optional.of(createCategory()));

        // when
        categoryService.delete(1L);

        // then
        verify(categoryRepository).delete(any());
    }

    @Test
    void deleteExceptionByCategoryNotFoundTest() {
        // given
        given(categoryRepository.findById(anyLong())).willReturn(Optional.ofNullable(null));

        // when, then
        assertThatThrownBy(() -> categoryService.delete(1L)).isInstanceOf(CategoryNotFoundException.class);
    }
}
