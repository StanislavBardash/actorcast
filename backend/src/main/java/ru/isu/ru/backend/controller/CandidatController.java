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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.isu.ru.backend.model.Actor;
import ru.isu.ru.backend.model.Candidat;
import ru.isu.ru.backend.model.Casting;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.service.ActorService;
import ru.isu.ru.backend.service.CandidatService;

/**
 *
 * @author barda
 */
@RestController
@CrossOrigin(origins = { "*" })
public class CandidatController {

    @Autowired
    private CandidatService service;

    @RequestMapping("/candidats")
    public List<Candidat> getAllCandidats() {
        return service.getAllCandidats();
    }
    
    @RequestMapping("/candidat/{id}")
    public Candidat getCandidat(@PathVariable("id") Integer id) {
        return service.getCandidatById(id);
        
    }
    
    
    @PostMapping("/create/candidat")
    public ResponseEntity<Candidat> createCandidat(@RequestBody Candidat candidat) {
        Candidat savedCandidat = service.createCandidat(candidat);
        return new ResponseEntity<>(savedCandidat, HttpStatus.CREATED);
    }
    
//    @PostMapping("/update/actor/{id}")
//    public ResponseEntity<Actor> updateActor(@PathVariable("id") Integer id, @RequestBody Actor newActor) {
//        Actor updatedActor = service.updateActor(id, newActor);
//        return new ResponseEntity<>(updatedActor, HttpStatus.CREATED);
//    }
    
    @PostMapping("/update/candidat/{id}")
    public ResponseEntity<Candidat> updateCandidat(@PathVariable("id") Integer id, @RequestBody Candidat newCandidat) {
        Candidat updatedCandidat = service.updateCandidat(id, newCandidat);
        return new ResponseEntity<>(updatedCandidat, HttpStatus.CREATED);
    }
    @DeleteMapping(value = "/delete/candidat/{id}")
    public void deleteCandidat(@PathVariable Integer id) {
        service.deleteById(id);
    }
}
