package com.example.demo.controller;

import com.example.demo.model.Lab;
import com.example.demo.model.Server;
import com.example.demo.service.ServerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ServerController.class)
class ServerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ServerService serverService;

    private Server server;

    @BeforeEach
    void setUp() {
        Lab lab = new Lab();
        lab.setId(1L);

        server = new Server();
        server.setId(1L);
        server.setLab(lab);
        server.setAllocated(5);
        server.setFree(3);
    }

    @Test
    @WithMockUser
    void testGetAllServers() throws Exception {
        when(serverService.getAllServers()).thenReturn(List.of(server));

        mockMvc.perform(get("/api/auth/servers")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].allocated").value(5))
                .andExpect(jsonPath("$[0].free").value(3));
    }
}
