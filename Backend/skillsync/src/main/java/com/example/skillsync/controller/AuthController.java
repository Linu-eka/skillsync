package com.example.skillsync.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;
import com.example.skillsync.model.RegisterInput;
import com.example.skillsync.model.LoginInput;
import com.example.skillsync.model.AuthPayload;
import com.example.skillsync.service.AuthService;
@Controller
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @MutationMapping
    public AuthPayload register(@Argument RegisterInput input) {
        return authService.register(input);
    }

    @MutationMapping
    public AuthPayload login(@Argument LoginInput input) {
        return authService.login(input);
    }


    
}
