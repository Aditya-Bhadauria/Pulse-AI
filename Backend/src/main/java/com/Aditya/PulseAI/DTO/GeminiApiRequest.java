package com.Aditya.PulseAI.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class GeminiApiRequest {

    @JsonProperty("contents")
    private List<Content> contents;

    public GeminiApiRequest(List<Content> contents) {
        this.contents = contents;
    }

    public List<Content> getContents() {
        return contents;
    }

    public void setContents(List<Content> contents) {
        this.contents = contents;
    }

    @Override
    public String toString() {
        return "GeminiApiRequest{" +
                "contents=" + contents +
                '}';
    }
}
