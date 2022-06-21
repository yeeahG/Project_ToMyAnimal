package team1.toMyAnimal.domain.dto.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
// 검색 조건
public class PostReadCondition {
    private Long memberId;
}
