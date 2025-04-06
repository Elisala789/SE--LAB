package com.example.demo.controller;

import com.example.demo.model.Lab;
import com.example.demo.model.Processor;
import com.example.demo.service.ProcessorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import java.util.Collections;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ProcessorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @SpyBean
    private ProcessorService processorService;

    private Processor processor;

    @BeforeEach
    void setup() {
        Lab lab = new Lab();
        lab.setId(1L);

        processor = new Processor();
        processor.setId(1L);
        processor.setLab(lab);
        processor.setAllocated(4);
        processor.setFree(2);
    }

    @Test
    public void testGetAllProcessors() throws Exception {
        when(processorService.getAllProcessors()).thenReturn(Collections.singletonList(processor));

        mockMvc.perform(get("/api/auth/processors")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].allocated").value(4));
    }
}
