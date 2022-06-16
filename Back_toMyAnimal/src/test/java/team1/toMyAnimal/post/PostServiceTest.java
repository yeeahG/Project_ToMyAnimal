package team1.toMyAnimal.post;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import team1.toMyAnimal.domain.dto.post.PostCreateRequest;
import team1.toMyAnimal.exception.CategoryNotFoundException;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.exception.UnsupportedImageFormatException;
import team1.toMyAnimal.repository.category.CategoryRepository;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.post.PostRepository;
import team1.toMyAnimal.service.post.FileService;
import team1.toMyAnimal.service.post.PostService;

import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;


import static java.util.stream.Collectors.toList;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static team1.toMyAnimal.factory.category.CategoryFactory.createCategory;
import static team1.toMyAnimal.factory.member.MemberFactory.createMember;
import static team1.toMyAnimal.factory.post.ImageFactory.createImage;
import static team1.toMyAnimal.factory.post.PostCreateRequestFactory.createPostCreateRequest;
import static team1.toMyAnimal.factory.post.PostCreateRequestFactory.createPostCreateRequestWithImages;
import static team1.toMyAnimal.factory.post.PostFactory.createPostWithImages;

@ExtendWith(MockitoExtension.class)
class PostServiceTest {
    @InjectMocks PostService postService;
    @Mock PostRepository postRepository;
    @Mock MemberRepository memberRepository;
    @Mock CategoryRepository categoryRepository;
    @Mock FileService fileService;

    @Test
    void createTest() {
        // given
        PostCreateRequest req = createPostCreateRequest();
        given(memberRepository.findById(anyLong())).willReturn(Optional.of(createMember()));
        given(categoryRepository.findById(anyLong())).willReturn(Optional.of(createCategory()));
        given(postRepository.save(any())).willReturn(createPostWithImages(
                IntStream.range(0, req.getImages().size()).mapToObj(i -> createImage()).collect(toList()))
        );

        // when
        postService.create(req);

        // then
        verify(postRepository).save(any());
        verify(fileService, times(req.getImages().size())).upload(any(), anyString());
    }

    @Test
    void createExceptionByMemberNotFoundTest() {
        // given
        given(memberRepository.findById(anyLong())).willReturn(Optional.ofNullable(null));

        // when, then
        assertThatThrownBy(() -> postService.create(createPostCreateRequest())).isInstanceOf(MemberNotFoundException.class);
    }

    @Test
    void createExceptionByCategoryNotFoundTest() {
        // given
        given(memberRepository.findById(anyLong())).willReturn(Optional.of(createMember()));
        given(categoryRepository.findById(anyLong())).willReturn(Optional.ofNullable(null));

        // when, then
        assertThatThrownBy(() -> postService.create(createPostCreateRequest())).isInstanceOf(CategoryNotFoundException.class);
    }

    @Test
    void createExceptionByUnsupportedImageFormatExceptionTest() {
        // given
        PostCreateRequest req = createPostCreateRequestWithImages(
                List.of(new MockMultipartFile("test", "test.txt", MediaType.TEXT_PLAIN_VALUE, "test".getBytes()))
        );
        given(memberRepository.findById(anyLong())).willReturn(Optional.of(createMember()));
        given(categoryRepository.findById(anyLong())).willReturn(Optional.of(createCategory()));

        // when, then
        assertThatThrownBy(() -> postService.create(req)).isInstanceOf(UnsupportedImageFormatException.class);
    }
}
