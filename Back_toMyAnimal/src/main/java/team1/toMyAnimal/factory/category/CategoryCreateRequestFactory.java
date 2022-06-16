package team1.toMyAnimal.factory.category;


import team1.toMyAnimal.domain.dto.category.CategoryCreateRequest;

public class CategoryCreateRequestFactory {
    public static CategoryCreateRequest createCategoryCreateRequest() {
        return new CategoryCreateRequest("category", null);
    }

    public static CategoryCreateRequest createCategoryCreateRequestWithName(String name) {
        return new CategoryCreateRequest(name, null);
    }
}
