package com.example.skillsync.controller;
import com.example.skillsync.model.User;
import com.example.skillsync.repository.UserRepository; 
import com.example.skillsync.service.JwtService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;




@Controller
public class MeController {
    private final UserRepository userRepo;
    private final JwtService jwtService;

    public MeController(UserRepository userRepo, JwtService jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }

    @QueryMapping
    public User me(@Argument String token) {
        if (token == null || token.isEmpty()) {
            return null;
        }

        String username = jwtService.extractUsername(token.substring(7));

        return userRepo.findByUsername(username)
                .orElse(null);
    }
    
}
