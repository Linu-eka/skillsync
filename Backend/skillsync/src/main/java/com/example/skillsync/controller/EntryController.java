package com.example.skillsync.controller;

import org.springframework.stereotype.Controller;

import com.example.skillsync.repository.EntryRepository;
import com.example.skillsync.repository.StepRepository;
import com.example.skillsync.model.Entry;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.Argument;
import java.util.List;

@Controller
public class EntryController {
    private final EntryRepository repo;
    private final StepRepository stepRepository;

    public EntryController(EntryRepository repo, StepRepository stepRepository) {
        this.repo = repo;
        this.stepRepository = stepRepository;
    }

    @QueryMapping
    public List<Entry> getEntries() {
        return repo.findAll();
    }

    @MutationMapping
    public Entry addEntry(@Argument String title, @Argument String message, @Argument Long stepId) {
        Entry entry = new Entry();
        entry.setTitle(title);
        entry.setMessage(message);
        entry.setStep(stepRepository.findById(stepId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid step ID")));
        return repo.save(entry);
    }

}
