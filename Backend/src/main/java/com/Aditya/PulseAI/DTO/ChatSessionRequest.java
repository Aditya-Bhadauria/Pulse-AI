package com.Aditya.PulseAI.DTO;



public class ChatSessionRequest {
    private String sessionId;
    private String message;

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
