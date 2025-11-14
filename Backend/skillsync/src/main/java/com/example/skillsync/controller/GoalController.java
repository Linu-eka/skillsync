package com.example.skillsync.controller;

import org.springframework.stereotype.Controller;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.Argument;
import com.example.skillsync.repository.GoalRepository;
import com.example.skillsync.model.Goal;
import java.util.List;

@Controller
public class GoalController {
    private final GoalRepository repo;

    public GoalController(GoalRepository repo) {
        this.repo = repo;
    }

    @QueryMapping
    public List<Goal> getGoals() {
        return repo.findAll();
    }

    @MutationMapping
    public Goal addGoal(@Argument String name, @Argument String description) {
        Goal goal = new Goal();
        goal.setName(name);
        goal.setDescription(description);
        return repo.save(goal);
    }

}
