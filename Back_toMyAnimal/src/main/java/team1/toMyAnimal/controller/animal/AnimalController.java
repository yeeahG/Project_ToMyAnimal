package team1.toMyAnimal.controller.animal;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import team1.toMyAnimal.aop.AssignMemberId;
import team1.toMyAnimal.controller.response.Response;
import team1.toMyAnimal.domain.dto.animal.AnimalCreateRequest;
import team1.toMyAnimal.domain.dto.animal.AnimalReadCondition;
import team1.toMyAnimal.domain.dto.animal.AnimalUpdateRequest;
import team1.toMyAnimal.service.animal.AnimalService;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AnimalController {
    private final AnimalService animalService;

    @PostMapping("/api/animals")
    @ResponseStatus(HttpStatus.CREATED)
    @AssignMemberId
    // @ModelAttribute : 후에 사진 삽입 요청시 @Valid 옆에
    public Response create(@Valid @ModelAttribute AnimalCreateRequest req) {
        return Response.success(animalService.create(req));
    }

    @GetMapping("/api/animals/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response read(@PathVariable Long id) {
        return Response.success(animalService.read(id));
    }

    @GetMapping("/api/my-animal")
    @ResponseStatus(HttpStatus.OK)
    public Response readAll(@Valid AnimalReadCondition cond) {
        return Response.success(animalService.readAll(cond));
    }

    @DeleteMapping("/api/animals/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response delete(@PathVariable Long id) {
        animalService.delete(id);
        return Response.success();
    }

    @PutMapping("/api/animals/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response update(
            @PathVariable Long id,
            @Valid @ModelAttribute AnimalUpdateRequest req) {
        return Response.success(animalService.update(id, req));
    }

}


