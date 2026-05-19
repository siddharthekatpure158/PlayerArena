package com.game.PlayerArena.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.game.PlayerArena.model.Games;

@Repository
public interface Gamerepo extends JpaRepository<Games, Long> {
	
	List<Games> findBygameIgnoreCase(String game);
	
}