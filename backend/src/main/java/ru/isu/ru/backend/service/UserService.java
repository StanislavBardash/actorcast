/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ru.isu.ru.backend.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.repository.UserRepository;

/**
 *
 * @author barda
 */

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
//    public UserService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public List<User> getAllVerifiedUsers() {
        return userRepository.findAllVerifiedUsers();
    }
    public User findUser(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }
    
    public User getUserById(Integer id) {
        User ans = userRepository.findById(id);
        if (ans == null){
            throw new NoSuchElementException("User not found with ID: " + id);
        }
        else{
        return ans;
        }
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateverifyUser(Integer id) {
        User user = getUserById(id);
        user.setVerified(true);
        return userRepository.save(user);
    }

    public void deleteUser(Integer id) {
        userRepository.deleteUser(id);
    }
    
    
}
