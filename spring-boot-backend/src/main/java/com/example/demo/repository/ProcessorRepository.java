package com.example.demo.repository;

import com.example.demo.model.Processor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessorRepository extends JpaRepository<Processor, Long> {
    List<Processor> findByLabId(Long labId);
}
