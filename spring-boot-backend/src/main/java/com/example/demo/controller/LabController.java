package com.example.demo.controller;

import com.example.demo.model.Lab;
import com.example.demo.service.LabService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth/labs")
public class LabController {
    private final LabService labService;

    public LabController(LabService labService) {
        this.labService = labService;
    }

    @GetMapping
    public List<Lab> getAllLabs() {
        return labService.getAllLabs();
    }

    @PostMapping
    public ResponseEntity<?> addLab(@RequestParam String name, @RequestParam int servers,@RequestParam String location,@RequestParam String operating_hours,@RequestParam int ram,@RequestParam int processors) {
        Lab lab = labService.addLab(name, servers,location,operating_hours,ram,processors);
        return ResponseEntity.ok(lab);
    }
// hello
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeLab(@PathVariable Long id) {
        boolean deleted = labService.removeLab(id);
        if (deleted) {
            return ResponseEntity.ok("Lab deleted successfully");
        } else {
            return ResponseEntity.badRequest().body("Lab not found");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateLab(@PathVariable Long id, @RequestBody Lab updatedLab) {
        Optional<Lab> existingLab = labService.getLabById(id);

        if (existingLab.isPresent()) {
            Lab lab = existingLab.get();
            lab.setName(updatedLab.getName());
            lab.setServers(updatedLab.getServers());
            lab.setLocation(updatedLab.getLocation());
            lab.setOperating_hours(updatedLab.getOperating_hours());
            lab.setRam(updatedLab.getRam());
            lab.setProcessors(updatedLab.getProcessors());
            labService.saveLab(lab);
            return ResponseEntity.ok(lab);
        } else {
            return ResponseEntity.badRequest().body("Lab not found");
        }
    }

    
    
}