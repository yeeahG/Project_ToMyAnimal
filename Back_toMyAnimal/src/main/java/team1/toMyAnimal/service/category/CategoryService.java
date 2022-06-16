package team1.toMyAnimal.service.category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team1.toMyAnimal.domain.category.Category;
import team1.toMyAnimal.domain.dto.category.CategoryCreateRequest;
import team1.toMyAnimal.domain.dto.category.CategoryDto;
import team1.toMyAnimal.exception.CategoryNotFoundException;
import team1.toMyAnimal.repository.category.CategoryRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<CategoryDto> readAll() {
        List<Category> categories = categoryRepository.findAllOrderByParentIdAscNullsFirstCategoryIdAsc();
        return CategoryDto.toDtoList(categories);
    }

    @Transactional
    public void create(CategoryCreateRequest req) {
        categoryRepository.save(CategoryCreateRequest.toEntity(req, categoryRepository));
    }

    @Transactional
    public void delete(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(CategoryNotFoundException::new);
        categoryRepository.delete(category);
    }
}
