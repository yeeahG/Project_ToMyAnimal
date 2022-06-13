package team1.toMyAnimal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ToMyAnimalApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToMyAnimalApplication.class, args);
	}

}
