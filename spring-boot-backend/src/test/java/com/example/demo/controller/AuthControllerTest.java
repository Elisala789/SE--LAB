package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.util.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false) // ✅ Disable Spring Security for test
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private JwtUtil jwtUtil;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testLoginSuccess() throws Exception {
        // Arrange
        User user = new User();
        user.setEmail("student@example.com");
        user.setPassword("password123");

        when(userService.authenticate(user.getEmail(), user.getPassword()))
                .thenReturn(Optional.of(user));

        when(jwtUtil.generateToken(user.getEmail(), "STUDENT"))
                .thenReturn("mocked-jwt-token");

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("mocked-jwt-token"))
                .andExpect(jsonPath("$.email").value("student@example.com"))
                .andExpect(jsonPath("$.role").value("STUDENT"))
                .andExpect(jsonPath("$.message").value("Login Successful"));
    }
    @Test
    void testFacultyLoginSuccess() throws Exception {
        // Arrange
        User user = new User();
        user.setEmail("prof.faculty@nitc.ac.in");
        user.setPassword("password123");

        when(userService.authenticate(user.getEmail(), user.getPassword()))
                .thenReturn(Optional.of(user));

        when(jwtUtil.generateToken(user.getEmail(), "FACULTY"))
                .thenReturn("faculty-jwt-token");

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("faculty-jwt-token"))
                .andExpect(jsonPath("$.email").value("prof.faculty@nitc.ac.in"))
                .andExpect(jsonPath("$.role").value("FACULTY"))
                .andExpect(jsonPath("$.message").value("Login Successful"));
    }
    @Test
    void testResearcherLoginSuccess() throws Exception {
        // Arrange
        User user = new User();
        user.setEmail("res.researcher@nitc.ac.in");
        user.setPassword("password123");

        when(userService.authenticate(user.getEmail(), user.getPassword()))
                .thenReturn(Optional.of(user));

        when(jwtUtil.generateToken(user.getEmail(), "RESEARCHER"))
                .thenReturn("researcher-jwt-token");

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("researcher-jwt-token"))
                .andExpect(jsonPath("$.email").value("res.researcher@nitc.ac.in"))
                .andExpect(jsonPath("$.role").value("RESEARCHER"))
                .andExpect(jsonPath("$.message").value("Login Successful"));
    }
    
    @Test
    void testGeneralAdminLoginSuccess() throws Exception {
        // Arrange
        User user = new User();
        user.setEmail("admin.GeneralAdmin@nitc.ac.in");
        user.setPassword("password123");

        when(userService.authenticate(user.getEmail(), user.getPassword()))
                .thenReturn(Optional.of(user));

        when(jwtUtil.generateToken(user.getEmail(), "GENERALADMIN"))
                .thenReturn("generaladmin-jwt-token");

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("generaladmin-jwt-token"))
                .andExpect(jsonPath("$.email").value("admin.GeneralAdmin@nitc.ac.in"))
                .andExpect(jsonPath("$.role").value("GENERALADMIN"))
                .andExpect(jsonPath("$.message").value("Login Successful"));
    }
    @Test
    void testUnknownEmailLoginForbidden() throws Exception {
        // Arrange
        User user = new User();
        user.setEmail("random.user@gmail.com");
        user.setPassword("wrongpassword");

        when(userService.authenticate(user.getEmail(), user.getPassword()))
                .thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(post("/api/auth/login")
                        .contentType(APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isForbidden());
    }




}
