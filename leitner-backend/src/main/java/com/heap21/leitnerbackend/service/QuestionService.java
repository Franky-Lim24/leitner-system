package com.heap21.leitnerbackend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.heap21.leitnerbackend.dto.QuestionsDTO;
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

    public List<QuestionsDTO> saveQuestion(List<Question> questions, int box_id) {
        log.info("Saving new question to the database");
        Box box = boxService.getBox(box_id);
        List<QuestionsDTO> questionsDTO = new ArrayList<>();

        for (Question question : questions) {
            question.setBox(box);
            QuestionsDTO questionsDTO1 = new QuestionsDTO();
            questionsDTO1.setQuestion(question.getQuestion());
            questionsDTO1.setAnswer(question.getAnswer());
            questionsDTO1.setLevel_no(question.getLevel_no());
            questionsDTO1.setQuestion_id(question.getQuestion_id());
            questionsDTO1.setTest_date(question.getTest_date());
            questionsDTO.add(questionsDTO1);
        }
        questionRepository.saveAll(questions);
        return questionsDTO;
    }

    public QuestionsDTO updateQuestion(Question question) {
        try {
            Question questionToUpdate =
                    questionRepository.findById(question.getQuestion_id()).get();
            questionToUpdate.setQuestion(question.getQuestion());
            questionToUpdate.setAnswer(question.getAnswer());
            questionToUpdate.setLevel_no(question.getLevel_no());
            questionToUpdate.setTest_date(question.getTest_date());
            questionRepository.save(questionToUpdate);

            QuestionsDTO questionsDTO = new QuestionsDTO();
            questionsDTO.setQuestion(question.getQuestion());
            questionsDTO.setAnswer(question.getAnswer());
            questionsDTO.setLevel_no(question.getLevel_no());
            questionsDTO.setQuestion_id(question.getQuestion_id());
            questionsDTO.setTest_date(question.getTest_date());
            return questionsDTO;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void deleteQuestionById(int question_id) {
        if (questionRepository.findById(question_id).isPresent()) {
            questionRepository.deleteById(question_id);
        }
    }

    public List<QuestionsDTO> findAllQuestion() {
        List<Question> qns = questionRepository.findAll();
        List<QuestionsDTO> questionsDTOList = new ArrayList<>();

        for (Question question : qns) {
            QuestionsDTO questionsDTO = new QuestionsDTO();
            questionsDTO.setQuestion(question.getQuestion());
            questionsDTO.setAnswer(question.getAnswer());
            questionsDTO.setLevel_no(question.getLevel_no());
            questionsDTO.setQuestion_id(question.getQuestion_id());
            questionsDTO.setTest_date(question.getTest_date());
            questionsDTOList.add(questionsDTO);
        }

        return questionsDTOList;
    }

    public List<QuestionsDTO> findAllQuestionByBox(int box_id) {
        List<Question> questions = questionRepository.findAll();
        List<QuestionsDTO> returnQuestions = new ArrayList<>();
        for (Question q : questions) {
            if (q.getBox().getBox_id() == box_id) {
                QuestionsDTO question = new QuestionsDTO();
                question.setQuestion_id(q.getQuestion_id());
                question.setQuestion(q.getQuestion());
                question.setAnswer(q.getAnswer());
                question.setLevel_no(q.getLevel_no());
                question.setTest_date(q.getTest_date());
                returnQuestions.add(question);
            }
        }
        return returnQuestions;
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

    public List<QuestionsDTO> toTest(int box_id) {
        List<Question> questions = questionRepository.findAll();
        List<QuestionsDTO> questionsDTOs = new ArrayList<>();
        for (Question question : questions) {
            if (box_id == question.getBox().getBox_id()
                    && question.getTest_date().isEqual(LocalDate.now())) {
                QuestionsDTO questionsDTO = new QuestionsDTO();
                questionsDTO.setQuestion_id(question.getQuestion_id());
                questionsDTO.setQuestion(question.getQuestion());
                questionsDTO.setAnswer(question.getAnswer());
                questionsDTO.setLevel_no(question.getLevel_no());
                questionsDTO.setTest_date(question.getTest_date());
                questionsDTOs.add(questionsDTO);
            }
        }
        return questionsDTOs;
    }
}
