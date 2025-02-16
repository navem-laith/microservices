package com.example.demo.service;



import com.example.demo.model.ChatMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {
    private final Map<String, List<ChatMessage>> chats = new HashMap<>();

    public synchronized void addMessage(ChatMessage message) {
        chats.computeIfAbsent(message.getUserId(), k -> new ArrayList<>()).add(message);

        // Print all chats for the given userId
        System.out.println("Current chat for userId " + message.getUserId()+ ":");
        List<ChatMessage> userMessages = chats.get(message.getUserId());
        if (userMessages != null) {
            for (ChatMessage chatMessage : userMessages) {
                System.out.println("Sender: " + chatMessage.getSender() + " Content: "+ chatMessage.getContent());
            }
        } else {
            System.out.println("No messages for userId " + message.getUserId());
        }
    }


    public synchronized List<ChatMessage> getMessagesForUser(String userId) {
        return chats.getOrDefault(userId, new ArrayList<>());
    }
}
