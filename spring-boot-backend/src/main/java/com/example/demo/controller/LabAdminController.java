package com.example.demo.controller;

import com.example.demo.model.LabAdmin;
import com.example.demo.service.LabAdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth/lab-admins")
public class LabAdminController {

    private static final Logger logger = LoggerFactory.getLogger(LabAdminController.class);

    @Autowired
    private LabAdminService labAdminService;

    @GetMapping
    public ResponseEntity<List<LabAdmin>> getAllLabAdmins() {
        List<LabAdmin> labAdmins = labAdminService.getAllLabAdmins();
        return ResponseEntity.ok(labAdmins);
    }

    @PostMapping("/add/{labId}")
    public ResponseEntity<LabAdmin> addLabAdmin(@RequestBody LabAdmin labAdmin, @PathVariable Long labId) {
        logger.info("Received request to add Lab Admin for labId: {}", labId);
        LabAdmin createdLabAdmin = labAdminService.addLabAdmin(labAdmin, labId);
        return ResponseEntity.ok(createdLabAdmin);
    }

    @DeleteMapping("/delete/{adminId}")
    public ResponseEntity<String> deleteLabAdmin(@PathVariable Long adminId) {
        labAdminService.deleteLabAdmin(adminId);
        return ResponseEntity.ok("Lab Admin deleted successfully");
    }

    @PutMapping("/update/{adminId}")
    public ResponseEntity<LabAdmin> updateLabAdmin(@PathVariable Long adminId, @RequestBody LabAdmin updatedLabAdmin) {
        LabAdmin updatedAdmin = labAdminService.updateLabAdmin(adminId, updatedLabAdmin);
        if (updatedAdmin == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedAdmin);
    }
}
