package team1.toMyAnimal.domain.dto.post;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import team1.toMyAnimal.domain.dto.member.MemberDto;
import team1.toMyAnimal.domain.dto.image.PostImageDto;
import team1.toMyAnimal.domain.post.Post;

import java.time.LocalDateTime;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Data
@AllArgsConstructor
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private MemberDto member;
    private List<PostImageDto> images;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdAt;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime modifiedAt;

    public static PostDto toDto(Post post) {
        return new PostDto(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                MemberDto.toDto(post.getMember()),
                post.getPostImages().stream().map(i -> PostImageDto.toDto(i)).collect(toList()),
                post.getCreatedAt(),
                post.getModifiedAt()
        );
    }
}
