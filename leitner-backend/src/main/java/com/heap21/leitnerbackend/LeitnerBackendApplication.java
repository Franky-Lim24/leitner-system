package com.heap21.leitnerbackend;

import java.util.List;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.heap21.leitnerbackend.model.Users;
import com.heap21.leitnerbackend.service.JdbcBoxRepository;
import com.heap21.leitnerbackend.service.UserService;
import lombok.RequiredArgsConstructor;

@SpringBootApplication
public class LeitnerBackendApplication {

	@Autowired
	JdbcTemplate jdbcTemplate;

	@Autowired
	JdbcBoxRepository jdbcBoxRepository;

	public static void main(String[] args) {
		SpringApplication.run(LeitnerBackendApplication.class, args);
	}

	// @Bean
	// CommandLineRunner run(UserService userService) {
	// return args -> {
	// userService.saveUser(new Users(null, "john", "1234"));
	// userService.saveUser(new Users(null, "will", "1234"));
	// userService.saveUser(new Users(null, "jim", "1234"));
	// };
	// }

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
