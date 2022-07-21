package com.heap21.leitnerbackend.service;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import com.heap21.leitnerbackend.model.Box;
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
        UserDetails user =
                (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return user.getUsername();
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
        for (Box b : boxes) {
            if (!b.getUsername().equals(getUsername())) {
                boxes.remove(b);
            }
        }
        return boxes;
    }

    public Box getBox(int box_id) {
        return boxRepo.findById(box_id).get();
    }
}
