/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.model;
import javax.persistence.*;
import java.sql.Date;
import java.util.logging.Logger;

/**
 *
 * @author barda
 */
@Entity
@Table(name = "movie")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "title",nullable = false)
    private String title;
    @Column(name = "description",nullable = false)
    private String description;
    @Column(name = "releaseDate")
    private Date releaseDate;
    @Column(name = "genre",nullable = false)
    private String genre;
    @OneToOne
    @JoinColumn(name = "director_id", referencedColumnName = "id")
    private Director director;

    public Movie(Integer id, String title, String description, Date releaseDate, String genre, Director director) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.releaseDate = releaseDate;
        this.genre = genre;
        this.director = director;
    }

    public Movie() {
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public String getGenre() {
        return genre;
    }

    public Director getDirector() {
        return director;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setDirector(Director director) {
        this.director = director;
    }
    
    
}
