package com.Aditya.PulseAI.Controller;


import com.Aditya.PulseAI.DTO.ChatSessionRequest;
import com.Aditya.PulseAI.DTO.ChatSessionResponse;
import com.Aditya.PulseAI.DTO.Content;
import com.Aditya.PulseAI.DTO.Part;
import com.Aditya.PulseAI.service.GeminiService;
import com.Aditya.PulseAI.service.TextToSpeechService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private static final Logger log = LoggerFactory.getLogger(ChatController.class);

    private final GeminiService geminiService;
    private final TextToSpeechService textToSpeechService;

    @Value("${gemini.system.prompt}")
    private String systemPrompt;

    private final Map<String, List<Content>> conversationHistory = new ConcurrentHashMap<>();

    public ChatController(GeminiService geminiService, TextToSpeechService textToSpeechService) {
        this.geminiService = geminiService;
        this.textToSpeechService = textToSpeechService;
    }

    @PostMapping("/message")
    public Mono<ResponseEntity<ChatSessionResponse>> chat(@RequestBody ChatSessionRequest request) {
        String sessionId = Optional.ofNullable(request.getSessionId()).orElse(UUID.randomUUID().toString());
        String userMessage = request.getMessage();

        log.info("Session {}: User said '{}'", sessionId, userMessage);

        conversationHistory.computeIfAbsent(sessionId, k -> {
            List<Content> newHistory = new ArrayList<>();
            newHistory.add(new Content("user", Collections.singletonList(new Part(systemPrompt))));
            return newHistory;
        });

        List<Content> history = conversationHistory.get(sessionId);

        history.add(new Content("user", Collections.singletonList(new Part(userMessage))));

        return geminiService.getReply(history)
                .flatMap(replyText -> {
                    try {
                        history.add(new Content("model", Collections.singletonList(new Part(replyText))));
                        String audioBase64 = textToSpeechService.synthesizeTextToBase64(replyText);
                        ChatSessionResponse response = new ChatSessionResponse(sessionId, replyText, audioBase64);
                        return Mono.just(ResponseEntity.ok(response));
                    } catch (Exception e) {
                        log.error("TTS Error: {}", e.getMessage());
                        return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(new ChatSessionResponse(sessionId, "Error generating audio.", null)));
                    }
                })
                .onErrorResume(e -> {
                    log.error("Gemini Error: {}", e.getMessage());
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(new ChatSessionResponse(sessionId, "Gemini Error: " + e.getMessage(), null)));
                });
    }
}
