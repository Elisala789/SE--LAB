package com.example.demo.controller;


import com.example.demo.model.RequestSpaceAndServers;
import com.example.demo.service.RequestSpaceAndServersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth/requests")
@CrossOrigin(origins = "http://localhost:5173")  
public class RequestSpaceAndServersController {

    @Autowired
    private RequestSpaceAndServersService service;

    // Save request
    @PostMapping
    public RequestSpaceAndServers createRequest(@RequestBody RequestSpaceAndServers request) {
        return service.saveRequest(request);
    }

    // Get all requests
    @GetMapping
    public List<RequestSpaceAndServers> getAllRequests() {
        return service.getAllRequests();
    }

    // Get request by ID
    @GetMapping("/{id}")
    public Optional<RequestSpaceAndServers> getRequestById(@PathVariable Long id) {
        return service.getRequestById(id);
    }

    // Delete request
    @DeleteMapping("/{id}")
    public String deleteRequest(@PathVariable Long id) {
        service.deleteRequest(id);
        return "Request deleted successfully!";
    }
}
