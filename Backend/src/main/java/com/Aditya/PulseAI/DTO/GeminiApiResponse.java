package com.Aditya.PulseAI.DTO;

import java.util.List;

public class GeminiApiResponse {
    private List<Candidate> candidates;

    public List<Candidate> getCandidates() { return candidates; }
    public void setCandidates(List<Candidate> candidates) { this.candidates = candidates; }
}