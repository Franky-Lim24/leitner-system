package com.heap21.leitnerbackend;

import javax.persistence.*;

@Entity
public class Question {
    @Id @GeneratedValue
    private int question_id;
    private String question;
    private String answer;

    @ManyToOne
    @JoinColumn(name = "box_id")
    private Box box;

    public Question(String question, String answer) {
        this.question = question;
        this.answer = answer;
    }

    public int getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(int question_id) {
        this.question_id = question_id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
