package com.Aditya.PulseAI.service;


import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.texttospeech.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.util.Base64;

@Service
public class TextToSpeechService {

    @Value("${google.credentials.path}")
    private String credentialsPath;

    public String synthesizeTextToBase64(String text) throws Exception {

        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(credentialsPath));


        TextToSpeechSettings settings = TextToSpeechSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build();

        try (TextToSpeechClient textToSpeechClient = TextToSpeechClient.create(settings)) {


            SynthesisInput input = SynthesisInput.newBuilder()
                    .setText(text)
                    .build();


            VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
                    .setLanguageCode("en-US")
                    .setName("en-US-Standard-H")
                    .build();


            AudioConfig audioConfig = AudioConfig.newBuilder()
                    .setAudioEncoding(AudioEncoding.MP3)
                    .build();


            SynthesizeSpeechResponse response = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);
            ByteString audioContents = response.getAudioContent();


            return Base64.getEncoder().encodeToString(audioContents.toByteArray());
        }
    }
}
