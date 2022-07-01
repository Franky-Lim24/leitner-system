package com.heap21.leitnerbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class LeitnerBackendApplication implements CommandLineRunner {
	private static final Logger log = LoggerFactory.getLogger(LeitnerBackendApplication.class);

	@Autowired
	JdbcTemplate jdbcTemplate;

	@Autowired
	JdbcBoxRepository jdbcBoxRepository;

	public static void main(String[] args) {
		SpringApplication.run(LeitnerBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		log.info("StartApplication...");
		startBoxApp();
	}

	void startBoxApp() {
		Box Chemistry = new Box();
		jdbcBoxRepository.save(Chemistry);

	}
}
