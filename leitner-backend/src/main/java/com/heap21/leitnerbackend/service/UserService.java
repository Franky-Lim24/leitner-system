package com.heap21.leitnerbackend.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.heap21.leitnerbackend.dto.UsersDTO;
import com.heap21.leitnerbackend.model.Users;
import com.heap21.leitnerbackend.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService implements UserDetailsService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepo.findByUsername(username);

        if (user == null) {
            log.error("User not found: " + username);
            throw new UsernameNotFoundException("User not found");
        } else {
            log.info("User found: " + username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("user"));
        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                user.getPassword(), authorities);
    }

    public UsersDTO saveUser(Users user) {
        log.info("Saving new user to the database");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Users saveUser = userRepo.save(user);
        UsersDTO usersDTO = new UsersDTO();
        usersDTO.setUsername(saveUser.getUsername());
        usersDTO.setAccount_id(saveUser.getAccount_id());
        return usersDTO;
    }

    public UsersDTO getUser(String username) throws UsernameNotFoundException {
        log.info("Fetching user {}", username);
        Users user = userRepo.findByUsername(username);
        if (user == null) {
            log.error("User not found: " + username);
            throw new UsernameNotFoundException("User not found");
        } else {
            log.info("User found: " + username);
        }
        UsersDTO userDto = new UsersDTO();
        userDto.setUsername(user.getUsername());
        userDto.setAccount_id(user.getAccount_id());
        return userDto;
    }

    public List<Users> getUsers() {
        log.info("Fetching all users");
        return userRepo.findAll();
    }
}
