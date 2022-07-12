package com.heap21.leitnerbackend;

import java.util.*;

public interface BoxRepository {
    int saveBox(Box box);
    int updateBox(Box box);
    int deleteBoxById(int id);
    List<Box> findAllBox();

    int saveQuestion(Question question, Box box);
    int updateQuestion(Question question, Box box);
    int deleteQuestionById(int question_id, int box_id);
    List<Question> findAllQuestion();
    List<Question> findAllQuestionByBox(Box box);

    void correct(Question question);
    void wrong(Question question);
    List<Question> toTest();
}