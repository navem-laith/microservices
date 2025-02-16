package com.example.demo.model;

public class ChatMessage {
    private String sender; // "admin" or user ID
    private String content;
    private String userId; // The ID of the user in this chat

    // Constructors, getters, and setters
    public ChatMessage(String sender, String content, String userId) {
        this.sender = sender;
        this.content = content;
        this.userId = userId;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
                "sender='" + sender + '\'' +
                ", content='" + content + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}

