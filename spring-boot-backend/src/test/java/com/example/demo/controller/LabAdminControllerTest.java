package com.example.demo.controller;

import com.example.demo.model.Lab;
import com.example.demo.model.LabAdmin;
import com.example.demo.service.LabAdminService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@Import(com.example.demo.config.SecurityConfigTest.class)
@WebMvcTest(LabAdminController.class)
class LabAdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LabAdminService labAdminService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testAddLabAdmin() throws Exception {
        LabAdmin labAdmin = new LabAdmin(null, "Alice", "alice@example.com", "9999999999", "secret", null);
        LabAdmin savedAdmin = new LabAdmin(1L, "Alice", "alice@example.com", "9999999999", "secret", new Lab());

        when(labAdminService.addLabAdmin(any(LabAdmin.class), eq(1L))).thenReturn(savedAdmin);

        mockMvc.perform(post("/api/auth/lab-admins/add/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(labAdmin)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Alice"))
                .andExpect(jsonPath("$.email").value("alice@example.com"));
    }

    @Test
    void testGetAllLabAdmins() throws Exception {
        when(labAdminService.getAllLabAdmins()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/auth/lab-admins"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }
}
