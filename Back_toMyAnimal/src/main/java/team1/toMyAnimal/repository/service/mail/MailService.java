package team1.toMyAnimal.repository.service.mail;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail() {
        ArrayList<String> toUserList = new ArrayList<>();
        toUserList.add("juneseok0107@naver.com");
        toUserList.add("juneseok81@gmail.com");

        int toUserSize = toUserList.size();

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setTo((String[]) toUserList.toArray(new String[toUserSize]));

        simpleMailMessage.setSubject("Subject sample");

        simpleMailMessage.setText("Text Sample");

        javaMailSender.send(simpleMailMessage);
    }


}

