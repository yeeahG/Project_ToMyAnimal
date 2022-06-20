package team1.toMyAnimal.controller.board;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import team1.toMyAnimal.aop.AssignMemberId;
import team1.toMyAnimal.controller.response.Response;
import team1.toMyAnimal.domain.dto.board.BoardCreateRequest;
import team1.toMyAnimal.domain.dto.board.BoardUpdateRequest;
import team1.toMyAnimal.service.board.BoardService;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BoardController {
    private final BoardService boardService;

    @PostMapping("/api/board")
    @ResponseStatus(HttpStatus.CREATED)
    @AssignMemberId
    public Response create(@Valid @RequestBody BoardCreateRequest req) {
        return Response.success(boardService.create(req));
    }

    @GetMapping("/api/board/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response read(@PathVariable Long id) {
        return Response.success(boardService.read(id));}

    @DeleteMapping("/api/board/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response delete(@PathVariable Long id){
        boardService.delete(id);
        return Response.success();
    }

    @PutMapping("/api/board/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response update(@PathVariable Long id, @Valid @RequestBody BoardUpdateRequest req) {
        return Response.success(boardService.update(id,req));
    }


}
