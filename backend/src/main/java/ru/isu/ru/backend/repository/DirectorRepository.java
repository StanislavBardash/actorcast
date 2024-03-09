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
public interface DirectorRepository extends JpaRepository<Director, Long>{
    @Override
    List<Director> findAll();
    
    @Query("SELECT d FROM Director d WHERE d.user.verified = 1")
    List<Director> findAllVerifiedDirectors();
    
    @Query("SELECT d FROM Director d WHERE d.id = :id")
    Director findById(@Param("id") Integer id);
    
    @Query("SELECT d FROM Director d WHERE d.user.id = :id")
    Director findByUserId(@Param("id") Integer id);
    

//    @Modifying
//    @Query("INSERT INTO Director (user) VALUES (:user)")
//    void insertDirector(@Param("user") User user);

    @Modifying
    @Query("UPDATE Director d SET d.user = :user WHERE d.id = :id")
    void updateDirector(@Param("id") Integer id, @Param("user") User user);

    @Modifying
    @Query("DELETE FROM Director d WHERE d.id = :id")
    void deleteDirector(@Param("id") Integer id);
    
    @Override
    Director save(Director director);
    
}
