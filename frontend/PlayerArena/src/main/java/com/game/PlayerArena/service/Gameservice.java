package com.game.PlayerArena.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.game.PlayerArena.model.Games;
import com.game.PlayerArena.repository.Gamerepo;

@Service
public class Gameservice {
	@Autowired
	private Gamerepo repo;
	
	public String creategame(Games game) {
	    repo.save(game);
	    return "Game Created Successfully";
	}

	public List<Games> getAllGames(String game) {
	    if (game != null && !game.isBlank()
	            && !game.equalsIgnoreCase("All")) {
	        return repo.findBygameIgnoreCase(game);     
	    }
	    return repo.findAll();
	}

	public Games getGameById(Long id) {
	    return repo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Game not found"));
	}

	public String deleteGame(Long id) {
	    if (!repo.existsById(id)) {
	        return "Game not found";
	    }    
	    repo.deleteById(id);
	    return "Game deleted successfully";
	}
	
	public Games joinGame(Long id) {
        Games game = getGameById(id);
        if (game.getCurrentplayers() 
                >= game.getTotalplayers()) {
            throw new RuntimeException(
                "This game is already full");
        }
        game.setCurrentplayers(
            game.getCurrentplayers() + 1);
        return repo.save(game);
    }

}
