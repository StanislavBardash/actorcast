/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.model;


import java.util.Date;
import java.util.List;
import javax.persistence.*;
/**
 *
 * @author barda
 */
@Entity
@Table(name = "casting")
public class Casting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;
    
    @Column(name = "role",nullable = false)
    private String role;
    
    @Column(name = "description",nullable = false)
    private String description;
    
    @Column(name = "title",nullable = false)
    private String title;
    
    @Column(name = "city",nullable = false)
    private String city;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "deadline",nullable = false)
    private Date deadline;
    
    @OneToOne
    @JoinColumn(name = "candidat_id", referencedColumnName = "id")
    private Candidat candidat;

    public Casting() {
    }

    public Casting(Integer id, Movie movie, String role, String description, String title, String city, Date deadline, Candidat candidat) {
        this.id = id;
        this.movie = movie;
        this.role = role;
        this.description = description;
        this.title = title;
        this.city = city;
        this.deadline = deadline;
        this.candidat = candidat;
    }

    public Integer getId() {
        return id;
    }

    public Movie getMovie() {
        return movie;
    }

    public String getRole() {
        return role;
    }

    public String getDescription() {
        return description;
    }

    public String getTitle() {
        return title;
    }

    public String getCity() {
        return city;
    }

    public Date getDeadline() {
        return deadline;
    }

    public Candidat getCandidat() {
        return candidat;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public void setCandidat(Candidat candidat) {
        this.candidat = candidat;
    }

    

    

    

   
    
    
    
}
