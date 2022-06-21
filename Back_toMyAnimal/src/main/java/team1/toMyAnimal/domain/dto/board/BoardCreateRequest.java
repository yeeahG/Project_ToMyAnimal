package team1.toMyAnimal.domain.dto.board;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import team1.toMyAnimal.domain.board.Board;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.repository.member.MemberRepository;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;

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

    public static Board toEntity(BoardCreateRequest req, MemberRepository memberRepository) {
        return new Board(
                req.title,
                req.content,
                memberRepository.findById(req.getMemberId()).orElseThrow(MemberNotFoundException::new));
    }
}