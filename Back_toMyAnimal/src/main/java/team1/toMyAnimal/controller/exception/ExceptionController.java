package team1.toMyAnimal.controller.exception;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import team1.toMyAnimal.exception.AccessDeniedException;
import team1.toMyAnimal.exception.AuthenticationEntryPointException;

@RestController
public class ExceptionController {
    @GetMapping("/exception/entry-point")
    public void entryPoint() {
        throw new AuthenticationEntryPointException();
    }

    @GetMapping("/exception/access-denied")
    public void accessDenied() {
        throw new AccessDeniedException();
    }
}
