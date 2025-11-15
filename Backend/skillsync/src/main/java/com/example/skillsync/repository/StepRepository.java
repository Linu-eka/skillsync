package com.example.skillsync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.skillsync.model.Step;

import java.util.List;

public interface StepRepository extends JpaRepository<Step, Long> {

}
