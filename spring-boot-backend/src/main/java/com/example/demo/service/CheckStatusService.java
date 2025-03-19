package com.example.demo.service;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.CheckStatus;
import com.example.demo.model.RequestSpaceAndServers;
import com.example.demo.repository.CheckStatusRepository;
import com.example.demo.repository.RequestSpaceAndServersRepository;

@Service
public class CheckStatusService {

    @Autowired
    private CheckStatusRepository checkStatusRepository;

    @Autowired
    private RequestSpaceAndServersRepository requestRepository;

    // ✅ Create or update check status (prevents duplicate entries)
    public boolean createOrUpdateCheckStatus(Long requestId) {
        Optional<CheckStatus> existingStatus = checkStatusRepository.findByRequestId(requestId);
        
        if (existingStatus.isPresent()) {
            return false; // Status already exists, no need to create again
        }

        RequestSpaceAndServers request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        CheckStatus status = new CheckStatus();
        status.setRequest(request);
        status.setRequestSentToSupervisor(true);
        status.setSupervisorVerified(false);
        status.setForwardedToLabAdmin(false);
        status.setAdminStatus("Pending");

        checkStatusRepository.save(status);
        return true;
    }

    // ✅ Get check status
    public Optional<CheckStatus> getCheckStatus(Long requestId) {
        return checkStatusRepository.findByRequestId(requestId);
    }

    public boolean updateCheckStatus(Long requestId, Boolean supervisorVerified, Boolean forwardedToLabAdmin, String adminStatus) {
        Optional<CheckStatus> checkStatusOptional = checkStatusRepository.findById(requestId);

        if (!checkStatusOptional.isPresent()) {
            System.out.println("Request ID " + requestId + " not found in database.");
            return false;
        }

        CheckStatus checkStatus = checkStatusOptional.get();

        if (supervisorVerified != null) checkStatus.setSupervisorVerified(supervisorVerified);
        if (forwardedToLabAdmin != null) checkStatus.setForwardedToLabAdmin(forwardedToLabAdmin);
        if (adminStatus != null) checkStatus.setAdminStatus(adminStatus);

        checkStatusRepository.save(checkStatus);
        return true;
    }
    public Map<String, Integer> getStatusCounts() {
        int pending = checkStatusRepository.countBySupervisorVerifiedFalse(); // Fix: count false, not null
        int verified = checkStatusRepository.countBySupervisorVerifiedTrue();
        int forwarded = checkStatusRepository.countByForwardedToLabAdminTrue();

        Map<String, Integer> statusCounts = new HashMap<>();
        statusCounts.put("pending", pending);
        statusCounts.put("verified", verified);
        statusCounts.put("forwarded", forwarded);

        return statusCounts;
    }

    
   
}
