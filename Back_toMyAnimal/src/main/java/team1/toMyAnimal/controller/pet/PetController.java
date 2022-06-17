package team1.toMyAnimal.controller.pet;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import team1.toMyAnimal.aop.AssignMemberId;
import team1.toMyAnimal.controller.response.Response;
import team1.toMyAnimal.domain.dto.pet.PetCreateRequest;
import team1.toMyAnimal.domain.dto.pet.PetUpdateRequest;
import team1.toMyAnimal.domain.dto.post.PostUpdateRequest;
import team1.toMyAnimal.service.pet.PetService;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PetController {
    private final PetService petService;

    @PostMapping("/api/pets")
    @ResponseStatus(HttpStatus.CREATED)
    @AssignMemberId
    // @ModelAttribute : 후에 사진 삽입 요청시 @Valid 옆에
    public Response create(@Valid @ModelAttribute PetCreateRequest req) {
        return Response.success(petService.create(req));
    }

    @GetMapping("/api/pets/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response read(@PathVariable Long id) {
        return Response.success(petService.read(id));
    }

    @DeleteMapping("/api/pets/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response delete(@PathVariable Long id) {
        petService.delete(id);
        return Response.success();
    }

    @PutMapping("/api/pets/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response update(
            @PathVariable Long id,
            @Valid @ModelAttribute PetUpdateRequest req) {
        return Response.success(petService.update(id, req));
    }

}


