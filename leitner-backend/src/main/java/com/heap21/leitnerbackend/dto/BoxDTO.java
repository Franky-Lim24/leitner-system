package com.heap21.leitnerbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BoxDTO {
    private int box_id;
    private String colour;
    private String box_name;
}
