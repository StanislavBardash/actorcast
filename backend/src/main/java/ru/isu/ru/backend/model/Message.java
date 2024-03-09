/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.model;

import java.util.Date;
import javax.persistence.*;
import org.hibernate.annotations.ColumnDefault;



/**
 *
 * @author barda
 */
@Entity
@Table(name = "message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "actor_id")
    private Actor actor;
    
    @ManyToOne
    @JoinColumn(name = "director_id")
    private Director director;
    
    @Column(name = "content")
    private String content;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "date")
    private Date date;
    
    @Column(name = "unread",nullable = false)
    private Boolean unread;

    public Message() {
    }

    public Message(Integer id, Actor actor, Director director, String content, Date date, Boolean unread) {
        this.id = id;
        this.actor = actor;
        this.director = director;
        this.content = content;
        this.date = date;
        this.unread = unread;
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

    public String getContent() {
        return content;
    }

    public Date getDate() {
        return date;
    }

    public Boolean getUnread() {
        return unread;
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

    public void setContent(String content) {
        this.content = content;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setUnread(Boolean unread) {
        this.unread = unread;
    }

    
    
    
    
}
