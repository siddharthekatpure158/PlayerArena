package com.game.PlayerArena.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.game.PlayerArena.model.Games;
import com.game.PlayerArena.service.Gameservice;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "http://localhost:5173")
public class GameController {
	
	@Autowired
	private Gameservice service;
	
	@PostMapping
	public String creategame(@RequestBody Games game) {
		return service.creategame(game);
	}
	@GetMapping
	public List<Games> getAllGames(@RequestParam(required = false) String game) {
		return service.getAllGames(game);
	}
	
	@GetMapping("/{id}")
	public Games getbyId(@PathVariable Long id){
		return service.getGameById(id);
	}
	
	@DeleteMapping("/{id}")
	public String deleteGame(@PathVariable Long id) {
	    return service.deleteGame(id);
	}
	
	@PutMapping("/join/{id}")
	public Games joingame(@PathVariable Long id) {
		return service.joinGame(id);
	}
	
}
