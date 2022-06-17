package team1.toMyAnimal.service.post;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import team1.toMyAnimal.domain.dto.post.*;
import team1.toMyAnimal.domain.post.Image;
import team1.toMyAnimal.domain.post.Post;
import team1.toMyAnimal.exception.PostNotFoundException;
import team1.toMyAnimal.repository.category.CategoryRepository;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.post.PostRepository;

import java.util.List;
import java.util.stream.IntStream;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final FileService fileService;

    @Transactional
    public PostCreateResponse create(PostCreateRequest req) {
        Post post = postRepository.save(
                PostCreateRequest.toEntity(
                        req,
                        memberRepository,
                        categoryRepository
                )
        );
        uploadImages(post.getImages(), req.getImages());
        return new PostCreateResponse(post.getId());
    }

    private void uploadImages(List<Image> images, List<MultipartFile> fileImages) {
        IntStream.range(0, images.size()).forEach(i -> fileService.upload(fileImages.get(i), images.get(i).getUniqueName()));
    }

    public PostDto read(Long id) {
        return PostDto.toDto(postRepository.findById(id).orElseThrow(PostNotFoundException::new));
    }

    @Transactional
    public void delete(Long id) {
        Post post = postRepository.findById(id).orElseThrow(PostNotFoundException::new);
        deleteImages(post.getImages());
        postRepository.delete(post);
    }

    private void deleteImages(List<Image> images) {
        images.stream().forEach(i -> fileService.delete(i.getUniqueName()));
    }

    @Transactional
    public PostUpdateResponse update(Long id, PostUpdateRequest req) {
        Post post = postRepository.findById(id).orElseThrow(PostNotFoundException::new);
        Post.ImageUpdatedResult result = post.update(req);
        uploadImages(result.getAddedImages(), result.getAddedImageFiles());
        deleteImages(result.getDeletedImages());
        return new PostUpdateResponse(id);
    }

}
