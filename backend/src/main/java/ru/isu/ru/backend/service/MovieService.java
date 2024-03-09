/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.ru.backend.model.Message;
import ru.isu.ru.backend.model.Movie;
import ru.isu.ru.backend.repository.MessageRepository;
import ru.isu.ru.backend.repository.MovieRepository;

/**
 *
 * @author barda
 */
@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;
    
//    public MovieService(MovieRepository movieRepository) {
//        this.movieRepository = movieRepository;
//    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
    public Movie getMovieById(Integer id) {
        Movie ans = movieRepository.findById(id);
        if (ans == null){
            throw new NoSuchElementException("Movie not found with ID: " + id);
        }
        else{
        return ans;
        }
    }
    
    public List<Movie> getMoviesByDirector(Integer id){
        return movieRepository.findForDirector(id);
    }
    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public Movie updateMovie(Integer id, Movie updatedMovie) {
        Movie movie = getMovieById(id);
        movie.setDirector(updatedMovie.getDirector());
        movie.setTitle(updatedMovie.getTitle());
        movie.setDescription(updatedMovie.getDescription());
        movie.setReleaseDate(updatedMovie.getReleaseDate());
        movie.setGenre(updatedMovie.getGenre());
        return movieRepository.save(movie);
    }

    public void deleteMovie(Integer id) {
        movieRepository.deleteMovie(id);
    }  
}
