package com.example.skillsync.controller;

import com.example.skillsync.model.ProgressEntry
;import com.example.skillsync.repository.ProgressEntryRepository;
import com.example.skillsync.repository.SkillRepository;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.graphql.data.method.annotation.Argument;
import java.util.List;
import com.example.skillsync.model.Skill;

@Controller
public class ProgressEntryController {
    private final ProgressEntryRepository progressRepo;
    private final SkillRepository skillRepo;

    public ProgressEntryController(ProgressEntryRepository progressRepo, SkillRepository skillRepo) {
        this.progressRepo = progressRepo;
        this.skillRepo = skillRepo;
    }

    @QueryMapping
    public List<ProgressEntry> getProgressEntries(@Argument Long skillId) {
        return progressRepo.findAll();
    }

    @MutationMapping
    public ProgressEntry addProgressEntry(@Argument Long skillId, @Argument String notes, @Argument int level) {
        Skill skill = skillRepo.findById(skillId).orElseThrow(() -> new RuntimeException("Skill not found"));
        ProgressEntry entry = new ProgressEntry();
        entry.setSkill(skill);
        entry.setNotes(notes);
        entry.setLevel(level);
        return progressRepo.save(entry);
    }


    
}
