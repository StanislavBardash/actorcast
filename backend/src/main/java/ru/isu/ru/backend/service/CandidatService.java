/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.ru.backend.model.Actor;
import ru.isu.ru.backend.model.Candidat;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.repository.ActorRepository;
import ru.isu.ru.backend.repository.CandidatRepository;
import ru.isu.ru.backend.repository.UserRepository;

/**
 *
 * @author barda
 */
@Service
public class CandidatService {
    @Autowired
    private CandidatRepository candidatRepository;
    
//    public ActorService(ActorRepository actorRepository) {
//        this.actorRepository = actorRepository;
//    }

    public List<Candidat> getAllCandidats() {
        return candidatRepository.findAll();
    }

    public Candidat getCandidatById(Integer id) {
        Candidat ans = candidatRepository.findById(id);
        if (ans == null){
            throw new NoSuchElementException("Candidat not found with ID: " + id);
        }
        else{
        return ans;
        }
    }

    public Candidat createCandidat(Candidat candidat) {
        return candidatRepository.save(candidat);
    }

//    public Actor updateActor(Integer id, Actor updatedActor) {
//        Actor actor = getActorById(id);
//        actor.setGender(updatedActor.getGender());
//        actor.setAge(updatedActor.getAge());
//        actor.setHeight(updatedActor.getHeight());
//        actor.setWeight(updatedActor.getWeight());
//        actor.setKeyFeatures(updatedActor.getKeyFeatures());
//        actor.setActingExperience(updatedActor.getActingExperience());
//        actor.setUser(updatedActor.getUser());
//        actor.setFirstName(updatedActor.getFirstName());
//        actor.setSecondName(updatedActor.getSecondName());
//        actor.setHasEducation(updatedActor.getHasEducation());
//        return actorRepository.save(actor);
//    }
    public Candidat updateCandidat(Integer id, Candidat updatedCandidat) {
        Candidat candidat = getCandidatById(id);
        candidat.setEducation(updatedCandidat.getEducation());
        candidat.setExperience(updatedCandidat.getExperience());
        candidat.setGender(updatedCandidat.getGender());
        candidat.setKeyFeatures(updatedCandidat.getKeyFeatures());
        return candidatRepository.save(candidat);
    }
    public void deleteById(Integer id){
        Candidat candidat = getCandidatById(id);
        candidatRepository.delete(candidat);
    }
}
