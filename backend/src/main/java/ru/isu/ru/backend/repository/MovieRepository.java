/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package ru.isu.ru.backend.repository;

import java.sql.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.isu.ru.backend.model.Director;
import ru.isu.ru.backend.model.Message;
import ru.isu.ru.backend.model.Movie;
import ru.isu.ru.backend.model.User;

/**
 *
 * @author barda
 */
public interface MovieRepository extends JpaRepository<Movie, Long>{
    @Override
    List<Movie> findAll();
       
    @Query("SELECT m FROM Movie m WHERE m.id = :id")
    Movie findById(@Param("id") Integer id);
    
    @Query("SELECT m FROM Movie m WHERE m.director.id = :id")
    List<Movie> findForDirector(@Param("id") Integer id);
    
    @Override
    Movie save(Movie movie);

    @Modifying
    @Query("DELETE FROM Movie m WHERE m.id = :id")
    void deleteMovie(@Param("id") Integer id);
    
}
