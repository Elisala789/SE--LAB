package com.example.demo.repository;


import com.example.demo.model.RequestSpaceAndServers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestSpaceAndServersRepository extends JpaRepository<RequestSpaceAndServers, Long> {
}
