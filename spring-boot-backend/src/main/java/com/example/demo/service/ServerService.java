package com.example.demo.service;

import com.example.demo.model.Server;
import com.example.demo.repository.ServerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServerService {

    @Autowired
    private ServerRepository serverRepository;

    public List<Server> getAllServers() {
        return serverRepository.findAll();
    }

    public List<Server> getServersByLabId(Long labId) {
        return serverRepository.findByLabId(labId);
    }

    public Optional<Server> getServerById(Long id) {
        return serverRepository.findById(id);
    }

    public Server saveServer(Server server) {
        return serverRepository.save(server);
    }

    public void deleteServer(Long id) {
        serverRepository.deleteById(id);
    }
}
