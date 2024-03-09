/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package ru.isu.ru.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.isu.ru.backend.model.Actor;
import ru.isu.ru.backend.model.Candidat;

/**
 *
 * @author barda
 */
public interface CandidatRepository extends JpaRepository<Candidat, Long>{
    @Override
    List<Candidat> findAll();
    
    @Query("SELECT a FROM Candidat a WHERE a.id = :id")
    Candidat findById(@Param("id") Integer id);
    
//    @Modifying
//    @Query("UPDATE Actor a SET a.gender = :gender, a.age = :age, a.height = :height, a.weight = :weight, a.keyFeatures = :keyFeatures, a.actingExperience = :actingExperience, a.hasEducation = :hasEducation WHERE a.id = :id")
//    void updateActor(@Param("id") Integer id, @Param("gender") String gender, @Param("age") Integer age, @Param("height") Integer height, @Param("weight") Integer weight, @Param("keyFeatures") String keyFeatures, @Param("actingExperience") String actingExperience, @Param("hasEducation") Boolean hasEducation);

    @Override
    public void delete(Candidat t);

    @Override
    Candidat save(Candidat candidat);
//    @Modifying
//    @Query("INSERT INTO Actor (user, gender, age, height, weight, keyFeatures, actingExperience, hasEducation) VALUES (:user, :gender, :age, :height, :weight, :keyFeatures, :actingExperience, :hasEducation)")
//    void insertActor(@Param("user") User user, @Param("gender") String gender, @Param("age") Integer age, @Param("height") Integer height, @Param("weight") Integer weight, @Param("keyFeatures") String keyFeatures, @Param("actingExperience") String actingExperience, @Param("hasEducation") Boolean hasEducation);
//    
    
}
