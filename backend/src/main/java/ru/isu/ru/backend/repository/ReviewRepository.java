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
import ru.isu.ru.backend.model.Director;
import ru.isu.ru.backend.model.Message;
import ru.isu.ru.backend.model.Movie;
import ru.isu.ru.backend.model.Review;
import ru.isu.ru.backend.model.User;

/**
 *
 * @author barda
 */
public interface ReviewRepository extends JpaRepository<Review, Long>{
    @Override
    List<Review> findAll();
       
    @Query("SELECT r FROM Review r WHERE r.id = :id")
    Review findById(@Param("id") Integer id);
    
//    @Modifying
//    @Query("INSERT INTO Review (actor, director, movie, rating, comment, date) VALUES (:actor, :director, :movie, :rating, :comment, :date)")
//    void insertReview(@Param("actor") Actor actor, @Param("director") Director director, @Param("movie") Movie movie,
//                      @Param("rating") Double rating, @Param("comment") String comment, @Param("date") Date date);

    @Override
    Review save(Review review);
    
    @Query("SELECT r FROM Review r WHERE r.actor.id = :id")
    List<Review> findForActor(@Param("id") Integer actor_id);
    
    @Modifying
    @Query("UPDATE Review r SET r.actor = :actor, r.director = :director, r.movie = :movie, r.rating = :rating, r.comment = :comment, r.date = :date WHERE r.id = :id")
    void updateReview(@Param("id") Integer id, @Param("actor") Actor actor, @Param("director") Director director,
                      @Param("movie") Movie movie, @Param("rating") Double rating, @Param("comment") String comment,
                      @Param("date") Date date);

    @Modifying
    @Query("DELETE FROM Review r WHERE r.id = :id")
    void deleteReview(@Param("id") Integer id);    
}
