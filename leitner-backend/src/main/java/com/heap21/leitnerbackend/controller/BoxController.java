package com.heap21.leitnerbackend.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.heap21.leitnerbackend.dto.BoxDTO;
import com.heap21.leitnerbackend.model.Box;
import com.heap21.leitnerbackend.service.BoxService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/box")
public class BoxController {
    private final BoxService boxService;

    @PostMapping
    public ResponseEntity createBox(@RequestBody Box box) {
        try {
            return new ResponseEntity<Box>(boxService.saveBox(box), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<Box> updateBox(@RequestBody Box box) {
        return new ResponseEntity<Box>(boxService.updateBox(box), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Box> deleteBoxById(@PathVariable("id") int id) {
        boxService.deleteBoxById(id);
        return new ResponseEntity<Box>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Box> getBoxById(@PathVariable("id") int id) {
        return new ResponseEntity<Box>(boxService.getBox(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<BoxDTO>> getAllBoxes() {
        return new ResponseEntity<List<BoxDTO>>(boxService.findAllBox(), HttpStatus.OK);
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<Box>> getTasks() {
        return new ResponseEntity<List<Box>>(boxService.getTasks(), HttpStatus.OK);
    }
}
