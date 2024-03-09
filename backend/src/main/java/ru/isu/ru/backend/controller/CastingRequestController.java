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
import ru.isu.ru.backend.model.CastingRequest;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.service.CastingRequestService;
import ru.isu.ru.backend.service.UserService;

/**
 *
 * @author barda
 */
@RestController
@CrossOrigin(origins = { "*" })
public class CastingRequestController {

    @Autowired
    private CastingRequestService service;

    @RequestMapping("/casting_requests")
    public List<CastingRequest> getAllCastingRequests() {
        List<CastingRequest> kal = service.getAllCastingRequest();
        return kal;
    }
    
    @RequestMapping("/casting_request/{id}")
    public CastingRequest getCastingRequest(@PathVariable("id") Integer id) {
        return service.getCastingRequestById(id);
        
    }
    @RequestMapping("/casting_request_name/{id}")
    public String getCastingRequestName(@PathVariable("id") Integer id) {
        return service.getCastingRequestNamefById(id);
        
    }
    //For director
    @RequestMapping("/casting_requests_user/{id}")
    public List<CastingRequest> getCastingRequestsUser(@PathVariable("id") Integer id) {
        return service.getAllCastingRequestForUser(id);  
    }
    
    //For actor
    @RequestMapping("/casting_requests_by_user/{id}")
    public List<CastingRequest> getCastingRequestsByUserID(@PathVariable("id") Integer id) {
        return service.getAllCastingRequestByUser(id);
        
    }
    @RequestMapping("/casting_requests_by_casting/{id}")
    public List<CastingRequest> getCastingRequestsByCasting(@PathVariable("id") Integer id) {
        return service.getAllCastingRequestByCasting(id);
        
    }


    
//    @RequestMapping("/findUser/{username}/{password}")
//    public User findUser(@PathVariable("username") String username, @PathVariable("password") String password){
//        return service.findUser(username, password);
//    }
    @PostMapping("/create/casting_request")
    public ResponseEntity<CastingRequest> createCastingRequest(@RequestBody CastingRequest casting_request) {
        CastingRequest savedCastingRequest = service.createCastingRequest(casting_request);
        return new ResponseEntity<>(savedCastingRequest, HttpStatus.CREATED);
    }
    @DeleteMapping(value = "/delete/casting_request/{id}")
    public void deleteCastingRequest(@PathVariable Integer id) {
        service.deleteById(id);
    }

    

}
