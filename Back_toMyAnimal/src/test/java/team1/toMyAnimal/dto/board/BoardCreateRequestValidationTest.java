package team1.toMyAnimal.dto.board;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import team1.toMyAnimal.domain.dto.board.BoardCreateRequest;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.Set;

import static java.util.stream.Collectors.toSet;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static team1.toMyAnimal.factory.BoardCreateRequestFactory.*;


class BoardCreateRequestValidationTest {
    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    @Test
    void validateTest() {
        // given
        BoardCreateRequest req = createBoardCreateRequestWithMemberId(null);

        // when
        Set<ConstraintViolation<BoardCreateRequest>> validate = validator.validate(req);

        // then
        assertThat(validate).isEmpty();
    }

    @Test
    void invalidateByEmptyTitleTest() {
        // given
        String invalidValue = null;
        BoardCreateRequest req = createBoardCreateRequestWithTitle(invalidValue);

        // when
        Set<ConstraintViolation<BoardCreateRequest>> validate = validator.validate(req);

        // then
        assertThat(validate).isNotEmpty();
        assertThat(validate.stream().map(v -> v.getInvalidValue()).collect(toSet())).contains(invalidValue);
    }

    @Test
    void invalidateByBlankTitleTest() {
        // given
        String invalidValue = " ";
        BoardCreateRequest req = createBoardCreateRequestWithTitle(invalidValue);

        // when
        Set<ConstraintViolation<BoardCreateRequest>> validate = validator.validate(req);

        // then
        Assertions.assertThat(validate).isNotEmpty();
        assertThat(validate.stream().map(v -> v.getInvalidValue()).collect(toSet())).contains(invalidValue);
    }

    @Test
    void invalidateByEmptyContentTest() {
        // given
        String invalidValue = null;
        BoardCreateRequest req = createBoardCreateRequestWithContent(invalidValue);

        // when
        Set<ConstraintViolation<BoardCreateRequest>> validate = validator.validate(req);

        // then
        Assertions.assertThat(validate).isNotEmpty();
        assertThat(validate.stream().map(v -> v.getInvalidValue()).collect(toSet())).contains(invalidValue);
    }

    @Test
    void invalidateByBlankContentTest() {
        // given
        String invalidValue = " ";
        BoardCreateRequest req = createBoardCreateRequestWithContent(invalidValue);

        // when
        Set<ConstraintViolation<BoardCreateRequest>> validate = validator.validate(req);

        // then
        Assertions.assertThat(validate).isNotEmpty();
        assertThat(validate.stream().map(v -> v.getInvalidValue()).collect(toSet())).contains(invalidValue);
    }

    @Test
    void invalidateByNullPriceTest() {
        // given
        Integer invalidValue = null;
        BoardCreateRequest req = createBoardCreateRequestWithType(invalidValue);

        // when
        Set<ConstraintViolation<BoardCreateRequest>> validate = validator.validate(req);

        // then
        Assertions.assertThat(validate).isNotEmpty();
        assertThat(validate.stream().map(v -> v.getInvalidValue()).collect(toSet())).contains(invalidValue);
    }

    @Test
    void invalidateByNegativePriceTest() {
        // given
        Integer invalidValue = -1;
        BoardCreateRequest req = createBoardCreateRequestWithType(invalidValue);

        // when
        Set<ConstraintViolation<BoardCreateRequest>> validate = validator.validate(req);

        // then
        Assertions.assertThat(validate).isNotEmpty();
        assertThat(validate.stream().map(v -> v.getInvalidValue()).collect(toSet())).contains(invalidValue);
    }

    @Test
    void invalidateByNotNullMemberIdTest() {
        // given
        Long invalidValue = 1L;
        BoardCreateRequest req = createBoardCreateRequestWithMemberId(invalidValue);

        // when
        Set<ConstraintViolation<BoardCreateRequest>> validate = validator.validate(req);

        // then
        Assertions.assertThat(validate).isNotEmpty();
        assertThat(validate.stream().map(v -> v.getInvalidValue()).collect(toSet())).contains(invalidValue);
    }

    @Test
    void invalidateByNullCategoryIdTest() {
        // given
        Long invalidValue = null;
        BoardCreateRequest req = createBoardCreateRequestWithCategoryId(invalidValue);

        // when
        Set<ConstraintViolation<BoardCreateRequest>> validate = validator.validate(req);

        // then
        Assertions.assertThat(validate).isNotEmpty();
        assertThat(validate.stream().map(v -> v.getInvalidValue()).collect(toSet())).contains(invalidValue);
    }

    @Test
    void invalidateByNegativeCategoryIdTest() {
        // given
        Long invalidValue = -1L;
        BoardCreateRequest req = createBoardCreateRequestWithCategoryId(invalidValue);

        // when
        Set<ConstraintViolation<BoardCreateRequest>> validate = validator.validate(req);

        // then
        Assertions.assertThat(validate).isNotEmpty();
        assertThat(validate.stream().map(v -> v.getInvalidValue()).collect(toSet())).contains(invalidValue);
    }
}
