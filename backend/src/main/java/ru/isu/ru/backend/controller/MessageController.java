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
import ru.isu.ru.backend.model.Actor;
import ru.isu.ru.backend.model.Message;
import ru.isu.ru.backend.model.User;
import ru.isu.ru.backend.service.ActorService;
import ru.isu.ru.backend.service.MessageService;

/**
 *
 * @author barda
 */
@RestController
@CrossOrigin(origins = { "*" })
public class MessageController {

    @Autowired
    private MessageService service;

    @RequestMapping("/messages")
    public List<Message> getAllMessages() {
        return service.getAllMessages();
    }
    @RequestMapping("/unreadmessages")
    public List<Message> getAllUnread() {
        return service.getAllUnreadMessages();
    }
    
    @RequestMapping("/actor_unreadmessages/{id}")
    public List<Message> getAllUnreadForActor(@PathVariable("id") Integer id) {
        return service.getAllUnreadMessagesForActor(id);
    }
    @RequestMapping("/actor_messages/{id}")
    public List<Message> getAllForActor(@PathVariable("id") Integer id) {
        return service.getAllMessagesForActor(id);
    }
    @RequestMapping("/message/{id}")
    public Message getMessage(@PathVariable("id") Integer id) {
        return service.getMessageById(id);
     
    }
    @PostMapping("/create/message")
    public ResponseEntity<Message> createMessage(@RequestBody Message message) {
        Message savedMessage = service.createMessage(message);
        return new ResponseEntity<>(savedMessage, HttpStatus.CREATED);
    }
    @PostMapping("/update/message/{id}")
    public ResponseEntity<Message> updateMessage(@PathVariable("id") Integer id, @RequestBody Message newMessage) {
        Message updatedMessage = service.updateMessage(id, newMessage);
        return new ResponseEntity<>(updatedMessage, HttpStatus.CREATED);
    }
    @DeleteMapping(value = "/delete/message/{id}")
    public void deleteMessage(@PathVariable Integer id) {
        service.deleteById(id);
    }
}
