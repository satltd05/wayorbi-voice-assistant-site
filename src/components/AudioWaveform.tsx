import React from 'react';

interface AudioWaveformProps {
  isActive: boolean;
  isSpeaking: boolean;
  volumeLevel: number; // 0 to 1
  barsCount?: number;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isActive,
  isSpeaking,
  volumeLevel,
  barsCount = 20,
}) => {
  // Generate bar heights dynamically
  const bars = Array.from({ length: barsCount }, (_, i) => {
    if (!isActive && !isSpeaking) {
      return 15; // base idle height
    }

    if (isActive) {
      // Dynamic height based on volume and sinusoidal wave
      const wave = Math.sin((i / barsCount) * Math.PI * 2 + Date.now() / 200);
      const randomJitter = Math.sin(i * 1.5) * 10;
      const computed = 20 + volumeLevel * 75 + wave * 15 + randomJitter;
      return Math.max(12, Math.min(100, computed));
    }

    if (isSpeaking) {
      // Harmonic voice pulsation
      const wave = Math.sin((i / barsCount) * Math.PI * 3 + Date.now() / 150);
      const computed = 35 + wave * 30 + (i % 3) * 10;
      return Math.max(15, Math.min(95, computed));
    }

    return 15;
  });

  return (
    <div className="flex items-center justify-center gap-1 h-12 px-4 py-2">
      {bars.map((height, idx) => (
        <div
          key={idx}
          className={`w-1 rounded-full transition-all duration-75 ${
            isSpeaking
              ? 'bg-gradient-to-t from-[#6366F1] to-[#A855F7]'
              : isActive
              ? 'bg-gradient-to-t from-[#38BDF8] to-[#3B82F6]'
              : 'bg-white/15'
          }`}
          style={{
            height: `${height}%`,
            opacity: isActive || isSpeaking ? 0.9 : 0.3,
          }}
        />
      ))}
    </div>
  );
};
