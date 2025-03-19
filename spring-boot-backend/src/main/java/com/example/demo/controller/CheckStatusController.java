package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.CheckStatus;
import com.example.demo.service.CheckStatusService;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth/check_status")
@CrossOrigin(origins = "http://localhost:5173") // Ensure frontend can access this
public class CheckStatusController {

    @Autowired
    private CheckStatusService checkStatusService;

    // ✅ Create or update check status
    @PostMapping("/{requestId}")
    public ResponseEntity<String> createOrUpdateCheckStatus(@PathVariable Long requestId) {
        boolean isCreated = checkStatusService.createOrUpdateCheckStatus(requestId);
        if (isCreated) {
            return ResponseEntity.ok("Check status created or updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to create or update check status.");
        }
    }

    @GetMapping("/{requestId}")
    public ResponseEntity<?> getFullCheckStatus(@PathVariable Long requestId) {
        Optional<CheckStatus> checkStatus = checkStatusService.getCheckStatus(requestId);
        
        if (checkStatus.isPresent()) {
            return ResponseEntity.ok(checkStatus.get()); // Return full CheckStatus object
        } else {
            return ResponseEntity.status(404).body("No status available"); // Return a proper error message
        }
    }

   
    
    @PutMapping("/{requestId}")
    public ResponseEntity<String> updateCheckStatusFields(
            @PathVariable Long requestId,
            @RequestParam(required = false) Boolean supervisorVerified,
            @RequestParam(required = false) Boolean forwardedToLabAdmin,
            @RequestParam(required = false) String adminStatus) {
        
        boolean updated = checkStatusService.updateCheckStatus(requestId, supervisorVerified, forwardedToLabAdmin, adminStatus);
        return updated ? ResponseEntity.ok("Check status updated successfully.") : ResponseEntity.notFound().build();
    }
    
    @GetMapping
    public ResponseEntity<?> getStatusCounts() {
        return ResponseEntity.ok(checkStatusService.getStatusCounts());
    }


    
    
    

}
