package com.example.demo.service;



import com.example.demo.model.RequestSpaceAndServers;
import com.example.demo.repository.RequestSpaceAndServersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestSpaceAndServersService {

    @Autowired
    private RequestSpaceAndServersRepository repository;

    public RequestSpaceAndServers saveRequest(RequestSpaceAndServers request) {
        return repository.save(request);
    }

    public List<RequestSpaceAndServers> getAllRequests() {
        return repository.findAll();
    }

    public Optional<RequestSpaceAndServers> getRequestById(Long id) {
        return repository.findById(id);
    }

    public void deleteRequest(Long id) {
        repository.deleteById(id);
    }
}
