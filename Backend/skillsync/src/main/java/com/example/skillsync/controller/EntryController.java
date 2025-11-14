package com.example.skillsync.controller;

import org.springframework.stereotype.Controller;

import com.example.skillsync.repository.EntryRepository;
import com.example.skillsync.model.Entry;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.Argument;
import java.util.List;

@Controller
public class EntryController {
    private final EntryRepository repo;

    public EntryController(EntryRepository repo) {
        this.repo = repo;
    }

    @QueryMapping
    public List<Entry> getEntries() {
        return repo.findAll();
    }

    @MutationMapping
    public Entry addEntry(@Argument String title, @Argument String message) {
        Entry entry = new Entry();
        entry.setTitle(title);
        entry.setMessage(message);
        return repo.save(entry);
    }

}
