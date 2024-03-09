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
import org.springframework.stereotype.Repository;
import ru.isu.ru.backend.model.User;

/**
 *
 * @author barda
 */
public interface UserRepository extends JpaRepository<User, Long>{
    @Override
    List<User> findAll();
    
    @Query("SELECT u FROM User u WHERE u.verified = 1")
    List<User> findAllVerifiedUsers();
    
    @Query("SELECT u FROM User u WHERE u.id = :id")
    User findById(@Param("id") Integer id);
    
    @Query("SELECT u FROM User u WHERE u.username = :username AND u.password = :password")
    User findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
    
//    @Modifying
//    @Query("UPDATE User u SET u.username = :username, u.password = :password, u.email = :email, u.role = :role, u.verified = :verified, u.organization = :organization WHERE u.id = :id")
//    void updateUser(@Param("id") Integer id, @Param("username") String username, @Param("password") String password, @Param("email") String email, @Param("role") String role, @Param("verified") Boolean verified, @Param("organization") String organization);

    @Modifying
    @Query("DELETE FROM User u WHERE u.id = :id")
    void deleteUser(@Param("id") Integer id);
    
    @Override
    User save(User user);
//    @Modifying
//    @Query("INSERT INTO User (username, password, email, role, verified, organization) VALUES (:username, :password, :email, :role, :verified, :organization)")
//    void insertUser(@Param("username") String username, @Param("password") String password, @Param("email") String email, @Param("role") String role, @Param("verified") Boolean verified, @Param("organization") String organization);
//    
    
}
