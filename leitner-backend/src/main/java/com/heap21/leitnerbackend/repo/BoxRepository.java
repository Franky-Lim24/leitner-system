package com.heap21.leitnerbackend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.heap21.leitnerbackend.model.Box;

public interface BoxRepository extends JpaRepository<Box, Integer> {
}
