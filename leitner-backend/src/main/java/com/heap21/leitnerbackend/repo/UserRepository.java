package com.heap21.leitnerbackend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.heap21.leitnerbackend.model.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByUsername(String username);
}
