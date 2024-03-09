/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.model;
import java.util.Objects;
import javax.persistence.*;
/**
 *
 * @author barda
 */
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "username",nullable = false, unique = true)
    private String username;
    
    @Column(name = "password",nullable = false)
    private String password;
    
    @Column(name = "email",nullable = false, unique = true)
    private String email;
    
    @Column(name = "role",nullable = false)
    private String role;
    
    @Column(name = "verified",nullable = false)
    private Boolean verified;
    
    @Column(name = "organization")
    private String organization;

    public User() {
    }

    public User(Integer id, String username, String password, String email, String role, Boolean verified, String organization) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.verified = verified;
        this.organization = organization;
    }

    public Integer getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public Boolean getVerified() {
        return verified;
    }

    public String getOrganization() {
        return organization;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    
    
    
}
