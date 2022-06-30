package team1.toMyAnimal.dto.board;

import org.junit.jupiter.api.Test;
import team1.toMyAnimal.domain.dto.board.BoardUpdateRequest;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;

import static java.util.stream.Collectors.toSet;
import static org.assertj.core.api.Assertions.assertThat;
import static team1.toMyAnimal.factory.BoardUpdateRequestFactory.createBoardUpdateRequest;

class BoardUpdateRequestValidationTest {
    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    @Test
    void validateTest() {
        // given
        BoardUpdateRequest req = createBoardUpdateRequest("title", "content", 0, List.of(), List.of());

        // when
        Set<ConstraintViolation<BoardUpdateRequest>> validate = validator.validate(req);

        // then
        assertThat(validate).isEmpty();
    }

    @Test
    void invalidateByEmptyTitleTest() {
        // given
        String invalidValue = null;
        BoardUpdateRequest req = createBoardUpdateRequest(invalidValue, "content", 0, List.of(), List.of());

        // when
        Set<ConstraintViolation<BoardUpdateRequest>> validate = validator.validate(req);

        // then
        assertThat(validate).isNotEmpty();
        assertThat(validate.stream().map(v -> v.getInvalidValue()).collect(toSet())).contains(invalidValue);
    }

    @Test
    void invalidateByBlankTitleTest() {
        // given
        String invalidValue = " ";
        BoardUpdateRequest req = createBoardUpdateRequest(invalidValue, "content", 0, List.of(), List.of());

        // when
        Set<ConstraintViolation<BoardUpdateRequest>> validate = validator.validate(req);

        // then
        assertThat(validate).isNotEmpty();
        assertThat(validate.stream().map(v -> v.getInvalidValue()).collect(toSet())).contains(invalidValue);
    }

    @Test
    void invalidateByEmptyContentTest() {
        // given
        String invalidValue = null;
        BoardUpdateRequest req = createBoardUpdateRequest("title", invalidValue, 0, List.of(), List.of());

        // when
        Set<ConstraintViolation<BoardUpdateRequest>> validate = validator.validate(req);

        // then
        assertThat(validate).isNotEmpty();
        assertThat(validate.stream().map(v -> v.getInvalidValue()).collect(toSet())).contains(invalidValue);
    }

    @Test
    void invalidateByBlankContentTest() {
        // given
        String invalidValue = " ";
        BoardUpdateRequest req = createBoardUpdateRequest("title", invalidValue, 0, List.of(), List.of());

        // when
        Set<ConstraintViolation<BoardUpdateRequest>> validate = validator.validate(req);

        // then
        assertThat(validate).isNotEmpty();
        assertThat(validate.stream().map(v -> v.getInvalidValue()).collect(toSet())).contains(invalidValue);
    }

    @Test
    void invalidateByNullPriceTest() {
        // given
        Integer invalidValue = null;
        BoardUpdateRequest req = createBoardUpdateRequest("title", "content", invalidValue, List.of(), List.of());

        // when
        Set<ConstraintViolation<BoardUpdateRequest>> validate = validator.validate(req);

        // then
        assertThat(validate).isNotEmpty();
        assertThat(validate.stream().map(v -> v.getInvalidValue()).collect(toSet())).contains(invalidValue);
    }

    @Test
    void invalidateByNegativePriceTest() {
        // given
        Integer invalidValue = -1;
        BoardUpdateRequest req = createBoardUpdateRequest("title", "content", invalidValue, List.of(), List.of());

        // when
        Set<ConstraintViolation<BoardUpdateRequest>> validate = validator.validate(req);

        // then
        assertThat(validate).isNotEmpty();
        assertThat(validate.stream().map(v -> v.getInvalidValue()).collect(toSet())).contains(invalidValue);
    }

}
