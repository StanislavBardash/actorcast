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
import ru.isu.ru.backend.model.Actor;
import ru.isu.ru.backend.model.Casting;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.service.ActorService;

/**
 *
 * @author barda
 */
@RestController
@CrossOrigin(origins = { "*" })
public class ActorController {

    @Autowired
    private ActorService service;

    @RequestMapping("/actors")
    public List<Actor> getAllActors() {
        return service.getAllActors();
    }
    
    @RequestMapping("/actor/{id}")
    public Actor getActor(@PathVariable("id") Integer id) {
        return service.getActorById(id);
        
    }
    
    @RequestMapping("/actorUser/{id}")
    public Actor getActorforUser(@PathVariable("id") Integer id) {
        return service.getActorByUser(id);
        
    }
    
    @PostMapping("/create/actor")
    public ResponseEntity<Actor> createActor(@RequestBody Actor actor) {
        Actor savedActor = service.createActor(actor);
        return new ResponseEntity<>(savedActor, HttpStatus.CREATED);
    }
    
    @PostMapping("/update/actor/{id}")
    public ResponseEntity<Actor> updateActor(@PathVariable("id") Integer id, @RequestBody Actor newActor) {
        Actor updatedActor = service.updateActor(id, newActor);
        return new ResponseEntity<>(updatedActor, HttpStatus.CREATED);
    }
}
