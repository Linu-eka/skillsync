package com.example.skillsync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.skillsync.model.Entry;
import java.util.List;

public interface EntryRepository extends JpaRepository<Entry, Long> {
    List<Entry> findByStepId(Long stepId);

}
