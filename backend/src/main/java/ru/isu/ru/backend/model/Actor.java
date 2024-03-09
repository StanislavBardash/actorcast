/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.model;

import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author barda
 */
@Entity
@Table(name = "actor")
public class Actor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    
    @Column(name="gender", nullable = false)
    private String gender;
    
    @Column(name="firstName", nullable = false)
    private String firstName;
    
    @Column(name="secondName", nullable = false)
    private String secondName;
    
    @Column(name="age", nullable = false)
    private Integer age;
    
    @Column(name="height", nullable = false)
    private Integer height;
    
    @Column(name="weight",nullable = false)
    private Integer weight;
    
    @Column(name="key_features")
    private String keyFeatures;
    
    @Column(name="experience")
    private String actingExperience;
    
    @Column(name="education")
    private Boolean hasEducation;

    public Actor() {
    }

    public Actor(Integer id, User user, String gender, String firstName, String secondName, Integer age, Integer height, Integer weight, String keyFeatures, String actingExperience, Boolean hasEducation) {
        this.id = id;
        this.user = user;
        this.gender = gender;
        this.firstName = firstName;
        this.secondName = secondName;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.keyFeatures = keyFeatures;
        this.actingExperience = actingExperience;
        this.hasEducation = hasEducation;
    }

    public Integer getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getGender() {
        return gender;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getSecondName() {
        return secondName;
    }

    public Integer getAge() {
        return age;
    }

    public Integer getHeight() {
        return height;
    }

    public Integer getWeight() {
        return weight;
    }

    public String getKeyFeatures() {
        return keyFeatures;
    }

    public String getActingExperience() {
        return actingExperience;
    }

    public Boolean getHasEducation() {
        return hasEducation;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public void setKeyFeatures(String keyFeatures) {
        this.keyFeatures = keyFeatures;
    }

    public void setActingExperience(String actingExperience) {
        this.actingExperience = actingExperience;
    }

    public void setHasEducation(Boolean hasEducation) {
        this.hasEducation = hasEducation;
    }

    

   
    
    
}
