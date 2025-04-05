package com.example.demo.controller;

import com.example.demo.model.Lab;
import com.example.demo.service.LabService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LabController.class)
@AutoConfigureMockMvc(addFilters = false)  // Disable security filters for testing
class LabControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LabService labService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllLabs() throws Exception {
        Lab lab1 = new Lab(1L, "Lab A", 10, "Block A", "9 AM - 5 PM", 32, 8);
        Lab lab2 = new Lab(2L, "Lab B", 5, "Block B", "10 AM - 6 PM", 16, 4);

        when(labService.getAllLabs()).thenReturn(Arrays.asList(lab1, lab2));

        mockMvc.perform(get("/api/auth/labs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2));
    }

    @Test
    void testAddLab() throws Exception {
        Lab lab = new Lab(1L, "New Lab", 12, "Block C", "8 AM - 4 PM", 64, 16);

        when(labService.addLab(anyString(), anyInt(), anyString(), anyString(), anyInt(), anyInt()))
                .thenReturn(lab);

        mockMvc.perform(post("/api/auth/labs")
                        .param("name", "New Lab")
                        .param("servers", "12")
                        .param("location", "Block C")
                        .param("operating_hours", "8 AM - 4 PM")
                        .param("ram", "64")
                        .param("processors", "16"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("New Lab"))
                .andExpect(jsonPath("$.servers").value(12));
    }

    @Test
    void testDeleteLabSuccess() throws Exception {
        when(labService.removeLab(1L)).thenReturn(true);

        mockMvc.perform(delete("/api/auth/labs/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Lab deleted successfully"));
    }

    @Test
    void testDeleteLabNotFound() throws Exception {
        when(labService.removeLab(999L)).thenReturn(false);

        mockMvc.perform(delete("/api/auth/labs/999"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Lab not found"));
    }

    @Test
    void testUpdateLabSuccess() throws Exception {
        Lab existingLab = new Lab(1L, "Old Lab", 5, "Old Block", "9-5", 16, 4);
        Lab updatedLab = new Lab(1L, "Updated Lab", 10, "New Block", "10-6", 32, 8);

        when(labService.getLabById(1L)).thenReturn(Optional.of(existingLab));
        when(labService.saveLab(any(Lab.class))).thenReturn(updatedLab);

        mockMvc.perform(put("/api/auth/labs/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedLab)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Lab"))
                .andExpect(jsonPath("$.servers").value(10));
    }

    @Test
    void testUpdateLabNotFound() throws Exception {
        Lab updatedLab = new Lab(1L, "New Lab", 10, "X Block", "9-5", 32, 8);

        when(labService.getLabById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/auth/labs/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedLab)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Lab not found"));
    }
}
