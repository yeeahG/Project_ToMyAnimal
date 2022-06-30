package team1.toMyAnimal.factory;


import team1.toMyAnimal.domain.image.BoardImage;

import java.awt.*;

public class ImageFactory {
    public static BoardImage createImage() {
        return new BoardImage("origin_filename.jpg");
    }

    public static BoardImage createImageWithOriginName(String originName) {
        return new BoardImage(originName);
    }
}
