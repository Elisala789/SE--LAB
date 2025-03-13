package com.example.demo.service;

import com.example.demo.model.Lab;
import com.example.demo.model.LabAdmin;
import com.example.demo.repository.LabAdminRepository;
import com.example.demo.repository.LabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LabAdminService {

    @Autowired
    private LabAdminRepository labAdminRepository;

    @Autowired
    private LabRepository labRepository;

    public List<LabAdmin> getAllLabAdmins() {
        return labAdminRepository.findAll();
    }

    public LabAdmin addLabAdmin(LabAdmin labAdmin, Long labId) {
        if (labAdmin.getName() == null || labAdmin.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        if (labAdmin.getEmail() == null || labAdmin.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if (labAdmin.getPhone() == null || labAdmin.getPhone().trim().isEmpty()) {
            throw new IllegalArgumentException("Phone cannot be empty");
        }
        if (labAdmin.getPassword() == null || labAdmin.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }

        Lab lab = labRepository.findById(labId)
                .orElseThrow(() -> new RuntimeException("Lab not found"));

        if (labAdminRepository.existsByLab(lab)) {
            throw new RuntimeException("Lab already has an assigned admin");
        }

        labAdmin.assignLab(lab);
        return labAdminRepository.save(labAdmin);
    }

    public void deleteLabAdmin(Long adminId) {
        labAdminRepository.deleteById(adminId);
    }
    
    public LabAdmin updateLabAdmin(Long adminId, LabAdmin updatedLabAdmin) {
        LabAdmin existingLabAdmin = labAdminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Lab Admin not found"));

        existingLabAdmin.setName(updatedLabAdmin.getName());  // Update fields
        existingLabAdmin.setEmail(updatedLabAdmin.getEmail()); 
        existingLabAdmin.setPhone(updatedLabAdmin.getPhone());

        return labAdminRepository.save(existingLabAdmin);
    }

}
