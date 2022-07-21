package com.heap21.leitnerbackend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.heap21.leitnerbackend.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

}
