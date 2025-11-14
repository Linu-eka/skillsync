package com.example.skillsync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.skillsync.model.Goal;

public interface GoalRepository extends JpaRepository<Goal, Long> {

}
