package com.example.demo.controller;

import com.example.demo.model.ChatMessage;
import com.example.demo.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


@Controller
public class ChatController {
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    public ChatController(SimpMessagingTemplate messagingTemplate, ChatService chatService) {
        this.messagingTemplate = messagingTemplate;
        this.chatService = chatService;
    }

    @MessageMapping("/sendMessage")
    public void handleMessage(ChatMessage message) {
        System.out.println("message has been sent: "+ message.toString());
        chatService.addMessage(message);
        //messagingTemplate.convertAndSend(STR."/topic/chat/\{message.getUserId()}", message);
        messagingTemplate.convertAndSend("/topic/chat/" + message.getUserId(), message);
    }

    @GetMapping("/chat/history/{userId}")
    @ResponseBody
    public List<ChatMessage> getChatHistory(@PathVariable String userId) {
        System.out.println("tryna get chat history");
        return chatService.getMessagesForUser(userId);
    }
}
