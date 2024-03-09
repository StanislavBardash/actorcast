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
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.repository.ActorRepository;
import ru.isu.ru.backend.repository.UserRepository;

/**
 *
 * @author barda
 */
@Service
public class ActorService {
    @Autowired
    private ActorRepository actorRepository;
    
//    public ActorService(ActorRepository actorRepository) {
//        this.actorRepository = actorRepository;
//    }

    public List<Actor> getAllActors() {
        return actorRepository.findAll();
    }
    public List<Actor> getAllVerifiedActors() {
        return actorRepository.findAllVerifiedActors();
    }
    public Actor getActorById(Integer id) {
        Actor ans = actorRepository.findById(id);
        if (ans == null){
            throw new NoSuchElementException("Actor not found with ID: " + id);
        }
        else{
        return ans;
        }
    }

    public Actor createActor(Actor actor) {
        return actorRepository.save(actor);
    }
    public Actor getActorByUser(Integer Id){
        return actorRepository.findByUserId(Id);
    }

    public Actor updateActor(Integer id, Actor updatedActor) {
        Actor actor = getActorById(id);
        actor.setGender(updatedActor.getGender());
        actor.setAge(updatedActor.getAge());
        actor.setHeight(updatedActor.getHeight());
        actor.setWeight(updatedActor.getWeight());
        actor.setKeyFeatures(updatedActor.getKeyFeatures());
        actor.setActingExperience(updatedActor.getActingExperience());
        actor.setUser(updatedActor.getUser());
        actor.setFirstName(updatedActor.getFirstName());
        actor.setSecondName(updatedActor.getSecondName());
        actor.setHasEducation(updatedActor.getHasEducation());
        return actorRepository.save(actor);
    }

    public void deleteActor(Integer id) {
        actorRepository.deleteActor(id);
    }
}
