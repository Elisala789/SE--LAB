package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "labs")

public class Lab {
    private Long id;
    private String name;
    private int servers;
    private String location;
    private String operating_hours;
    private int ram;
    private int processors;

    public Lab() {}

    public Lab(Long id, String name, int servers, String location, String operating_hours, int ram, int processors) {
        this.id = id;
        this.name = name;
        this.servers = servers;
        this.location = location;
        this.operating_hours = operating_hours;
        this.ram = ram;
        this.processors = processors;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getServers() { return servers; }
    public void setServers(int servers) { this.servers = servers; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getOperating_hours() { return operating_hours; }
    public void setOperating_hours(String operating_hours) { this.operating_hours = operating_hours; }

    public int getRam() { return ram; }
    public void setRam(int ram) { this.ram = ram; }

    public int getProcessors() { return processors; }
    public void setProcessors(int processors) { this.processors = processors; }
}



