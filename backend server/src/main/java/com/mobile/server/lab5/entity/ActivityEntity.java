package com.mobile.server.lab5.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "activities")
public class ActivityEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "date")
    private String date;

    @Column(name = "category")
    private String category;

    @Column(name = "location")
    private String location;

    @Column(name = "feedback")
    private String feedback;
}
