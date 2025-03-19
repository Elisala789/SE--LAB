package com.example.demo.controller;

import com.example.demo.model.Processor;
import com.example.demo.service.ProcessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth/processors")
@CrossOrigin(origins = "http://localhost:5173")
public class ProcessorController {

    @Autowired
    private ProcessorService processorService;

    @GetMapping
    public List<Processor> getAllProcessors() {
        return processorService.getAllProcessors();
    }

    @GetMapping("/{id}")
    public Optional<Processor> getProcessorById(@PathVariable Long id) {
        return processorService.getProcessorById(id);
    }

    @GetMapping("/lab/{labId}")
    public List<Processor> getProcessorsByLabId(@PathVariable Long labId) {
        return processorService.getProcessorsByLabId(labId);
    }

    @PostMapping
    public Processor createProcessor(@RequestBody Processor processor) {
        return processorService.saveProcessor(processor);
    }

    @DeleteMapping("/{id}")
    public void deleteProcessor(@PathVariable Long id) {
        processorService.deleteProcessor(id);
    }
}
