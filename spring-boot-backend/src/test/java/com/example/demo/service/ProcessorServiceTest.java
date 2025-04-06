package com.example.demo.service;

import com.example.demo.model.Lab;
import com.example.demo.model.Processor;
import com.example.demo.repository.ProcessorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProcessorServiceTest {

    @Mock
    private ProcessorRepository processorRepository;

    @InjectMocks
    private ProcessorService processorService;

    private Processor processor;
    private Lab lab;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        lab = new Lab();
        lab.setId(1L);

        processor = new Processor();
        processor.setId(1L);
        processor.setLab(lab);
        processor.setAllocated(4);
        processor.setFree(2);
    }

    @Test
    void testGetAllProcessors() {
        when(processorRepository.findAll()).thenReturn(Arrays.asList(processor));
        List<Processor> result = processorService.getAllProcessors();
        assertEquals(1, result.size());
        verify(processorRepository, times(1)).findAll();
    }

    @Test
    void testGetProcessorById() {
        when(processorRepository.findById(1L)).thenReturn(Optional.of(processor));
        Optional<Processor> result = processorService.getProcessorById(1L);
        assertTrue(result.isPresent());
        assertEquals(4, result.get().getAllocated());
    }

    @Test
    void testGetProcessorsByLabId() {
        when(processorRepository.findByLabId(1L)).thenReturn(Arrays.asList(processor));
        List<Processor> result = processorService.getProcessorsByLabId(1L);
        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).getLab().getId());
    }

    @Test
    void testSaveProcessor() {
        when(processorRepository.save(processor)).thenReturn(processor);
        Processor saved = processorService.saveProcessor(processor);
        assertEquals(4, saved.getAllocated());
    }

    @Test
    void testDeleteProcessor() {
        processorService.deleteProcessor(1L);
        verify(processorRepository, times(1)).deleteById(1L);
    }
}
