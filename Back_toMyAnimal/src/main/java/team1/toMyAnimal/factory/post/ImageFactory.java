package team1.toMyAnimal.factory.post;


import team1.toMyAnimal.image.PostImage;

public class ImageFactory {
    public static PostImage createImage() {
        return new PostImage("origin_filename.jpg");
    }

    public static PostImage createImageWithOriginName(String originName) {
        return new PostImage(originName);
    }
}
