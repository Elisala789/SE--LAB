package com.example.demo.service;

import com.example.demo.model.RequestSpaceAndServers;
import com.example.demo.repository.RequestSpaceAndServersRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Optional;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RequestSpaceAndServersServiceTest {

    @Mock
    private RequestSpaceAndServersRepository repository;

    @InjectMocks
    private RequestSpaceAndServersService service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveRequest() {
        RequestSpaceAndServers request = new RequestSpaceAndServers();
        request.setName("John Doe");

        when(repository.save(request)).thenReturn(request);

        RequestSpaceAndServers saved = service.saveRequest(request);
        assertEquals("John Doe", saved.getName());
        verify(repository, times(1)).save(request);
    }

    @Test
    void testGetAllRequests() {
        List<RequestSpaceAndServers> mockList = Arrays.asList(new RequestSpaceAndServers(), new RequestSpaceAndServers());
        when(repository.findAll()).thenReturn(mockList);

        List<RequestSpaceAndServers> result = service.getAllRequests();
        assertEquals(2, result.size());
        verify(repository).findAll();
    }

    @Test
    void testGetRequestById() {
        RequestSpaceAndServers request = new RequestSpaceAndServers();
        request.setId(1L);
        when(repository.findById(1L)).thenReturn(Optional.of(request));

        Optional<RequestSpaceAndServers> result = service.getRequestById(1L);
        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getId());
    }

    @Test
    void testDeleteRequest() {
        Long id = 1L;
        doNothing().when(repository).deleteById(id);

        service.deleteRequest(id);
        verify(repository).deleteById(id);
    }
}
