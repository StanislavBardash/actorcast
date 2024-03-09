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
import ru.isu.ru.backend.model.Message;
import ru.isu.ru.backend.repository.CastingRepository;
import ru.isu.ru.backend.repository.MessageRepository;

/**
 *
 * @author barda
 */
@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;
    
//    public MessageService(MessageRepository messageRepository) {
//        this.messageRepository = messageRepository;
//    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }
    public List<Message> getAllUnreadMessages(){
        return messageRepository.findAllUnread();
    }
    
    public List<Message> getAllUnreadMessagesForActor(Integer id){
        return messageRepository.findAllUnreadForActor(id);
    }
    
    public List<Message> getAllMessagesForActor(Integer id){
        return messageRepository.findAllForActor(id);
    }
    
    
    public Message getMessageById(Integer id) {
        Message ans = messageRepository.findById(id);
        if (ans == null){
            throw new NoSuchElementException("Message not found with ID: " + id);
        }
        else{
        return ans;
        }
    }

    public Message createMessage(Message message) {
        return messageRepository.save(message);
    }

    public Message updateMessage(Integer id, Message updatedMessage) {
        Message message = getMessageById(id);
        message.setDirector(updatedMessage.getDirector());
        message.setActor(updatedMessage.getActor());
        message.setContent(updatedMessage.getContent());
        message.setDate(updatedMessage.getDate());
        message.setUnread(updatedMessage.getUnread());
        return messageRepository.save(message);
    }

    public void deleteById(Integer id){
        Message message = getMessageById(id);
        messageRepository.delete(message);
    }
}
