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
import ru.isu.ru.backend.model.Actor;
import ru.isu.ru.backend.model.Casting;
import ru.isu.ru.backend.model.Movie;
import ru.isu.ru.backend.model.User;

/**
 *
 * @author barda
 */
public interface CastingRepository extends JpaRepository<Casting, Long> {
    @Override
    List<Casting> findAll();
    
    @Query("SELECT c FROM Casting c WHERE c.id = :id")
    Casting findById(@Param("id") Integer id);
    
    @Override
    Casting save(Casting casting);
    
    @Query("SELECT c FROM Casting c WHERE c.movie.director.id = :id")
    List<Casting> findDirectorCasting(@Param("id") Integer id);
    
//    @Modifying
//    @Query("INSERT INTO Casting (movies, role, description, city, deadline) VALUES (:movies, :role, :description, :city, :deadline)")
//    void insertCasting(@Param("movies") List<Movie> movies, @Param("role") String role, @Param("description") String description, @Param("city") String city, @Param("deadline") Date deadline);

//    @Modifying
//    @Query("UPDATE Casting c SET c.movies = :movies, c.role = :role, c.description = :description, c.city = :city, c.deadline = :deadline WHERE c.id = :id")
//    void updateCasting(@Param("id") Integer id, @Param("movies") List<Movie> movies, @Param("role") String role, @Param("description") String description, @Param("city") String city, @Param("deadline") Date deadline);
//
    @Override
    public void delete(Casting t);
}
