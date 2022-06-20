package team1.toMyAnimal.controller.post;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import team1.toMyAnimal.aop.AssignMemberId;
import team1.toMyAnimal.controller.response.Response;
import team1.toMyAnimal.domain.dto.post.PostCreateRequest;
import team1.toMyAnimal.domain.dto.post.PostUpdateRequest;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.service.post.PostService;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PostController {
    private final PostService postService;

    @PostMapping("/api/posts")
    @ResponseStatus(HttpStatus.CREATED)
    @AssignMemberId
    public Response create(@Valid @ModelAttribute PostCreateRequest req) {
        return Response.success(postService.create(req));
    }

    @GetMapping("/api/posts/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response read(@PathVariable Long id) {
        return Response.success(postService.read(id));
    }

    @DeleteMapping("/api/posts/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response delete(@PathVariable Long id) {
        postService.delete(id);
        return Response.success();
    }

    @PutMapping("/api/posts/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response update(
            @PathVariable Long id,
            @Valid @ModelAttribute PostUpdateRequest req) {
        return Response.success(postService.update(id, req));
    }
}
