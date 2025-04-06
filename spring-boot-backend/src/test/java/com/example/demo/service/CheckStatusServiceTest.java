package com.example.demo.service;

import com.example.demo.model.CheckStatus;
import com.example.demo.model.RequestSpaceAndServers;
import com.example.demo.repository.CheckStatusRepository;
import com.example.demo.repository.RequestSpaceAndServersRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CheckStatusServiceTest {

    @InjectMocks
    private CheckStatusService checkStatusService;

    @Mock
    private CheckStatusRepository checkStatusRepository;

    @Mock
    private RequestSpaceAndServersRepository requestRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateOrUpdateCheckStatus_whenNotExists_shouldCreate() {
        Long requestId = 1L;
        RequestSpaceAndServers request = new RequestSpaceAndServers();
        request.setId(requestId);

        when(checkStatusRepository.findByRequestId(requestId)).thenReturn(Optional.empty());
        when(requestRepository.findById(requestId)).thenReturn(Optional.of(request));
        when(checkStatusRepository.save(any(CheckStatus.class))).thenReturn(new CheckStatus());

        boolean result = checkStatusService.createOrUpdateCheckStatus(requestId);

        assertTrue(result);
        verify(checkStatusRepository).save(any(CheckStatus.class));
    }

    @Test
    void testCreateOrUpdateCheckStatus_whenAlreadyExists_shouldNotCreate() {
        Long requestId = 1L;
        when(checkStatusRepository.findByRequestId(requestId)).thenReturn(Optional.of(new CheckStatus()));

        boolean result = checkStatusService.createOrUpdateCheckStatus(requestId);

        assertFalse(result);
        verify(checkStatusRepository, never()).save(any());
    }

    @Test
    void testGetCheckStatus_shouldReturnOptional() {
        Long requestId = 1L;
        CheckStatus mockStatus = new CheckStatus();
        when(checkStatusRepository.findByRequestId(requestId)).thenReturn(Optional.of(mockStatus));

        Optional<CheckStatus> result = checkStatusService.getCheckStatus(requestId);

        assertTrue(result.isPresent());
        assertEquals(mockStatus, result.get());
    }

    @Test
    void testUpdateCheckStatus_shouldUpdateFields() {
        Long id = 1L;
        CheckStatus checkStatus = new CheckStatus();
        checkStatus.setId(id);

        when(checkStatusRepository.findById(id)).thenReturn(Optional.of(checkStatus));

        boolean result = checkStatusService.updateCheckStatus(id, true, true, "Accepted");

        assertTrue(result);
        assertEquals(true, checkStatus.getSupervisorVerified());
        assertEquals(true, checkStatus.getForwardedToLabAdmin());
        assertEquals("Accepted", checkStatus.getAdminStatus());
        verify(checkStatusRepository).save(checkStatus);
    }

    @Test
    void testUpdateCheckStatus_whenNotFound_shouldReturnFalse() {
        Long id = 1L;
        when(checkStatusRepository.findById(id)).thenReturn(Optional.empty());

        boolean result = checkStatusService.updateCheckStatus(id, true, true, "Rejected");

        assertFalse(result);
    }

    @Test
    void testGetStatusCounts_shouldReturnCorrectCounts() {
        when(checkStatusRepository.countBySupervisorVerifiedFalse()).thenReturn(2);
        when(checkStatusRepository.countBySupervisorVerifiedTrue()).thenReturn(5);
        when(checkStatusRepository.countByForwardedToLabAdminTrue()).thenReturn(3);

        Map<String, Integer> result = checkStatusService.getStatusCounts();

        assertEquals(2, result.get("pending"));
        assertEquals(5, result.get("verified"));
        assertEquals(3, result.get("forwarded"));
    }
}
