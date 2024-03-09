/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.isu.ru.backend.model.User;

import ru.isu.ru.backend.repository.UserRepository;
import ru.isu.ru.backend.service.UserService;

/**
 *
 * @author barda
 */
@RestController
@CrossOrigin(origins = { "*" })
public class UserController {

    @Autowired
    private UserService service;

    @RequestMapping("/users")
    public List<User> getAllUsers() {
        List<User> kal = service.getAllUsers();
        return kal;
    }
    
    @RequestMapping("/user/{id}")
    public User getUser(@PathVariable("id") Integer id) {
        return service.getUserById(id);
        
    }
    @PostMapping("/delete/user/{id}")
    public void deleteUser(@PathVariable("id") Integer id) {
        service.deleteUser(id);
    }
    
    @RequestMapping("/findUser/{username}/{password}")
    public User findUser(@PathVariable("username") String username, @PathVariable("password") String password){
        return service.findUser(username, password);
    }
    @PostMapping("/create/user")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = service.createUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
    
    @PostMapping("/update/user/{id}")
    public ResponseEntity<User> updateverifiedUser(@PathVariable("id") Integer id) {
        User updatedUser = service.updateverifyUser(id);
        return new ResponseEntity<>(updatedUser, HttpStatus.CREATED);
    }
//    @PostMapping("/delete/user/{id}")
//    public void veirifyUser(@PathVariable("id") Integer id) {
//        service.deleteUser(id);
//    }
    

    
}
