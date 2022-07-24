package team1.toMyAnimal.controller.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import team1.toMyAnimal.aop.AssignMemberId;
import team1.toMyAnimal.controller.response.Response;
import team1.toMyAnimal.domain.dto.comment.CommentCreateRequest;
import team1.toMyAnimal.domain.dto.comment.CommentReadCondition;
import team1.toMyAnimal.repository.service.comment.CommentService;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/api/comments")
    @ResponseStatus(HttpStatus.OK)
    public Response readAll(@Valid CommentReadCondition cond) {
        return Response.success(commentService.readAll(cond));
    }

    @PostMapping("/api/comments")
    @ResponseStatus(HttpStatus.CREATED)
    @AssignMemberId
    public Response create(@Valid @RequestBody CommentCreateRequest req) {
        commentService.create(req);
        return Response.success();
    }

    @DeleteMapping("/api/comments/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response delete(@PathVariable Long id) {
        commentService.delete(id);
        return Response.success();
    }
}
