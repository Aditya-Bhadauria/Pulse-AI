package com.Aditya.PulseAI.DTO;



public class ChatSessionResponse {
    private String sessionId;
    private String replyText;
    private String audioBase64;

    public ChatSessionResponse(String sessionId, String replyText, String audioBase64) {
        this.sessionId = sessionId;
        this.replyText = replyText;
        this.audioBase64 = audioBase64;
    }

    public String getSessionId() { return sessionId; }
    public String getReplyText() { return replyText; }
    public String getAudioBase64() { return audioBase64; }
}
