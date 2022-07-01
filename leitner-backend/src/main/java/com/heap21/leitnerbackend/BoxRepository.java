package com.heap21.leitnerbackend;

import java.util.*;

public interface BoxRepository {
    int save(Box box);
    int update(Box box);
    int deleteById(int id);
    List<Box> findAll();
}