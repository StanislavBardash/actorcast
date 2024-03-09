/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author barda
 */
@Entity
@Table(name = "candidat")
public class Candidat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    
    @Column(name = "gender")
    private String gender;
    
    @Column(name = "education")
    private Boolean education;
    
    @Column(name = "experience")
    private String experience;
    
    @Column(name = "keyFeatures")
    private String keyFeatures;

    public Candidat(Integer id, String gender, Boolean education, String experience, String keyFeatures) {
        this.id = id;
        this.gender = gender;
        this.education = education;
        this.experience = experience;
        this.keyFeatures = keyFeatures;
    }

    public Candidat() {
    }

    public Integer getId() {
        return id;
    }

    public String getGender() {
        return gender;
    }

    public Boolean getEducation() {
        return education;
    }

    public String getExperience() {
        return experience;
    }

    public String getKeyFeatures() {
        return keyFeatures;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setEducation(Boolean education) {
        this.education = education;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public void setKeyFeatures(String keyFeatures) {
        this.keyFeatures = keyFeatures;
    }
    
    
}
