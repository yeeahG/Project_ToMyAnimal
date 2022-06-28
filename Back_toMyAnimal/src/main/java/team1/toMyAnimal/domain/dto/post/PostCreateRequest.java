package team1.toMyAnimal.domain.dto.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.image.PostImage;
import team1.toMyAnimal.domain.post.Post;
import team1.toMyAnimal.exception.CategoryNotFoundException;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.repository.category.CategoryRepository;
import team1.toMyAnimal.repository.member.MemberRepository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.PositiveOrZero;
import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostCreateRequest {

    @NotBlank(message = "게시글 제목을 입력해주세요.")
    private String title;

    @NotBlank(message = "게시글 본문을 입력해주세요.")
    private String content;

    @Null
    private Long memberId;

    @NotNull(message = "카테고리 아이디를 입력해주세요.")
    @PositiveOrZero(message = "올바른 카테고리 아이디를 입력해주세요.")
    private Long categoryId;

    private List<MultipartFile> images = new ArrayList<>();

    public static Post toEntity(PostCreateRequest req, MemberRepository memberRepository, CategoryRepository categoryRepository) {
        return new Post(
                req.title,
                req.content,
                memberRepository.findById(req.getMemberId()).orElseThrow(MemberNotFoundException::new),
                categoryRepository.findById(req.getCategoryId()).orElseThrow(CategoryNotFoundException::new),
                req.images.stream().map(i -> new PostImage(i.getOriginalFilename())).collect(toList())
        );
    }
}