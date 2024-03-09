/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.model;
import javax.persistence.*;
import java.sql.Date;

/**
 *
 * @author barda
 */
@Entity
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "actor_id")
    private Actor actor;
    
    @ManyToOne
    @JoinColumn(name = "director_id")
    private Director director;
    
    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;
    
    @Column(name = "rating")
    private Double rating;
    @Column(name = "comment")
    private String comment;
    @Column(name = "date")
    private Date date;

    public Review() {
    }

    public Review(Integer id, Actor actor, Director director, Movie movie, Double rating, String comment, Date date) {
        this.id = id;
        this.actor = actor;
        this.director = director;
        this.movie = movie;
        this.rating = rating;
        this.comment = comment;
        this.date = date;
    }

    public Integer getId() {
        return id;
    }

    public Actor getActor() {
        return actor;
    }

    public Director getDirector() {
        return director;
    }

    public Movie getMovie() {
        return movie;
    }

    public Double getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public Date getDate() {
        return date;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setActor(Actor actor) {
        this.actor = actor;
    }

    public void setDirector(Director director) {
        this.director = director;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    
}
