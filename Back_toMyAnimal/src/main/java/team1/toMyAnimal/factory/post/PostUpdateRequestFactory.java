package team1.toMyAnimal.factory.post;

import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.dto.post.PostUpdateRequest;

import java.util.List;

public class PostUpdateRequestFactory {
    public static PostUpdateRequest createPostUpdateRequest(String title, String content, List<MultipartFile> addedImages, List<Long> deletedImages) {
        return new PostUpdateRequest(title, content, addedImages, deletedImages);
    }
}
