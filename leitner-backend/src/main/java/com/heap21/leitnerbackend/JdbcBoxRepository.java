package com.heap21.leitnerbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import java.sql.PreparedStatement;
import java.sql.Statement;

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
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO BOX (COLOUR, BOX_NAME, DAY) VALUES (?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, box.getColour());
            ps.setString(2, box.getBox_name());
            ps.setInt(3, box.getDay());
            return ps;
        }, keyHolder);

        int box_id = keyHolder.getKey().intValue();
        box.setBox_id(box_id);
        return box_id;
    }

    @Override
    public int update(Box box) {
        return jdbcTemplate.update("UPDATE BOX SET COLOUR = ?, BOX_NAME = ? WHERE BOX_ID = ?", box.getColour(), box.getBox_name(), box.getBox_id());
    }

    @Override
    public int deleteById(int id) {
        return jdbcTemplate.update("DELETE FROM BOX WHERE BOX_ID = ?", id);
    }

    @Override
    public List<Box> findAll() {
        String sql = "SELECT * FROM BOX";
        List<Box> boxes = jdbcTemplate.query(sql, new BeanPropertyRowMapper(Box.class));
        return boxes;
    }
}