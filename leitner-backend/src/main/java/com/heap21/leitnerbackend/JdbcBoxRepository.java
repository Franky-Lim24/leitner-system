package com.heap21.leitnerbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

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
    public int save(Box box) {
        return jdbcTemplate.update("INSERT INTO BOX VALUES (?, ?, ?, ?)", box.getBox_id(), box.getColour(), box.getBox_name(), box.getDay());
    }

    @Override
    public int deleteById(int id) {
        return jdbcTemplate.update("");
    }

    @Override
    public List<Box> findAll() {
        String sql = "SELECT * FROM BOX";
        List<Box> boxes = jdbcTemplate.query(sql, new BeanPropertyRowMapper(Box.class));
        return boxes;
    }
}