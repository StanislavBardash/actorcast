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
import ru.isu.ru.backend.model.Casting;
import ru.isu.ru.backend.model.CastingRequest;
import ru.isu.ru.backend.model.User;

/**
 *
 * @author barda
 */
public interface CastingRequestRepository extends JpaRepository<CastingRequest, Long> {
    @Override
    List<CastingRequest> findAll();
    
    @Query("SELECT cr FROM CastingRequest cr WHERE cr.id = :id")
    CastingRequest findById(@Param("id") Integer id);
    
    @Query("SELECT cr.content FROM CastingRequest cr WHERE cr.id = :id")
    String getCastingRequestNameById(@Param("id") Integer id);
    
    @Query("SELECT cr FROM CastingRequest cr WHERE cr.casting.movie.director.user.id = :id")
    List<CastingRequest> getCastingRequestNameForUser(@Param("id") Integer id);
    
    @Query("SELECT cr FROM CastingRequest cr WHERE cr.user.id = :id")
    List<CastingRequest> getCastingRequestByUser(@Param("id") Integer id);
    
    @Query("SELECT cr FROM CastingRequest cr WHERE cr.casting.id = :id")
    List<CastingRequest> getCastingRequestByCasting(@Param("id") Integer id);
//    @Modifying
//    @Query("INSERT INTO CastingRequest (casting, actor, content) VALUES (:casting, :actor, :content)")
//    void insertCastingRequest(@Param("casting") Casting casting, @Param("actor") List<Actor> actors, @Param("content") String content);
//
//    @Modifying
//    @Query("UPDATE CastingRequest cr SET cr.casting = :casting, cr.actor = :actor, cr.content = :content WHERE cr.id = :id")
//    void updateCastingRequest(@Param("id") Integer id, @Param("casting") Casting casting, @Param("actor") List<Actor> actors, @Param("content") String content);
//
    
//    @Modifying
//    @Query("DELETE FROM CastingRequest cr WHERE cr.id = :id")
//    void deleteCastingRequest(@Param("id") Integer id);

    @Override
    public void delete(CastingRequest t);
    
    @Override
    CastingRequest save(CastingRequest casting_request);
}