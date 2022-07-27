package com.heap21.leitnerbackend.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.heap21.leitnerbackend.dto.QuestionsDTO;
import com.heap21.leitnerbackend.model.Question;
import com.heap21.leitnerbackend.service.QuestionService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/question")
public class QuestionController {
    private final QuestionService questionService;

    @PostMapping("/{boxId}")
    public ResponseEntity<List<QuestionsDTO>> createQuestion(@RequestBody List<Question> question,
            @PathVariable("boxId") int boxId) {
        return new ResponseEntity<List<QuestionsDTO>>(questionService.saveQuestion(question, boxId),
                HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<QuestionsDTO> updateQuestion(@RequestBody Question question) {
        return new ResponseEntity<QuestionsDTO>(questionService.updateQuestion(question),
                HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Question> deleteQuestionById(@PathVariable("id") int id) {
        questionService.deleteQuestionById(id);
        return new ResponseEntity<Question>(HttpStatus.OK);
    }

    // @GetMapping("/{id}")
    // public ResponseEntity<List<QuestionsDTO>> getQuestionById(@PathVariable("id") int id) {
    //     return new ResponseEntity<List<QuestionsDTO>>(questionService.findAllQuestionByBox(id),
    //             HttpStatus.OK);
    // }

    @GetMapping("/{id}")
    public ResponseEntity<List<QuestionsDTO>> getTestQuestions(@PathVariable("id") int id) {
        return new ResponseEntity<List<QuestionsDTO>>(questionService.toTest(id),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<QuestionsDTO>> getAllQuestions() {
        return new ResponseEntity<List<QuestionsDTO>>(questionService.findAllQuestion(),
                HttpStatus.OK);
    }
}
