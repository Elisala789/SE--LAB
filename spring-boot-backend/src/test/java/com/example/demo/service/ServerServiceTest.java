package com.example.demo.service;

import com.example.demo.model.Lab;
import com.example.demo.model.Server;
import com.example.demo.repository.ServerRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

class ServerServiceTest {

    @Mock
    private ServerRepository serverRepository;

    @InjectMocks
    private ServerService serverService;

    private Lab lab;
    private Server server1;
    private Server server2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        lab = new Lab();
        lab.setId(1L);
        lab.setName("Test Lab");

        server1 = new Server(1L, lab, 5, 3);
        server2 = new Server(2L, lab, 2, 6);
    }

    @Test
    void testGetAllServers() {
        when(serverRepository.findAll()).thenReturn(Arrays.asList(server1, server2));

        List<Server> servers = serverService.getAllServers();

        assertEquals(2, servers.size());
        verify(serverRepository, times(1)).findAll();
    }

    @Test
    void testGetServersByLabId() {
        when(serverRepository.findByLabId(1L)).thenReturn(Arrays.asList(server1, server2));

        List<Server> servers = serverService.getServersByLabId(1L);

        assertEquals(2, servers.size());
        assertEquals(5, servers.get(0).getAllocated());
    }

    @Test
    void testGetServerById() {
        when(serverRepository.findById(1L)).thenReturn(Optional.of(server1));

        Optional<Server> server = serverService.getServerById(1L);

        assertTrue(server.isPresent());
        assertEquals(5, server.get().getAllocated());
    }

    @Test
    void testSaveServer() {
        when(serverRepository.save(server1)).thenReturn(server1);

        Server saved = serverService.saveServer(server1);

        assertNotNull(saved);
        assertEquals(5, saved.getAllocated());
        verify(serverRepository, times(1)).save(server1);
    }

    @Test
    void testDeleteServer() {
        serverService.deleteServer(1L);

        verify(serverRepository, times(1)).deleteById(1L);
    }
}
