package com.example.skillsync.controller;

import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.example.skillsync.repository.StepRepository;

import com.example.skillsync.model.Step;
import com.example.skillsync.model.Entry;
import java.util.List;

import org.springframework.graphql.data.method.annotation.Argument;
import com.example.skillsync.repository.GoalRepository;

@Controller
public class StepController {
    private final StepRepository repo;
    private final GoalRepository goalRepository;

    public StepController(StepRepository repo, GoalRepository goalRepository) {
        this.repo = repo;
        this.goalRepository = goalRepository;
    }

    @QueryMapping
    public List<Step> getSteps() {
        return repo.findAll();
    }

    @QueryMapping
    public Step getStepById(@Argument Long id) {
        return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid step ID"));
    }

    @QueryMapping
    public List<Entry> getEntriesById(@Argument Long id) {
        Step step = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid step ID"));
        return step.getEntries();

    }

    @MutationMapping
    public Step addStep(@Argument String title, @Argument String description, @Argument Long goalId) {
        Step step = new Step();
        step.setTitle(title);
        step.setDescription(description);
        step.setGoal(
                goalRepository.findById(goalId)
                        .orElseThrow(() -> new IllegalArgumentException("Invalid goal ID")));
        return repo.save(step);
    }

    @MutationMapping
    public Boolean deleteStep(@Argument Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }

}
