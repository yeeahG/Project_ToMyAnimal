package team1.toMyAnimal.factory.post;

import team1.toMyAnimal.domain.category.Category;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.image.PostImage;
import team1.toMyAnimal.domain.post.Post;

import java.util.List;

import static team1.toMyAnimal.factory.category.CategoryFactory.createCategory;
import static team1.toMyAnimal.factory.member.MemberFactory.createMember;

public class PostFactory {
    public static Post createPost() {
        return createPost(createMember(), createCategory());
    }

    public static Post createPost(Member member, Category category) {
        return new Post("title", "content", member, category, List.of());
    }

    public static Post createPostWithImages(Member member, Category category, List<PostImage> postImages) {
        return new Post("title", "content", member, category, postImages);
    }

    public static Post createPostWithImages(List<PostImage> postImages) {
        return new Post("title", "content",createMember(), createCategory(), postImages);
    }
}
