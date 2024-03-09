/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.ru.backend.model.Casting;
import ru.isu.ru.backend.model.Director;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.repository.CastingRepository;
import ru.isu.ru.backend.repository.DirectorRepository;

/**
 *
 * @author barda
 */
@Service
public class DirectorService {
    @Autowired
    private DirectorRepository directorRepository;
    
//    public DirectorService(DirectorRepository directorRepository) {
//        this.directorRepository = directorRepository;
//    }

    public List<Director> getAllDirectors() {
        return directorRepository.findAll();
    }
    
    public Director getDirectorbyUser(Integer id){
        return directorRepository.findByUserId(id);
    }
    public List<Director> getAllVerifiedDirectors() {
        return directorRepository.findAllVerifiedDirectors();
    }
    public Director getDirectorById(Integer id) {
        Director ans = directorRepository.findById(id);
        if (ans == null){
            throw new NoSuchElementException("Director not found with ID: " + id);
        }
        else{
        return ans;
        }
    }

    public Director createDirector(Director director) {
        return directorRepository.save(director);
    }
    
    public Director updateDirector(Integer id, Director updatedDirector) {
        Director director = getDirectorById(id);
        director.setUser(updatedDirector.getUser());
        director.setFirstName(updatedDirector.getFirstName());
        director.setLastName(updatedDirector.getLastName());
        return directorRepository.save(director);
    }


    public void deleteDirector(Integer id) {
        directorRepository.deleteDirector(id);
    } 
}
