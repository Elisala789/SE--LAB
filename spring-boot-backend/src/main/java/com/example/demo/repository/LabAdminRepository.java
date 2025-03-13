package com.example.demo.repository;

import com.example.demo.model.LabAdmin;
import com.example.demo.model.Lab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabAdminRepository extends JpaRepository<LabAdmin, Long> {
    boolean existsByLab(Lab lab);
}
