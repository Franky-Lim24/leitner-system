package com.heap21.leitnerbackend.model;

import javax.persistence.*;
import java.util.*;

@Entity
public class Box {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq")
    private int box_id;
    private String colour;
    private String box_name;

    @OneToMany(mappedBy = "box", cascade = CascadeType.ALL)
    private List<Question> reviews;

    // default colour == green and name == untitled
    public Box() {
        this.colour = "Green";
        this.box_name = "Untitled";
        this.box_id = this.getBox_id();
    }

    public Box(String colour, String box_name) {
        this.colour = colour;
        this.box_name = box_name;
        this.box_id = this.getBox_id();
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public String getBox_name() {
        return box_name;
    }

    public void setBox_name(String box_name) {
        this.box_name = box_name;
    }

    public int getBox_id() {
        return box_id;
    }

    public void setBox_id(int box_id) {
        this.box_id = box_id;
    }
}
