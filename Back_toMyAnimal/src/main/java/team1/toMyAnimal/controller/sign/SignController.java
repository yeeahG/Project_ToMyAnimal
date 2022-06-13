package team1.toMyAnimal.controller.sign;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import team1.toMyAnimal.controller.response.Response;
import team1.toMyAnimal.domain.dto.request.SignInRequest;
import team1.toMyAnimal.domain.dto.request.SignUpRequest;
import team1.toMyAnimal.service.sign.SignService;

import javax.validation.Valid;

import static team1.toMyAnimal.controller.response.Response.success;

@RestController
@RequiredArgsConstructor
public class SignController {
    private final SignService signService;

    @PostMapping("/api/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public Response signUp(@Valid @RequestBody SignUpRequest req) {
        signService.signUp(req);
        return success();
    }

    @PostMapping("/api/signin")
    @ResponseStatus(HttpStatus.OK)
    public Response signIn(@Valid @RequestBody SignInRequest req) { // 3
        return success(signService.signIn(req));
    }
}