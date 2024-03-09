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
import ru.isu.ru.backend.model.Movie;
import ru.isu.ru.backend.service.DirectorService;
import ru.isu.ru.backend.service.MovieService;

/**
 *
 * @author barda
 */
@RestController
@CrossOrigin(origins = { "*" })
public class MovieController {

    @Autowired
    private MovieService service;

    @RequestMapping("/movies")
    public List<Movie> getAllMovies() {
        List<Movie> kal = service.getAllMovies();
        return kal;
    }
    
    @RequestMapping("/movie/{id}")
    public Movie getMovie(@PathVariable("id") Integer id) {
        return service.getMovieById(id);
        
    }
    
    @RequestMapping("/movieDirector/{id}")
    public List<Movie> getMoviesForDirector(@PathVariable("id") Integer id) {
        return service.getMoviesByDirector(id);
        
    }
    @PostMapping("/delete/movie/{id}")
    public void deleteMovie(@PathVariable("id") Integer id) {
        service.deleteMovie(id);
    }
    
    
    @PostMapping("/create/movie")
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        Movie savedMovie = service.createMovie(movie);
        return new ResponseEntity<>(savedMovie, HttpStatus.CREATED);
    }
    
    @PostMapping("/update/movie/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable("id") Integer id, @RequestBody Movie newMovie) {
        Movie updatedMovie = service.updateMovie(id, newMovie);
        return new ResponseEntity<>(updatedMovie, HttpStatus.CREATED);
    }
}
