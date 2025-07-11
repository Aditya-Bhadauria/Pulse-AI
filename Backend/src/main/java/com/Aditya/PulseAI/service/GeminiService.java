package com.Aditya.PulseAI.service;


import com.Aditya.PulseAI.DTO.*;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service
public class GeminiService {
    private static final Logger log = LoggerFactory.getLogger(GeminiService.class);

    private final WebClient webClient;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.endpoint}")
    private String endpoint;

    public GeminiService(@Qualifier("geminiWebClient") WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<String> getReply(List<Content> conversationHistory) {
        GeminiApiRequest requestBody = new GeminiApiRequest(conversationHistory);

        log.info("Sending request body to Gemini: {}", requestBody);

        return webClient.post()
                .uri(uriBuilder -> uriBuilder.path(endpoint).queryParam("key", apiKey).build())
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(GeminiApiResponse.class)
                .map(response -> Optional.ofNullable(response)
                        .map(GeminiApiResponse::getCandidates)
                        .filter(c -> !c.isEmpty())
                        .map(c -> c.get(0))
                        .map(Candidate::getContent)
                        .map(Content::getParts)
                        .filter(p -> !p.isEmpty())
                        .map(p -> p.get(0))
                        .map(Part::getText)
                        .orElse("No reply generated."));
    }
}