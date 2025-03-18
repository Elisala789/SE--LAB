package com.example.demo.repository;

import com.example.demo.model.CheckStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CheckStatusRepository extends JpaRepository<CheckStatus, Long> {
    Optional<CheckStatus> findByRequestId(Long requestId);
}
