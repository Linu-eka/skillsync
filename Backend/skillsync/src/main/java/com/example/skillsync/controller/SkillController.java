package com.example.skillsync.controller;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.graphql.data.method.annotation.Argument;

import com.example.skillsync.repository.SkillRepository;


import com.example.skillsync.model.Skill;
import java.util.List;

@Controller
public class SkillController {

    private final SkillRepository repo;

    public SkillController(SkillRepository repo) {
        this.repo = repo;
    }

    @QueryMapping
    public List<Skill> getSkills() {
        return repo.findAll();
    }

    @MutationMapping
    public Skill addSkill(@Argument String name, @Argument String description) {
        Skill skill = new Skill();
        skill.setName(name);
        skill.setDescription(description);
        return repo.save(skill);
    }

    


    
}
