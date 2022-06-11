package com.example.tomyanimal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class TomyanimalApplication {

	public static void main(String[] args) {
		SpringApplication.run(TomyanimalApplication.class, args);
	}

}
