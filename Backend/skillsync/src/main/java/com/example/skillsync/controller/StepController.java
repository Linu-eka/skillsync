package com.example.skillsync.controller;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.example.skillsync.repository.StepRepository;
import com.example.skillsync.model.Step;
import java.util.List;

@Controller
public class StepController {
    private final StepRepository repo;

    public StepController(StepRepository repo) {
        this.repo = repo;
    }

    @QueryMapping
    public List<Step> getSteps() {
        return repo.findAll();
    }

}
