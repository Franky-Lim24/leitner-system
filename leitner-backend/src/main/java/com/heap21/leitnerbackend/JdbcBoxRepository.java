package com.heap21.leitnerbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import java.sql.*;

import java.util.*;

@Repository
public class JdbcBoxRepository implements BoxRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public JdbcBoxRepository (JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @RequestMapping
    public int saveBox(Box box) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO BOX (COLOUR, BOX_NAME) VALUES (?, ?)", Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, box.getColour());
            ps.setString(2, box.getBox_name());
            return ps;
        }, keyHolder);

        int box_id = keyHolder.getKey().intValue();
        box.setBox_id(box_id);
        return box_id;
    }

    @Override
    public int updateBox(Box box) {
        return jdbcTemplate.update("UPDATE BOX SET COLOUR = ?, BOX_NAME = ? WHERE BOX_ID = ?", box.getColour(), box.getBox_name(), box.getBox_id());
    }

    @Override
    public int deleteBoxById(int id) {
        return jdbcTemplate.update("DELETE FROM BOX WHERE BOX_ID = ?", id);
    }

    @Override
    public List<Box> findAllBox() {
        String sql = "SELECT * FROM BOX";
        List<Box> boxes = jdbcTemplate.query(sql, new BeanPropertyRowMapper(Box.class));
        return boxes;
    }

    @Override
    public int saveQuestion(Question question, Box box) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO QUESTION (QUESTION, ANSWER, LEVEL_NO, TEST_DATE, BOX_ID) VALUES (?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, question.getQuestion());
            ps.setString(2, question.getAnswer());
            ps.setInt(3, question.getLevel_no());
            ps.setDate(4, java.sql.Date.valueOf(question.getTest_date()));
            ps.setInt(5, box.getBox_id());
            return ps;
        }, keyHolder);

        int question_id = keyHolder.getKey().intValue();
        question.setQuestion_id(question_id);
        return question_id;
    }

    @Override
    public int updateQuestion(Question question, Box box) {
        return jdbcTemplate.update("UPDATE QUESTION SET QUESTION = ?, ANSWER = ?, LEVEL_NO = ?, TEST_DATE =? WHERE QUESTION_ID = ? AND BOX_ID = ?",question.getQuestion(), question.getAnswer(), question.getLevel_no(), java.sql.Date.valueOf(question.getTest_date()), question.getQuestion_id(), box.getBox_id());
    }

    @Override
    public int deleteQuestionById(int question_id, int box_id) {
        return jdbcTemplate.update("DELETE FROM QUESTION WHERE QUESTION_ID = ? AND BOX_ID = ?", question_id, box_id);
    }

    @Override
    public List<Question> findAllQuestion() {
        String sql = "SELECT * FROM QUESTION";
        List<Question> questions = jdbcTemplate.query(sql, new BeanPropertyRowMapper(Question.class));
        return questions;
    }

    @Override
    public List<Question> findAllQuestionByBox(Box box) {
        int box_id = box.getBox_id();
        String sql = "SELECT * FROM QUESTION WHERE BOX_ID = " + box_id + ";";
        List<Question> questions = jdbcTemplate.query(sql, new BeanPropertyRowMapper(Question.class));
        return questions;
    }

    @Override
    public void correct(Question question) {
        if (question.getLevel_no() < 5) {
            int level_no = question.getLevel_no();
            question.setLevel_no(level_no++);
        }
    }

    @Override
    public void wrong(Question question) {
        if (question.getLevel_no() > 1) {
            int level_no = question.getLevel_no();
            question.setLevel_no(level_no--);
        }
    }

    @Override
    public List<Question> toTest() {
        String sql = "SELECT * FROM QUESTION WHERE test_date = CURDATE() ORDER BY level_no;";
        List<Question> questions = jdbcTemplate.query(sql, new BeanPropertyRowMapper(Question.class));
        return questions;
    }
}