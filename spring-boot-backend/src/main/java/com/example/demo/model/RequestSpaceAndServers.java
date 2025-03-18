package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestSpaceAndServers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String rollNumber;

    private String labName;  // Store lab name
    private Long labId;      // Store lab ID

    private int serversRequired;
    private int processorsRequired;
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRollNumber() {
		return rollNumber;
	}

	public void setRollNumber(String rollNumber) {
		this.rollNumber = rollNumber;
	}

	public String getLabName() {
		return labName;
	}

	public void setLabName(String labName) {
		this.labName = labName;
	}

	public Long getLabId() {
		return labId;
	}

	public void setLabId(Long labId) {
		this.labId = labId;
	}

	public int getServersRequired() {
		return serversRequired;
	}

	public void setServersRequired(int serversRequired) {
		this.serversRequired = serversRequired;
	}

	public int getProcessorsRequired() {
		return processorsRequired;
	}

	public void setProcessorsRequired(int processorsRequired) {
		this.processorsRequired = processorsRequired;
	}

	public int getRamRequired() {
		return ramRequired;
	}

	public void setRamRequired(int ramRequired) {
		this.ramRequired = ramRequired;
	}

	private int ramRequired;
	
	

	@Column(nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@PrePersist
	protected void onCreate() {
	    createdAt = LocalDateTime.now();
	}

	public LocalDateTime getCreatedAt() {
	    return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
	    this.createdAt = createdAt;
	}
	
	@OneToOne(mappedBy = "request", cascade = CascadeType.ALL)
	private CheckStatus checkStatus;


}
