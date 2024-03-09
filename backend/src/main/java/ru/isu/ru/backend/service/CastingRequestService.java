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
import ru.isu.ru.backend.model.CastingRequest;
import ru.isu.ru.backend.repository.ActorRepository;
import ru.isu.ru.backend.repository.CastingRequestRepository;

/**
 *
 * @author barda
 */
@Service
public class CastingRequestService {
    @Autowired
    private CastingRequestRepository castingRequestRepository;
    
//    public CastingRequestService(CastingRequestRepository castingRequestRepository) {
//        this.castingRequestRepository = castingRequestRepository;
//    }

    public List<CastingRequest> getAllCastingRequest() {
        return castingRequestRepository.findAll();
    }
    public List<CastingRequest> getAllCastingRequestForUser(Integer id) {
        return castingRequestRepository.getCastingRequestNameForUser(id);
    }
    public List<CastingRequest> getAllCastingRequestByUser(Integer id) {
        return castingRequestRepository.getCastingRequestByUser(id);
    }
    public List<CastingRequest> getAllCastingRequestByCasting(Integer id) {
        return castingRequestRepository.getCastingRequestByCasting(id);
    }
    public String getCastingRequestNamefById(Integer id){
        return castingRequestRepository.getCastingRequestNameById(id);
    }
    public CastingRequest getCastingRequestById(Integer id) {
        CastingRequest ans = castingRequestRepository.findById(id);
        if (ans == null){
            throw new NoSuchElementException("CastingRequest not found with ID: " + id);
        }
        else{
        return ans;
        }
    }

    public CastingRequest createCastingRequest(CastingRequest castingRequest) {
        return castingRequestRepository.save(castingRequest);
    }

//    public CastingRequest updateCastingRequest(Integer id, CastingRequest updatedCastingRequest) {
//        CastingRequest castingRequest = getCastingRequestById(id);
//        castingRequest.setCasting(updatedCastingRequest.getCasting());
//        castingRequest.setActor(updatedCastingRequest.getActor());
//        castingRequest.setContent(updatedCastingRequest.getContent());
//        return castingRequestRepository.save(castingRequest);
//    }

    public void deleteById(Integer id){
        CastingRequest casting_request = getCastingRequestById(id);
        castingRequestRepository.delete(casting_request);
    }
}
