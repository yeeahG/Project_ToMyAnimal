package team1.toMyAnimal.controller.mail;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import team1.toMyAnimal.controller.response.Response;
import team1.toMyAnimal.repository.service.mail.MailService;

@RestController
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

//    @PostMapping("/sendMail")
//    public Response postsendMail () {
//        return Response.success();
//    }

    @GetMapping("/sendMail")
    public Response sendMail () {
        return Response.success();
    }
}
