package com.example.demo.controller;

import com.example.demo.model.Server;
import com.example.demo.service.ServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth/servers")
@CrossOrigin(origins = "http://localhost:5173")
public class ServerController {

    @Autowired
    private ServerService serverService;

    @GetMapping
    public List<Server> getAllServers() {
        return serverService.getAllServers();
    }

    @GetMapping("/{id}")
    public Optional<Server> getServerById(@PathVariable Long id) {
        return serverService.getServerById(id);
    }

    @GetMapping("/lab/{labId}")
    public List<Server> getServersByLabId(@PathVariable Long labId) {
        return serverService.getServersByLabId(labId);
    }

    @PostMapping
    public Server createServer(@RequestBody Server server) {
        return serverService.saveServer(server);
    }

    @DeleteMapping("/{id}")
    public void deleteServer(@PathVariable Long id) {
        serverService.deleteServer(id);
    }
}
