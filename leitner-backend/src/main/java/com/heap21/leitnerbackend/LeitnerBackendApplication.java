package com.heap21.leitnerbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.*;

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
		Box Chemistry = new Box("Black", "History");
		jdbcBoxRepository.saveBox(Chemistry);
		Question qn1 = new Question("What year did Singapore gain independence?", "1965");
		jdbcBoxRepository.saveQuestion(qn1, Chemistry);
		jdbcBoxRepository.correct(qn1); 
		Question qn2 = new Question("Who was Singapore's first PM?", "Lee Kuan Yew");
		jdbcBoxRepository.saveQuestion(qn2, Chemistry);
		Question qn3 = new Question("What year was 'Home' by Kit Chan released?", "1998");
		jdbcBoxRepository.saveQuestion(qn3, Chemistry);
		Question qn4 = new Question("What year did Singapore gain independence?", "1965");
		jdbcBoxRepository.saveQuestion(qn4, Chemistry);
		
		List<Question> todayQuestions = jdbcBoxRepository.toTest();
		for (Question q: todayQuestions) {
			System.out.println("Question: "+ q.getQuestion());
			System.out.println("Answer: " + q.getAnswer());
		}
	}
}
