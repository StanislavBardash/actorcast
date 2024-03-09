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
import ru.isu.ru.backend.model.Candidat;
import ru.isu.ru.backend.model.Casting;
import ru.isu.ru.backend.model.Director;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.service.CastingService;
import ru.isu.ru.backend.service.UserService;

/**
 *
 * @author barda
 */
@RestController
@CrossOrigin(origins = { "*" })
public class CastingController {

    @Autowired
    private CastingService service;

    @RequestMapping("/castings")
    public List<Casting> getAllCasting() {
        return service.getAllCastings();
    }
    
    @RequestMapping("/casting/{id}")
    public Casting getCasting(@PathVariable("id") Integer id) {
        return service.getCastingById(id); 
    }
    @RequestMapping("/list_directorcasting/{id}")
    public List<Casting> getListDirectorCasting(@PathVariable("id") Integer id) {
        return service.getAllDirectorCastings(id);
    }
    @PostMapping("/create/casting")
    public ResponseEntity<Casting> createCasting(@RequestBody Casting casting) {
        Casting savedCasting = service.createCasting(casting);
        return new ResponseEntity<>(savedCasting, HttpStatus.CREATED);
    }
    
    @DeleteMapping(value = "/delete/casting/{id}")
    public void deleteCasting(@PathVariable Integer id) {
        service.deleteById(id);
    }
    
    @PostMapping("/update/casting/{id}")
    public ResponseEntity<Casting> updateCasting(@PathVariable("id") Integer id, @RequestBody Casting newCasting) {
        Casting updatedCasting = service.updateCasting(id, newCasting);
        return new ResponseEntity<>(updatedCasting, HttpStatus.CREATED);
    }

}
