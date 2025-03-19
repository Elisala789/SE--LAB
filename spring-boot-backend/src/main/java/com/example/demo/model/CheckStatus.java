package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "check_status")
public class CheckStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "req_id", unique = true, referencedColumnName = "id")
    private RequestSpaceAndServers request;

    @Column(name = "request_sent_to_supervisor")
    private boolean requestSentToSupervisor;

    @Column(name = "supervisor_verified")
    private Boolean supervisorVerified; // Nullable (true/false/null)

    @Column(name = "forwarded_to_lab_admin")
    private Boolean forwardedToLabAdmin; // Nullable (true/false/null)

    @Column(name = "admin_status")
    private String adminStatus; // Accepted/Rejected/Pending

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public RequestSpaceAndServers getRequest() { return request; }
    public void setRequest(RequestSpaceAndServers request) {
        this.request = request;
        
    }

    public boolean isRequestSentToSupervisor() { return requestSentToSupervisor; }
    public void setRequestSentToSupervisor(boolean requestSentToSupervisor) { this.requestSentToSupervisor = requestSentToSupervisor; }

    public Boolean getSupervisorVerified() { return supervisorVerified; }
    public void setSupervisorVerified(Boolean supervisorVerified) { this.supervisorVerified = supervisorVerified; }

    public Boolean getForwardedToLabAdmin() { return forwardedToLabAdmin; }
    public void setForwardedToLabAdmin(Boolean forwardedToLabAdmin) { this.forwardedToLabAdmin = forwardedToLabAdmin; }

    public String getAdminStatus() { return adminStatus; }
    public void setAdminStatus(String adminStatus) { this.adminStatus = adminStatus; }
}
