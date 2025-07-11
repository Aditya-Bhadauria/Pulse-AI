
import { VoiceVisualizer } from "./VoiceVisualizer";
import { useState, useEffect } from "react";

interface AIAvatarProps {
  isListening: boolean;
  isSpeaking: boolean;
  isThinking: boolean;
}

export const AIAvatar = ({ isListening, isSpeaking, isThinking }: AIAvatarProps) => {
  const [eyeAnimation, setEyeAnimation] = useState("normal");

  useEffect(() => {
    if (isThinking) {
      const interval = setInterval(() => {
        setEyeAnimation(prev => prev === "blink" ? "normal" : "blink");
      }, 1500);
      return () => clearInterval(interval);
    } else {
      setEyeAnimation("normal");
    }
  }, [isThinking]);

  return (
    <div className="relative flex flex-col items-center">
      
      <div className="relative">
        
        <div 
          className={`
            absolute inset-0 rounded-full transition-all duration-500
            ${isListening 
              ? 'animate-ping bg-blue-400/30 scale-125' 
              : isSpeaking 
                ? 'animate-pulse bg-green-400/30 scale-115' 
                : isThinking
                  ? 'animate-pulse bg-yellow-400/30 scale-110'
                  : 'bg-purple-400/20 scale-105'
            }
          `}
        />
        
        
        <div 
          className={`
            absolute inset-2 rounded-full transition-all duration-300
            ${isListening 
              ? 'animate-pulse bg-blue-400/40 scale-110' 
              : isSpeaking 
                ? 'animate-pulse bg-green-400/40 scale-105' 
                : isThinking
                  ? 'animate-pulse bg-yellow-400/40 scale-105'
                  : 'bg-purple-400/30'
            }
          `}
        />

        
        <div 
          className={`
            relative w-48 h-48 rounded-full flex items-center justify-center
            transition-all duration-500 transform
            ${isListening 
              ? 'bg-gradient-to-br from-blue-500 to-blue-700 scale-110 shadow-2xl shadow-blue-500/50' 
              : isSpeaking 
                ? 'bg-gradient-to-br from-green-500 to-green-700 scale-105 shadow-2xl shadow-green-500/50' 
                : isThinking
                  ? 'bg-gradient-to-br from-yellow-500 to-orange-600 scale-105 shadow-2xl shadow-yellow-500/50'
                  : 'bg-gradient-to-br from-purple-500 to-blue-600 hover:scale-105 shadow-2xl shadow-purple-500/30'
            }
          `}
        >
          
          <div className="relative w-full h-full flex items-center justify-center">
            
            <div className="flex gap-8 mb-4">
              <div 
                className={`
                  w-4 h-4 bg-white rounded-full transition-all duration-200
                  ${eyeAnimation === "blink" ? "scale-y-10 h-1" : ""}
                  ${isListening ? "animate-pulse" : ""}
                `}
              />
              <div 
                className={`
                  w-4 h-4 bg-white rounded-full transition-all duration-200
                  ${eyeAnimation === "blink" ? "scale-y-10 h-1" : ""}
                  ${isListening ? "animate-pulse" : ""}
                `}
              />
            </div>

            
            <div className="absolute bottom-16">
              {isSpeaking ? (
                <div className="w-8 h-3 bg-white rounded-full animate-pulse" />
              ) : isListening ? (
                <div className="w-6 h-2 bg-white rounded-full animate-bounce" />
              ) : isThinking ? (
                <div className="w-4 h-1 bg-white rounded-full" />
              ) : (
                <div className="w-6 h-2 bg-white/70 rounded-full" />
              )}
            </div>

            
            <div 
              className={`
                absolute w-16 h-16 rounded-full transition-all duration-300
                ${isListening 
                  ? 'bg-white/30 animate-spin' 
                  : isSpeaking 
                    ? 'bg-white/40 animate-pulse' 
                    : isThinking
                      ? 'bg-white/30 animate-bounce'
                      : 'bg-white/20'
                }
              `}
            >
              <div className="absolute inset-2 bg-white/40 rounded-full" />
              <div className="absolute inset-4 bg-white/60 rounded-full animate-pulse" />
            </div>
          </div>

          
          {(isListening || isSpeaking) && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`
                    absolute w-1 h-1 rounded-full animate-pulse
                    ${isListening ? 'bg-blue-300' : 'bg-green-300'}
                  `}
                  style={{
                    left: `${50 + 35 * Math.cos((i * 30) * Math.PI / 180)}%`,
                    top: `${50 + 35 * Math.sin((i * 30) * Math.PI / 180)}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      
      {(isListening || isSpeaking) && (
        <div className="mt-8">
          <VoiceVisualizer 
            isActive={isListening || isSpeaking}
            type={isListening ? "listening" : "speaking"}
          />
        </div>
      )}
    </div>
  );
};
