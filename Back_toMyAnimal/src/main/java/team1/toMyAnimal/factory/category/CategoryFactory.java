package team1.toMyAnimal.factory.category;


import team1.toMyAnimal.domain.category.Category;

public class CategoryFactory {

    public static Category createCategory() {
        return new Category("name", null);
    }

    public static Category createCategory(String name, Category parent) {
        return new Category(name, parent);
    }

    public static Category createCategoryWithName(String name) {
        return new Category(name, null);
    }
}
