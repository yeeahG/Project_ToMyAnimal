package team1.toMyAnimal.domain.dto.board;

import org.junit.jupiter.api.Test;
import team1.toMyAnimal.domain.board.Board;
import team1.toMyAnimal.domain.image.BoardImage;
import team1.toMyAnimal.exception.UnsupportedImageFormatException;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static team1.toMyAnimal.factory.BoardFactory.createBoard;
import static team1.toMyAnimal.factory.ImageFactory.createImage;
import static team1.toMyAnimal.factory.ImageFactory.createImageWithOriginName;

class ImageTest {

    @Test
    void createImageTest() {
        // given
        String validExtension = "JPEG";

        // when, then
        createImageWithOriginName("image." + validExtension);
    }

    @Test
    void createImageExceptionByUnsupportedFormatTest() {
        // given
        String invalidExtension = "invalid";

        // when, then
        assertThatThrownBy(() -> createImageWithOriginName("image." + invalidExtension))
                .isInstanceOf(UnsupportedImageFormatException.class);
    }

    @Test
    void createImageExceptionByNoneExtensionTest() {
        // given
        String originName = "image";

        // when, then
        assertThatThrownBy(() -> createImageWithOriginName(originName))
                .isInstanceOf(UnsupportedImageFormatException.class);
    }

    @Test
    void initBoardTest() {
        // given
        BoardImage image = createImage();

        // when
        Board board = createBoard();
        image.initBoard(board);

        // then
        assertThat(image.getBoard()).isSameAs(board);
    }

    @Test
    void initBoardNotChangedTest() {
        // given
        BoardImage image = createImage();
        image.initBoard(createBoard());

        // when
        Board board = createBoard();
        image.initBoard(board);

        // then
        assertThat(image.getBoard()).isNotSameAs(board);
    }

}