/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.isu.ru.backend.model.Director;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.service.DirectorService;
import ru.isu.ru.backend.service.UserService;

/**
 *
 * @author barda
 */
@RestController
@CrossOrigin(origins = { "*" })
public class DirectorController {

    @Autowired
    private DirectorService service;

    @RequestMapping("/directors")
    public List<Director> getAllDirectors() {
        List<Director> kal = service.getAllDirectors();
        return kal;
    }
    
    @RequestMapping("/director/{id}")
    public Director getDirector(@PathVariable("id") Integer id) {
        return service.getDirectorById(id);
        
    }
    
    @RequestMapping("/directorUser/{id}")
    public Director getDirectorbyuser(@PathVariable("id") Integer id) {
        return service.getDirectorbyUser(id);
        
    }
    
    @PostMapping("/delete/director/{id}")
    public void deleteDirector(@PathVariable("id") Integer id) {
        service.deleteDirector(id);
    }
    
    
    @PostMapping("/create/director")
    public ResponseEntity<Director> createDirector(@RequestBody Director director) {
        Director savedDirector = service.createDirector(director);
        return new ResponseEntity<>(savedDirector, HttpStatus.CREATED);
    }
    @PostMapping("/update/director/{id}")
    public ResponseEntity<Director> updateDirector(@PathVariable("id") Integer id, @RequestBody Director newDirector) {
        Director updatedDirector = service.updateDirector(id, newDirector);
        return new ResponseEntity<>(updatedDirector, HttpStatus.CREATED);
    }
    
    
}
