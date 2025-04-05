package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
    }

    @Test
    void testAuthenticate_Success() {
        // Arrange
        String email = "test@example.com";
        String password = "password123";

        User mockUser = new User();
        mockUser.setEmail(email);
        mockUser.setPassword(password);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(mockUser));

        // Act
        Optional<User> result = userService.authenticate(email, password);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(email, result.get().getEmail());
        assertEquals(password, result.get().getPassword());
    }

    @Test
    void testAuthenticate_InvalidPassword() {
        // Arrange
        String email = "test@example.com";
        String correctPassword = "password123";
        String wrongPassword = "wrongPass";

        User mockUser = new User();
        mockUser.setEmail(email);
        mockUser.setPassword(correctPassword);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(mockUser));

        // Act
        Optional<User> result = userService.authenticate(email, wrongPassword);

        // Assert
        assertFalse(result.isPresent());
    }

    @Test
    void testAuthenticate_UserNotFound() {
        // Arrange
        String email = "notfound@example.com";
        String password = "irrelevant";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Act
        Optional<User> result = userService.authenticate(email, password);

        // Assert
        assertFalse(result.isPresent());
    }
}
