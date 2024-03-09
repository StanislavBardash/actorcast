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
import ru.isu.ru.backend.model.Director;
import ru.isu.ru.backend.model.User;

/**
 *
 * @author barda
 */
public interface ActorRepository extends JpaRepository<Actor, Long>{
    @Override
    List<Actor> findAll();
    
    @Query("SELECT a FROM Actor a WHERE a.user.verified = 1")
    List<Actor> findAllVerifiedActors();
    
    @Query("SELECT a FROM Actor a WHERE a.id = :id")
    Actor findById(@Param("id") Integer id);
    
    @Modifying
    @Query("UPDATE Actor a SET a.gender = :gender, a.age = :age, a.height = :height, a.weight = :weight, a.keyFeatures = :keyFeatures, a.actingExperience = :actingExperience, a.hasEducation = :hasEducation WHERE a.id = :id")
    void updateActor(@Param("id") Integer id, @Param("gender") String gender, @Param("age") Integer age, @Param("height") Integer height, @Param("weight") Integer weight, @Param("keyFeatures") String keyFeatures, @Param("actingExperience") String actingExperience, @Param("hasEducation") Boolean hasEducation);

    @Modifying
    @Query("DELETE FROM Actor a WHERE a.id = :id")
    void deleteActor(@Param("id") Integer id);
    
    @Query("SELECT a FROM Actor a WHERE a.user.id = :id")
    Actor findByUserId(@Param("id") Integer id);

    @Override
    Actor save(Actor actor);
//    @Modifying
//    @Query("INSERT INTO Actor (user, gender, age, height, weight, keyFeatures, actingExperience, hasEducation) VALUES (:user, :gender, :age, :height, :weight, :keyFeatures, :actingExperience, :hasEducation)")
//    void insertActor(@Param("user") User user, @Param("gender") String gender, @Param("age") Integer age, @Param("height") Integer height, @Param("weight") Integer weight, @Param("keyFeatures") String keyFeatures, @Param("actingExperience") String actingExperience, @Param("hasEducation") Boolean hasEducation);
//    
    
}
