package team1.toMyAnimal.repository.post;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.transaction.annotation.Transactional;
import team1.toMyAnimal.domain.dto.post.PostReadCondition;
import team1.toMyAnimal.domain.dto.post.PostSimpleDto;
import team1.toMyAnimal.domain.post.Post;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;

import java.util.List;
import java.util.function.Function;

import static com.querydsl.core.types.Projections.constructor;
import static team1.toMyAnimal.domain.post.QPost.post;

@Transactional(readOnly = true)
public class CustomPostRepositoryImpl extends QuerydslRepositorySupport implements CustomPostRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public CustomPostRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        super(Post.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public Page<PostSimpleDto> findAllByCondition(PostReadCondition cond) {
        Pageable pageable = PageRequest.of(cond.getPage(), cond.getSize());
        Predicate predicate = createPredicate(cond);
        return new PageImpl<>(fetchAll(predicate, pageable), pageable, fetchCount(predicate));
    }

    private List<PostSimpleDto> fetchAll(Predicate predicate, Pageable pageable) {
        return getQuerydsl().applyPagination(
                pageable,
                jpaQueryFactory
                        .select(constructor(PostSimpleDto.class, post.id, post.title, post.member.username, post.content , post.createdAt))
                        .from(post)
                        .join(post.member)
                        .where(predicate)
                        .orderBy(post.id.desc())
        ).fetch();
    }

    private Long fetchCount(Predicate predicate) {
        return jpaQueryFactory.select(post.count()).from(post).where(predicate).fetchOne();
    }

    private Predicate createPredicate(PostReadCondition cond) {
        return new BooleanBuilder()
                .and(orConditionsByEqCategoryIds(cond.getCategoryId()));
//                .and(orConditionsByEqMemberIds(cond.getMemberId()));
    }

    private Predicate orConditionsByEqCategoryIds(List<Long> categoryIds) {
        return orConditions(categoryIds, post.category.id::eq);
    }

//    private Predicate orConditionsByEqMemberIds(List<Long> memberIds) {
//        return orConditions(memberIds, post.member.id::eq);
//    }

    private <T> Predicate orConditions(List<T> values, Function<T, BooleanExpression> term) {
        return values.stream()
                .map(term)
                .reduce(BooleanExpression::or)
                .orElse(null);
    }
}
