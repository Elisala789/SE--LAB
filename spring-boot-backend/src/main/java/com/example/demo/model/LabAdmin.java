package com.example.demo.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "lab_admins")
public class LabAdmin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String password;

    @OneToOne
    @JoinColumn(name = "lab_id", unique = true, referencedColumnName = "lab_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Lab lab;

    // No-arg constructor
    public LabAdmin() {}

    // All-args constructor
    public LabAdmin(Long adminId, String name, String email, String phone, String password, Lab lab) {
        this.adminId = adminId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.lab = lab;
    }

    // Getters and Setters

    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Lab getLab() {
        return lab;
    }

    public void setLab(Lab lab) {
        this.lab = lab;
    }

    public void assignLab(Lab lab) {
        if (lab == null) {
            throw new IllegalArgumentException("Lab cannot be null");
        }
        this.lab = lab;
    }
}
