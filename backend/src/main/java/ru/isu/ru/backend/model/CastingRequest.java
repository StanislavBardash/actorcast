/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.model;
import java.util.List;
import javax.persistence.*;
/**
 *
 * @author barda
 */
@Entity
@Table(name = "casting_request")
public class CastingRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "casting_id")
    private Casting casting;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @Column(name = "content")
    private String content;

    public CastingRequest(Integer id, Casting casting, User user, String content) {
        this.id = id;
        this.casting = casting;
        this.user = user;
        this.content = content;
    }

    public CastingRequest() {
    }

    public Integer getId() {
        return id;
    }

    public Casting getCasting() {
        return casting;
    }

    public User getUser() {
        return user;
    }

    public String getContent() {
        return content;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setCasting(Casting casting) {
        this.casting = casting;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setContent(String content) {
        this.content = content;
    }

    

    

    

    
    

    
    
    
}
