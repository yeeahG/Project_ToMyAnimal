package team1.toMyAnimal.domain.dto.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import team1.toMyAnimal.domain.board.Board;
import team1.toMyAnimal.exception.CategoryNotFoundException;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.repository.category.CategoryRepository;
import team1.toMyAnimal.repository.member.MemberRepository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.PositiveOrZero;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardCreateRequest {

    @NotBlank(message = "게시글 제목을 입력해주세요.")
    private String title;
    @NotBlank(message = "게시글 본문을 입력해주세요.")
    private String content;

    @Null
    private Long memberId;

    @NotNull(message = "카테고리 아이디를 입력해주세요.")
    @PositiveOrZero
    private Long categoryId;

    public static Board toEntity(BoardCreateRequest req, MemberRepository memberRepository, CategoryRepository categoryRepository) {
        return new Board(
                req.title,
                req.content,
                memberRepository.findById(req.getMemberId()).orElseThrow(MemberNotFoundException::new),
                categoryRepository.findById(req.getCategoryId()).orElseThrow(CategoryNotFoundException::new));
    }
}
