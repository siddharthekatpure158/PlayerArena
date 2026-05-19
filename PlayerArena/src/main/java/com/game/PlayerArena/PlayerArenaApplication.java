package com.game.PlayerArena;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.game.PlayerArena")
@EntityScan(basePackages ="com.game.PlayerArena.model" )
@EnableJpaRepositories(basePackages = "com.game.PlayerArena.repository")
public class PlayerArenaApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlayerArenaApplication.class, args);
	}

}
