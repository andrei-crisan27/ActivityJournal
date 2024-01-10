package com.mobile.server.lab5.dto;

import lombok.Data;

@Data
public class ActivityDto {
    private Integer id;
    private String title;
    private String description;
    private String date;
    private String category;
    private String location;
    private String feedback;
}
