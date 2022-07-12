package com.heap21.leitnerbackend;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Question {
    @Id @GeneratedValue
    private int question_id;
    private String question;
    private String answer;
    private int level_no = 1;
    private LocalDate test_date;

    @ManyToOne
    @JoinColumn(name = "box_id")
    private Box box;

    public Question() {
        this.question = "Untitled";
        this.answer = "Untitled";
        this.setTest_date();
    }

    public Question(String question, String answer) {
        this.question = question;
        this.answer = answer;
        this.test_date = this.setTest_date();
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

    public int getLevel_no() {
        return level_no;
    }
    public void setLevel_no(int level_no) {
        this.level_no = level_no;
        this.test_date = this.setTest_date(); 
    }

    public LocalDate getTest_date() {
        return test_date;
    }
    public LocalDate setTest_date() {
        if (level_no == 1) {
            return LocalDate.now().plusDays(1);
        } else if (level_no == 2){
            return LocalDate.now().plusDays(2);
        } else if (level_no == 3){
            return LocalDate.now().plusDays(4);
        } else if (level_no == 4){
            return LocalDate.now().plusDays(8);
        } else if (level_no == 5){
            return LocalDate.now().plusDays(16);
        } else {
            System.out.println("Not a valid level");
            return LocalDate.now();
        }
    }
}
