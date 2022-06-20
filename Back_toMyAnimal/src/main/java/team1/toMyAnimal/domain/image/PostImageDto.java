package team1.toMyAnimal.domain.image;

import lombok.AllArgsConstructor;
import lombok.Data;
import team1.toMyAnimal.image.PostImage;

@Data
@AllArgsConstructor
public class PostImageDto {
    private Long id;
    private String originName;
    private String uniqueName;
    public static PostImageDto toDto(PostImage postImage) {
        return new PostImageDto(postImage.getId(), postImage.getOriginName(), postImage.getUniqueName());
    }
}
