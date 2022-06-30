package team1.toMyAnimal.factory;


import org.springframework.test.util.ReflectionTestUtils;
import team1.toMyAnimal.domain.image.BoardImage;

import java.awt.*;

public class ImageFactory {
    public static BoardImage createImage() {
        return new BoardImage("origin_filename.jpg");
    }

    public static BoardImage createImageWithOriginName(String originName) {
        return new BoardImage(originName);
    }

    public static BoardImage createImageWithIdAndOriginName(Long id, String originName) {
        BoardImage Boardimage = new BoardImage(originName);
        ReflectionTestUtils.setField(Boardimage, "id", id);
        return Boardimage;
    }
}
