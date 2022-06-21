package team1.toMyAnimal.repository.post;

import org.springframework.data.domain.Page;
import team1.toMyAnimal.domain.dto.post.PostReadCondition;
import team1.toMyAnimal.domain.dto.post.PostSimpleDto;

public interface CustomPostRepository {
    Page<PostSimpleDto> findAllByCondition(PostReadCondition cond);
}