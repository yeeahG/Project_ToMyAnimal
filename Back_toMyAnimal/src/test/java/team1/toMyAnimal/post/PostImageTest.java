package team1.toMyAnimal.post;

import org.junit.jupiter.api.Test;
import team1.toMyAnimal.image.PostImage;
import team1.toMyAnimal.domain.post.Post;
import team1.toMyAnimal.exception.UnsupportedImageFormatException;


import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static team1.toMyAnimal.factory.post.ImageFactory.createImage;
import static team1.toMyAnimal.factory.post.ImageFactory.createImageWithOriginName;
import static team1.toMyAnimal.factory.post.PostFactory.createPost;


class PostImageTest {

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
    void initPostTest() {
        // given
        PostImage postImage = createImage();

        // when
        Post post = createPost();
        postImage.initPost(post);

        // then
        assertThat(postImage.getPost()).isSameAs(post);
    }

    @Test
    void initPostNotChangedTest() {
        // given
        PostImage postImage = createImage();
        postImage.initPost(createPost());

        // when
        Post post = createPost();
        postImage.initPost(post);

        // then
        assertThat(postImage.getPost()).isNotSameAs(post);
    }

}
