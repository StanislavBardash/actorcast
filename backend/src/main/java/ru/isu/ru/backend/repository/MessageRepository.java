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
import ru.isu.ru.backend.model.User;

/**
 *
 * @author barda
 */
public interface MessageRepository extends JpaRepository<Message, Long>{
    @Override
    List<Message> findAll();
       
    @Query("SELECT m FROM Message m WHERE m.id = :id")
    Message findById(@Param("id") Integer id);
    
    @Query("SELECT m FROM Message m WHERE m.unread = 1")
    List<Message> findAllUnread();
    
    @Query("SELECT m FROM Message m WHERE m.unread = 1 AND m.actor.id = :id")
    List<Message> findAllUnreadForActor(@Param("id") Integer id);
    
    @Query("SELECT m FROM Message m WHERE m.actor.id = :id")
    List<Message> findAllForActor(@Param("id") Integer id);
    
//    @Modifying
//    @Query("INSERT INTO Message (actor, director, content, date) VALUES (:actor, :director, :content, :date)")
//    void insertMessage(@Param("actor") Actor actor, @Param("director") Director director,
//                       @Param("content") String content, @Param("date") Date date);

//    @Modifying
//    @Query("UPDATE Message m SET m.actor = :actor, m.director = :director, m.content = :content, m.date = :date WHERE m.id = :id")
//    void updateMessage(@Param("id") Integer id, @Param("actor") Actor actor, @Param("director") Director director,
//                       @Param("content") String content, @Param("date") Date date);

    @Modifying
    @Query("DELETE FROM Message m WHERE m.id = :id")
    void deleteMessage(@Param("id") Integer id);   
    
    
    @Override
    Message save(Message message);

    @Override
    public void delete(Message t);
    
    
    
}
