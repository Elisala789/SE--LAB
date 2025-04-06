package com.example.demo.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class JwtUtilTest {

    private JwtUtil jwtUtil;
    private String testEmail = "test@example.com";
    private String testRole = "ADMIN";
    private String token;

    @BeforeEach
    public void setup() {
        jwtUtil = new JwtUtil();
        token = jwtUtil.generateToken(testEmail, testRole);
    }

    @Test
    public void testGenerateToken() {
        assertNotNull(token);
        assertFalse(token.isEmpty());
    }

    @Test
    public void testValidateToken() {
        assertTrue(jwtUtil.validateToken(token));
    }

    @Test
    public void testGetEmailFromToken() {
        String email = jwtUtil.getEmailFromToken(token);
        assertEquals(testEmail, email);
    }

    @Test
    public void testGetRoleFromToken() {
        String role = jwtUtil.getRoleFromToken(token);
        assertEquals(testRole, role);
    }

    @Test
    public void testInvalidTokenValidationFails() {
        String invalidToken = token + "tampered";
        assertFalse(jwtUtil.validateToken(invalidToken));
    }
}
