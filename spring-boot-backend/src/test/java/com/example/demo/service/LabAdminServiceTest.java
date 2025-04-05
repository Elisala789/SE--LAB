package com.example.demo.service;

import com.example.demo.model.Lab;
import com.example.demo.model.LabAdmin;
import com.example.demo.repository.LabAdminRepository;
import com.example.demo.repository.LabRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@AutoConfigureMockMvc(addFilters = false)
class LabAdminServiceTest {

    @InjectMocks
    private LabAdminService labAdminService;

    @Mock
    private LabAdminRepository labAdminRepository;

    @Mock
    private LabRepository labRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddLabAdminSuccess() {
        Lab lab = new Lab();
        lab.setId(1L);

        LabAdmin labAdmin = new LabAdmin();
        labAdmin.setName("Alice");
        labAdmin.setEmail("alice@example.com");
        labAdmin.setPhone("1234567890");
        labAdmin.setPassword("password123");

        when(labRepository.findById(1L)).thenReturn(Optional.of(lab));
        when(labAdminRepository.existsByLab(lab)).thenReturn(false);
        when(labAdminRepository.save(any(LabAdmin.class))).thenAnswer(i -> i.getArgument(0));

        LabAdmin result = labAdminService.addLabAdmin(labAdmin, 1L);

        assertNotNull(result);
        assertEquals("Alice", result.getName());
        verify(labAdminRepository).save(any(LabAdmin.class));
    }

    @Test
    void testAddLabAdmin_LabAlreadyAssigned() {
        Lab lab = new Lab();
        lab.setId(1L);

        LabAdmin labAdmin = new LabAdmin();
        labAdmin.setName("Bob");
        labAdmin.setEmail("bob@example.com");
        labAdmin.setPhone("9999999999");
        labAdmin.setPassword("secret");

        when(labRepository.findById(1L)).thenReturn(Optional.of(lab));
        when(labAdminRepository.existsByLab(lab)).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            labAdminService.addLabAdmin(labAdmin, 1L);
        });

        assertEquals("Lab already has an assigned admin", exception.getMessage());
    }

    @Test
    void testUpdateLabAdminSuccess() {
        LabAdmin existing = new LabAdmin(1L, "Old", "old@example.com", "8888888888", "pass", null);
        LabAdmin updated = new LabAdmin(1L, "New", "new@example.com", "7777777777", "pass", null);

        when(labAdminRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(labAdminRepository.save(any(LabAdmin.class))).thenAnswer(i -> i.getArgument(0));

        LabAdmin result = labAdminService.updateLabAdmin(1L, updated);

        assertEquals("New", result.getName());
        assertEquals("new@example.com", result.getEmail());
        assertEquals("7777777777", result.getPhone());
    }

    @Test
    void testDeleteLabAdmin() {
        doNothing().when(labAdminRepository).deleteById(1L);
        labAdminService.deleteLabAdmin(1L);
        verify(labAdminRepository, times(1)).deleteById(1L);
    }
}
