package com.heap21.leitnerbackend.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class QuestionsDTO {
    private int question_id;
    private String question;
    private String answer;
    private int level_no = 1;
    private LocalDate test_date;
}
