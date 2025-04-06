package com.example.demo.controller;

import com.example.demo.model.RequestSpaceAndServers;
import com.example.demo.service.RequestSpaceAndServersService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;

@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(RequestSpaceAndServersController.class)
class RequestSpaceAndServersControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RequestSpaceAndServersService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllRequests() throws Exception {
        RequestSpaceAndServers req1 = new RequestSpaceAndServers();
        req1.setId(1L);
        req1.setName("John Doe");
        req1.setEmail("john@example.com");
        req1.setRollNumber("12345");
        req1.setLabName("AI Lab");
        req1.setLabId(100L);
        req1.setServersRequired(2);
        req1.setProcessorsRequired(4);
        req1.setRamRequired(16);

        List<RequestSpaceAndServers> requests = Arrays.asList(req1);
        Mockito.when(service.getAllRequests()).thenReturn(requests);

        mockMvc.perform(get("/api/auth/requests"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1))
                .andExpect(jsonPath("$[0].name").value("John Doe"));
    }

    @Test
    void testCreateRequest() throws Exception {
        RequestSpaceAndServers req = new RequestSpaceAndServers();
        req.setId(1L);
        req.setName("Jane Doe");
        req.setEmail("jane@example.com");
        req.setRollNumber("54321");
        req.setLabName("ML Lab");
        req.setLabId(200L);
        req.setServersRequired(1);
        req.setProcessorsRequired(2);
        req.setRamRequired(8);

        Mockito.when(service.saveRequest(Mockito.any(RequestSpaceAndServers.class))).thenReturn(req);

        mockMvc.perform(post("/api/auth/requests")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Jane Doe"));
    }

    @Test
    void testDeleteRequest() throws Exception {
        Long id = 1L;

        mockMvc.perform(delete("/api/auth/requests/{id}", id))
                .andExpect(status().isOk())
                .andExpect(content().string("Request deleted successfully!"));
    }
}
