package com.heap21.leitnerbackend;

import java.util.List;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.heap21.leitnerbackend.model.Users;
import com.heap21.leitnerbackend.service.UserService;
import lombok.RequiredArgsConstructor;

@SpringBootApplication
public class LeitnerBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(LeitnerBackendApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}


@RequiredArgsConstructor
@RestController
class HelloController {
	private final UserService userService;

	@GetMapping("/")
	List<Users> hello() {
		return userService.getUsers();
	}
}
