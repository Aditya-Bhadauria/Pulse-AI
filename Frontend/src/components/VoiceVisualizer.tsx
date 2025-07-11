
interface VoiceVisualizerProps {
  isActive: boolean;
  type: "listening" | "speaking";
}

export const VoiceVisualizer = ({ isActive, type }: VoiceVisualizerProps) => {
  const bars = Array.from({ length: 7 }, (_, i) => i);

  return (
    <div className="flex items-end gap-1 h-12">
      {bars.map((bar) => (
        <div
          key={bar}
          className={`
            w-2 rounded-full transition-all duration-150
            ${type === "listening" 
              ? "bg-blue-400" 
              : "bg-green-400"
            }
            ${isActive ? "animate-pulse" : ""}
          `}
          style={{
            height: isActive 
              ? `${20 + Math.random() * 30}px`
              : "8px",
            animationDelay: `${bar * 0.1}s`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};
