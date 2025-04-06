package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "servers_table")
public class Server {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "lab_id", nullable = false)
    private Lab lab;

    private int allocated;
    private int free;

    // ✅ No-argument constructor
    public Server() {}

    // ✅ All-argument constructor
    public Server(Long id, Lab lab, int allocated, int free) {
        this.id = id;
        this.lab = lab;
        this.allocated = allocated;
        this.free = free;
    }

    // ✅ Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Lab getLab() {
        return lab;
    }

    public void setLab(Lab lab) {
        this.lab = lab;
    }

    public int getAllocated() {
        return allocated;
    }

    public void setAllocated(int allocated) {
        this.allocated = allocated;
    }

    public int getFree() {
        return free;
    }

    public void setFree(int free) {
        this.free = free;
    }
}
