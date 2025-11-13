package com.example.skillsync.repository;

import com.example.skillsync.model.ProgressEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgressEntryRepository extends JpaRepository<ProgressEntry, Long> {
    
}
