package com.example.skillsync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.skillsync.model.Entry;

public interface EntryRepository extends JpaRepository<Entry, Long> {

}
