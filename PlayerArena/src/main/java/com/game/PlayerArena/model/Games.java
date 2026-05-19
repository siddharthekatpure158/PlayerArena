package com.game.PlayerArena.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Games {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    private String hostname;
    private String venuename;       
    private String location;  
    private String game;
    private String time;
    private Double price;    
    private int currentplayers;
    private int totalplayers;
}