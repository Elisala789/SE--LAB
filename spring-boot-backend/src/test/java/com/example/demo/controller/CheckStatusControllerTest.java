package com.example.demo.controller;

import com.example.demo.model.CheckStatus;
import com.example.demo.service.CheckStatusService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(CheckStatusController.class)
class CheckStatusControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CheckStatusService checkStatusService;

    @Autowired
    private ObjectMapper objectMapper;

    private final Long requestId = 1L;

    @Test
    void testCreateOrUpdateCheckStatus_created() throws Exception {
        when(checkStatusService.createOrUpdateCheckStatus(requestId)).thenReturn(true);

        mockMvc.perform(post("/api/auth/check_status/{requestId}", requestId))
                .andExpect(status().isOk())
                .andExpect(content().string("Check status created or updated successfully."));
    }

    @Test
    void testCreateOrUpdateCheckStatus_failed() throws Exception {
        when(checkStatusService.createOrUpdateCheckStatus(requestId)).thenReturn(false);

        mockMvc.perform(post("/api/auth/check_status/{requestId}", requestId))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Failed to create or update check status."));
    }

    @Test
    void testGetFullCheckStatus_found() throws Exception {
        CheckStatus mockStatus = new CheckStatus();
        when(checkStatusService.getCheckStatus(requestId)).thenReturn(Optional.of(mockStatus));

        mockMvc.perform(get("/api/auth/check_status/{requestId}", requestId))
                .andExpect(status().isOk());
    }

    @Test
    void testGetFullCheckStatus_notFound() throws Exception {
        when(checkStatusService.getCheckStatus(requestId)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/auth/check_status/{requestId}", requestId))
                .andExpect(status().isNotFound())
                .andExpect(content().string("No status available"));
    }

    @Test
    void testUpdateCheckStatusFields_success() throws Exception {
        when(checkStatusService.updateCheckStatus(requestId, true, true, "Accepted")).thenReturn(true);

        mockMvc.perform(put("/api/auth/check_status/{requestId}", requestId)
                        .param("supervisorVerified", "true")
                        .param("forwardedToLabAdmin", "true")
                        .param("adminStatus", "Accepted"))
                .andExpect(status().isOk())
                .andExpect(content().string("Check status updated successfully."));
    }

    @Test
    void testUpdateCheckStatusFields_notFound() throws Exception {
        when(checkStatusService.updateCheckStatus(requestId, false, false, "Rejected")).thenReturn(false);

        mockMvc.perform(put("/api/auth/check_status/{requestId}", requestId)
                        .param("supervisorVerified", "false")
                        .param("forwardedToLabAdmin", "false")
                        .param("adminStatus", "Rejected"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetStatusCounts_shouldReturnMap() throws Exception {
        Map<String, Integer> statusCounts = new HashMap<>();
        statusCounts.put("pending", 2);
        statusCounts.put("verified", 3);
        statusCounts.put("forwarded", 1);

        when(checkStatusService.getStatusCounts()).thenReturn(statusCounts);

        mockMvc.perform(get("/api/auth/check_status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.pending").value(2))
                .andExpect(jsonPath("$.verified").value(3))
                .andExpect(jsonPath("$.forwarded").value(1));
    }
}
