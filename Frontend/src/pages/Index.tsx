'use client'

import { AIAvatar } from "@/components/AIAvatar";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { useState, useRef } from "react";

const Index = () => {
  const [sessionId, setSessionId] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState('');
  const [aiReply, setAiReply] = useState('');

  const recognitionRef = useRef(null);

  const startRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser doesn't support voice recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setCurrentSpeech('');
      setAiReply('');
    };

    recognition.onresult = event => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          handleSendMessage(transcript);
        } else {
          interimTranscript += transcript;
        }
      }
      setCurrentSpeech(interimTranscript);
    };

    recognition.onerror = event => {
      console.error("Recognition error:", event.error);
      alert("Voice recognition error: " + event.error);
      stopConversation();
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopConversation = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    setIsThinking(false);
    setIsSpeaking(false);
    setCurrentSpeech('');
  };

  const handleSendMessage = async (message) => {
  if (!message.trim()) {
    startRecognition();
    return;
  }

  setIsListening(false);
  setIsThinking(true);

  try {
    const response = await fetch('http://localhost:8080/api/chat/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, message })
    });

    if (!response.ok) throw new Error('Failed to fetch response');

    const data = await response.json();
    if (!sessionId) setSessionId(data.sessionId);

    const audio = new Audio(`data:audio/mp3;base64,${data.audioBase64}`);

    setIsThinking(false);
    setIsSpeaking(true);

    
    audio.onloadedmetadata = () => {
      const totalDuration = audio.duration * 1000;
      const textLength = data.replyText.length;
      const intervalTime = totalDuration / textLength;

      let replyText = '';
      let i = 0;

      
      const typeInterval = setInterval(() => {
        if (i < textLength) {
          replyText += data.replyText[i];
          setAiReply(replyText);
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, intervalTime);

      audio.play();
    };

    audio.onended = () => {
      setIsSpeaking(false);
      setAiReply('');
      startRecognition();
    };

  } catch (error) {
    console.error("Error:", error);
    alert("Failed to get reply. Please try again.");
    stopConversation();
  }
};

  const handleStartListening = () => {
    startRecognition();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Pulse-AI
        </h1>
        <p className="text-slate-300 mb-12 text-lg">
          Your intelligent companion ready to listen and respond
        </p>

        
        <div className="mb-12">
          <AIAvatar
            isListening={isListening}
            isSpeaking={isSpeaking}
            isThinking={isThinking}
          />
        </div>

        
        <div className="mb-8 h-8">
          {isListening && (
            <p className="text-blue-400 text-xl font-medium animate-pulse">
              Listening... {currentSpeech}
            </p>
          )}
          {isThinking && (
            <p className="text-yellow-400 text-xl font-medium animate-pulse">
              Thinking...
            </p>
          )}
          {!isListening && !isThinking && !isSpeaking && (
            <p className="text-slate-400 text-lg">
              Ready to chat
            </p>
          )}
        </div>

        
        <div className="flex gap-4 justify-center">
          <Button
            onClick={isListening ? stopConversation : handleStartListening}
            disabled={isThinking || isSpeaking}
            className={`
              relative px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300
              ${isListening
                ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/25'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
              transform hover:scale-105 active:scale-95
            `}
          >
            {isListening ? (
              <>
                <MicOff className="w-5 h-5 mr-2" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                Start Conversation
              </>
            )}
          </Button>

          {isSpeaking && (
            <Button
              variant="outline"
              className="px-6 py-4 text-lg rounded-full border-green-400 text-green-400 hover:bg-green-400/10 transition-all duration-300"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Speaking
            </Button>
          )}
        </div>
      </div>

     
      {isSpeaking && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-2xl font-bold px-6 py-3 rounded-xl shadow-lg max-w-3xl w-fit text-center z-50">
          {aiReply}
        </div>
      )}
    </div>
  );
};

export default Index;
