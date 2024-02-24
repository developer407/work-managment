package com.zosh.model;

import com.zosh.domain.TYPE;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Files {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToOne
    private Company company;

    @ManyToOne
    private User assignedWorker;

    @ManyToOne
    private User support;

    private TYPE type;

    private LocalDateTime createdAt;


}
