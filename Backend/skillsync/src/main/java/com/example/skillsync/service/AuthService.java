package com.example.skillsync.service;

import com.example.skillsync.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.skillsync.model.User;
import com.example.skillsync.model.RegisterInput;
import com.example.skillsync.model.LoginInput;
import com.example.skillsync.model.AuthPayload;
import com.example.skillsync.service.JwtService;
import org.springframework.graphql.data.method.annotation.MutationMapping;



@Service
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthService(UserRepository userRepo, PasswordEncoder encoder, JwtService jwt) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    public AuthPayload register(RegisterInput input) {
        if (userRepo.existsByUsername(input.getUsername())) {
            throw new RuntimeException("Username already taken");
        }

        User user = new User();
        user.setUsername(input.getUsername());
        user.setEmail(input.getEmail());
        user.setPasswordHash(encoder.encode(input.getPassword()));
        

        userRepo.save(user);
        System.out.println("Encoded password: " + user.getPasswordHash() + " Token: " + jwt.generateToken(user.getUsername()));
        
        
        return new AuthPayload(user, jwt.generateToken(user.getUsername()));
    }

    public AuthPayload login(LoginInput input) {
        User user = userRepo.findByUsername(input.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!encoder.matches(input.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        return new AuthPayload(user, jwt.generateToken(user.getUsername()));
    }

}
