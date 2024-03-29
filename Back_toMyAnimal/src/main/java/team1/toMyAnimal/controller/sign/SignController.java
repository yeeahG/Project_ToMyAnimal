package team1.toMyAnimal.controller.sign;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import team1.toMyAnimal.controller.response.Response;
import team1.toMyAnimal.domain.dto.sign.SignInRequest;
import team1.toMyAnimal.domain.dto.sign.SignUpRequest;
import team1.toMyAnimal.repository.service.sign.SignService;

import javax.servlet.http.HttpServletRequest;
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

    @PostMapping("/api/refresh-token")
    @ResponseStatus(HttpStatus.OK)
    public Response refreshToken(@RequestHeader(value = "Authorization") String refreshToken) {
        return success(signService.refreshToken(refreshToken));
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest req) throws Exception {
        signService.logout(req);
        return "logout success";
    }
}