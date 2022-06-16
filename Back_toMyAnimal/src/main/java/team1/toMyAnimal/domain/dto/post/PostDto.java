package team1.toMyAnimal.domain.dto.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import team1.toMyAnimal.domain.dto.member.MemberDto;
import team1.toMyAnimal.domain.post.Post;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Data
@AllArgsConstructor
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private MemberDto member;
    private List<ImageDto> images;

    public static PostDto toDto(Post post) {
        return new PostDto(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                MemberDto.toDto(post.getMember()),
                post.getImages().stream().map(i -> ImageDto.toDto(i)).collect(toList())
        );
    }
}
