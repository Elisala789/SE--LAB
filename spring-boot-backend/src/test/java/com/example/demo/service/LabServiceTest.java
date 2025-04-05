package com.example.demo.service;

import com.example.demo.model.Lab;
import com.example.demo.repository.LabRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class LabServiceTest {

    private LabRepository labRepository;
    private LabService labService;

    @BeforeEach
    void setUp() {
        labRepository = mock(LabRepository.class);
        labService = new LabService(labRepository);
    }

    @Test
    void testGetAllLabs() {
        Lab lab1 = new Lab(1L, "Lab A", 10, "Block A", "9 AM - 5 PM", 32, 8);
        Lab lab2 = new Lab(2L, "Lab B", 5, "Block B", "10 AM - 6 PM", 16, 4);
        when(labRepository.findAll()).thenReturn(Arrays.asList(lab1, lab2));

        var labs = labService.getAllLabs();

        assertEquals(2, labs.size());
        assertEquals("Lab A", labs.get(0).getName());
    }

    @Test
    void testAddLab() {
        Lab savedLab = new Lab(1L, "New Lab", 12, "Block C", "8 AM - 4 PM", 64, 16);
        when(labRepository.save(any(Lab.class))).thenReturn(savedLab);

        Lab result = labService.addLab("New Lab", 12, "Block C", "8 AM - 4 PM", 64, 16);

        assertEquals("New Lab", result.getName());
        assertEquals(12, result.getServers());
        verify(labRepository, times(1)).save(any(Lab.class));
    }

    @Test
    void testRemoveLabSuccess() {
        when(labRepository.existsById(1L)).thenReturn(true);

        boolean result = labService.removeLab(1L);

        assertTrue(result);
        verify(labRepository).deleteById(1L);
    }

    @Test
    void testRemoveLabNotFound() {
        when(labRepository.existsById(999L)).thenReturn(false);

        boolean result = labService.removeLab(999L);

        assertFalse(result);
        verify(labRepository, never()).deleteById(any());
    }

    @Test
    void testGetLabById() {
        Lab lab = new Lab(1L, "Lab A", 10, "Block A", "9-5", 32, 8);
        when(labRepository.findById(1L)).thenReturn(Optional.of(lab));

        Optional<Lab> result = labService.getLabById(1L);

        assertTrue(result.isPresent());
        assertEquals("Lab A", result.get().getName());
    }

    @Test
    void testSaveLab() {
        Lab lab = new Lab(1L, "Saved Lab", 20, "Block Z", "8-6", 128, 16);
        when(labRepository.save(lab)).thenReturn(lab);

        Lab result = labService.saveLab(lab);

        assertEquals("Saved Lab", result.getName());
        verify(labRepository, times(1)).save(lab);
    }
}
