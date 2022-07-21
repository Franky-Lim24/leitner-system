package com.heap21.leitnerbackend.service;

import java.time.LocalDate;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.heap21.leitnerbackend.model.Box;
import com.heap21.leitnerbackend.model.Question;
import com.heap21.leitnerbackend.repo.QuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final BoxService boxService;

    public Question saveQuestion(Question question, int box_id) {
        log.info("Saving new question to the database");
        Box box = boxService.getBox(box_id);
        question.setBox(box);
        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question) {
        Question questionToUpdate = questionRepository.findById(question.getQuestion_id()).get();
        questionToUpdate.setQuestion(question.getQuestion());
        questionToUpdate.setAnswer(question.getAnswer());
        questionToUpdate.setLevel_no(question.getLevel_no());
        questionToUpdate.setTest_date(question.getTest_date());
        return questionRepository.save(questionToUpdate);
    }

    public void deleteQuestionById(int question_id) {
        if (questionRepository.findById(question_id).isPresent()) {
            questionRepository.deleteById(question_id);
        }
    }

    public List<Question> findAllQuestion() {
        return questionRepository.findAll();
    }

    public List<Question> findAllQuestionByBox(int box_id) {
        List<Question> questions = questionRepository.findAll();
        for (Question q : questions) {
            if (q.getBox().getBox_id() != box_id) {
                questions.remove(q);
            }
        }
        return questions;
    }

    // public void correct(Question question) {
    // if (question.getLevel_no() < 5) {
    // int level_no = question.getLevel_no();
    // question.setLevel_no(level_no++);
    // }
    // }

    // public void wrong(Question question) {
    // if (question.getLevel_no() > 1) {
    // int level_no = question.getLevel_no();
    // question.setLevel_no(level_no--);
    // }
    // }

    public List<Question> toTest(int box_id) {
        List<Question> questions = questionRepository.findAll();
        for (Question question : questions) {
            if (box_id != question.getBox().getBox_id()
                    || !question.getTest_date().isEqual(LocalDate.now())) {
                questions.remove(question);
            }
        }
        return questions;
    }
}
