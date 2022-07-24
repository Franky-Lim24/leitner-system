package com.heap21.leitnerbackend.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import com.heap21.leitnerbackend.model.Box;
import com.heap21.leitnerbackend.model.Question;
import com.heap21.leitnerbackend.repo.BoxRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class BoxService {
    private final BoxRepository boxRepo;

    public String getUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = null;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }
        return username;
    }

    public Box saveBox(Box box) {
        log.info("Saving new box to the database" + box.getBox_name() + box.getColour());

        box.setUsername(getUsername());
        return boxRepo.save(box);
    }

    public Box updateBox(Box box) {
        Box boxToUpdate = boxRepo.findById(box.getBox_id()).get();
        boxToUpdate.setBox_name(box.getBox_name());
        boxToUpdate.setColour(box.getColour());
        return boxRepo.save(boxToUpdate);
    }

    public void deleteBoxById(int id) {
        boxRepo.deleteById(id);
    }

    public List<Box> findAllBox() {
        List<Box> boxes = boxRepo.findAll();
        String username = getUsername();
        log.info(username);
        List<Box> returnBoxes = new ArrayList<Box>();
        for (Box b : boxes) {
            if (b.getUsername().equals(username)) {
                returnBoxes.add(b);
            }
        }
        return returnBoxes;
    }

    public Box getBox(int box_id) {
        return boxRepo.findById(box_id).get();
    }

    public List<Box> getTasks() {
        List<Box> boxes = boxRepo.findAll();
        List<Box> tasks = new ArrayList<>();
        for (Box b : boxes) {
            if (!b.getUsername().equals(getUsername())) {
                boxes.remove(b);
            } else {
                for (Question q : b.getReviews()) {
                    if (q.getTest_date().isEqual(LocalDate.now()) && !tasks.contains(b)) {
                        tasks.add(b);
                    }
                }
            }
        }
        return tasks;
    }
}
