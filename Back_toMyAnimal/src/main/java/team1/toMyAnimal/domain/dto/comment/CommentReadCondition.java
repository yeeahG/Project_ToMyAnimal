package team1.toMyAnimal.domain.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentReadCondition {
    @NotNull
    @PositiveOrZero
    private Long postId;
}
