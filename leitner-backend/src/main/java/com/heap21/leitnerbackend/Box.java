package com.heap21.leitnerbackend;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Box {
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="seq")
    private int box_id;
    private String colour;
    private String box_name;
    private int day = 0;

    // default colour == green and name == untitled
    public Box() {
        this.colour = "Green";
        this.box_name = "Untitled";
        this.box_id = this.getBox_id();
        this.day = this.getDay();
    }

    public Box(String colour, String box_name)  {
        this.colour = colour;
        this.box_name = box_name;
        this.box_id = this.getBox_id();
        this.day = this.getDay();
    }

    //getters and setters
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

    public void setBox_id(int box_id)  {this.box_id = box_id;}

    public int getDay() {
        return day;
    }
}