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
import ru.isu.ru.backend.model.Review;
import ru.isu.ru.backend.service.DirectorService;
import ru.isu.ru.backend.service.ReviewService;

/**
 *
 * @author barda
 */
@RestController
@CrossOrigin(origins = { "*" })
public class ReviewController {

    @Autowired
    private ReviewService service;

    @RequestMapping("/actorreviews/{id}")
    public List<Review> getAllForActor(@PathVariable("id") Integer id) {
        List<Review> kal = service.getReviewsForActor(id);
        return kal;
    }
    
    @RequestMapping("/review/{id}")
    public Review getReview(@PathVariable("id") Integer id) {
        return service.getReviewById(id);
        
    }
    @PostMapping("/delete/review/{id}")
    public void deleteReview(@PathVariable("id") Integer id) {
        service.deleteReview(id);
    }
    
    
    @PostMapping("/create/review")
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        Review savedReview = service.createReview(review);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    } 
}
