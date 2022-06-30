package team1.toMyAnimal.learning;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.*;

public class PasswordEncoderTest {

    PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    @Test
    void encodeWithBcryptTest() {
        // given
        String password = "password";

        // when
        String encodedPassword = passwordEncoder.encode(password);

        // then
        assertThat(encodedPassword).contains("bcrypt");

        System.out.println("encodedPassword: " + encodedPassword);
    }

    @Test
    void matchTest() {
        // given
        String password = "password";
        String encodedPassword = passwordEncoder.encode(password);

        // when
        boolean isMatch = passwordEncoder.matches(password, encodedPassword);

        // then
        assertThat(isMatch).isTrue();

        System.out.println("isMatch :" + isMatch);
    }
}
