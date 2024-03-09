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
import ru.isu.ru.backend.model.CastingRequest;
import ru.isu.ru.backend.repository.CastingRepository;
import ru.isu.ru.backend.repository.CastingRequestRepository;

/**
 *
 * @author barda
 */
@Service
public class CastingService {
    @Autowired
    private CastingRepository castingRepository;
    

    public List<Casting> getAllCastings() {
        return castingRepository.findAll();
    }
    
    public List<Casting> getAllDirectorCastings(Integer id) {
        return castingRepository.findDirectorCasting(id);
    }
    public Casting getCastingById(Integer id) {
        Casting ans = castingRepository.findById(id);
        if (ans == null){
            throw new NoSuchElementException("Casting not found with ID: " + id);
        }
        else{
        return ans;
        }
    }
    public Casting updateCasting(Integer id, Casting updatedCasting) {
        Casting casting = getCastingById(id);
        casting.setCity(updatedCasting.getCity());
        casting.setDeadline(updatedCasting.getDeadline());
        casting.setDescription(updatedCasting.getDescription());
        casting.setRole(updatedCasting.getRole());
        casting.setTitle(updatedCasting.getTitle());
        casting.setCandidat(updatedCasting.getCandidat());
        casting.setMovie(updatedCasting.getMovie());
        return castingRepository.save(casting);
    }
    public Casting createCasting(Casting casting) {
        return castingRepository.save(casting);
    }
//
//    public Casting updateCasting(Integer id, Casting updatedCasting) {
//        Casting casting = getCastingById(id);
//        casting.setMovies(updatedCasting.getMovies());
//        casting.setRole(updatedCasting.getRole());
//        casting.setDescription(updatedCasting.getDescription());
//        casting.setCity(updatedCasting.getCity());
//        casting.setDeadline(updatedCasting.getDeadline());
//        return castingRepository.save(casting);
//    }
//
    public void deleteById(Integer id){
        Casting casting = getCastingById(id);
        castingRepository.delete(casting);
    }
}
