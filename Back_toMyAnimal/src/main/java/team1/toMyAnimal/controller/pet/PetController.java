package team1.toMyAnimal.controller.pet;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import team1.toMyAnimal.aop.AssignMemberId;
import team1.toMyAnimal.controller.response.Response;
import team1.toMyAnimal.domain.dto.pet.PetCreateRequest;
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
    public Response create(@Valid PetCreateRequest req){
        return Response.success(petService.create(req));
    }
}
