import React, { useEffect, useState } from "react";

function AudioWaveAnimations({ isAnimating = false }) {
  // State to track wave intensity
  const [waveIntensity, setWaveIntensity] = useState(0);
  
  // Effect to animate wave intensity when message is being shown
  useEffect(() => {
    if (isAnimating) {
      // Create a pulsing effect for the waves
      const interval = setInterval(() => {
        setWaveIntensity(prev => {
          const newValue = prev + (Math.random() * 0.2 - 0.1);
          return Math.max(0.3, Math.min(newValue, 1));
        });
      }, 150);
      
      return () => clearInterval(interval);
    } else {
      // Reset to minimal waves when not animating
      setWaveIntensity(0.3);
    }
  }, [isAnimating]);

  // Generate wave points for SVG paths
  const generateWavePath = (radius, amplitude, frequency, offset = 0) => {
    const points = [];
    const adjustedAmplitude = amplitude * waveIntensity;
    
    for (let i = 0; i <= 360; i += 5) {
      const angle = (i * Math.PI) / 180;
      const wave = Math.sin((angle * frequency) + offset) * adjustedAmplitude;
      const x = 50 + (radius + wave) * Math.cos(angle);
      const y = 50 + (radius + wave) * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    
    return `M${points.join(" L")} Z`;
  };

  // Generate RGB gradient values
  const getRgbColor = (index, opacity = 1) => {
    const colors = [
      `rgba(252, 70, 107, ${opacity})`, // Pink/Red
      `rgba(63, 94, 251, ${opacity})`,  // Blue
      `rgba(11, 235, 117, ${opacity})`,  // Green
      `rgba(252, 211, 77, ${opacity})`,  // Yellow
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Base grid pattern */}
      <svg className="absolute w-full h-full opacity-10" viewBox="0 0 100 100">
        <defs>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="black" strokeWidth="0.1" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>

      {/* Audio wave circles - outer rings */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="neonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={getRgbColor(0, 0.7)} />
            <stop offset="50%" stopColor={getRgbColor(1, 0.7)} />
            <stop offset="100%" stopColor={getRgbColor(2, 0.7)} />
          </linearGradient>
          <linearGradient id="neonGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={getRgbColor(2, 0.6)} />
            <stop offset="50%" stopColor={getRgbColor(3, 0.6)} />
            <stop offset="100%" stopColor={getRgbColor(0, 0.6)} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer audio waves with dynamic generation */}
        <path
          d={generateWavePath(40, 3, 6, 0)}
          fill="none"
          stroke="url(#neonGradient1)"
          strokeWidth="0.3"
          filter="url(#glow)"
          opacity={0.2 + (waveIntensity * 0.5)}
          className="transition-all duration-300"
        />
        <path
          d={generateWavePath(35, 2.5, 8, Math.PI/4)}
          fill="none"
          stroke="url(#neonGradient2)"
          strokeWidth="0.25"
          filter="url(#glow)"
          opacity={0.2 + (waveIntensity * 0.5)}
          className="transition-all duration-300"
        />
        
        {/* Middle pulse rings */}
        {[0, 1, 2, 3].map((ring) => (
          <circle
            key={`pulse-${ring}`}
            cx="50"
            cy="50"
            r={15 + (ring * 5)}
            fill="none"
            stroke={getRgbColor(ring, 0.1 + (waveIntensity * 0.2))}
            strokeWidth="0.2"
            className="animate-pulse"
            style={{ 
              animationDuration: `${3 + ring * 0.5}s`,
              animationDelay: `${ring * 0.2}s`
            }}
          />
        ))}
      </svg>

      {/* Middle audio visualization waves */}
      <svg className="absolute w-2/3 h-2/3" viewBox="0 0 100 100">
        {[0, 1, 2].map((wave) => (
          <path
            key={`wave-${wave}`}
            d={generateWavePath(25 - (wave * 5), 1.5, 10 + (wave * 2), wave * Math.PI/2)}
            fill="none"
            stroke={getRgbColor(wave + 1, 0.5 + (waveIntensity * 0.3))}
            strokeWidth="0.3"
            opacity={0.3 + (waveIntensity * 0.5)}
            className="transition-all duration-200"
          />
        ))}
        
        {/* Dashed circular pattern */}
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="rgba(0, 0, 0, 0.15)"
          strokeWidth="0.4"
          strokeDasharray="1 2"
          className="animate-spin-slow"
          style={{ animationDuration: "60s", animationDirection: "reverse" }}
        />
      </svg>

      {/* Inner audio visualization elements */}
      <svg className="absolute w-1/2 h-1/2" viewBox="0 0 100 100">
        {/* Dynamic audio bar visualization */}
        <g className="transform-origin-center" style={{ transform: "translateX(50px) translateY(50px)" }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const barHeight = 5 + (Math.sin(i * 0.5 + Date.now() * 0.001) + 1) * 5 * waveIntensity;
            const x = Math.cos(angle) * 10;
            const y = Math.sin(angle) * 10;
            
            return (
              <rect 
                key={`bar-${i}`}
                x={x - 0.5}
                y={y - 0.5}
                width="1"
                height={barHeight}
                fill={getRgbColor(i % 4, 0.7)}
                transform={`rotate(${i * 30} ${x} ${y})`}
                className="transition-all duration-150"
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
            );
          })}
        </g>
        
        {/* Central element */}
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="none"
          stroke="rgba(255, 255, 255, 0.8)"
          strokeWidth="0.3"
          className="animate-pulse"
          style={{ animationDuration: "2s" }}
        />
        <circle
          cx="50"
          cy="50"
          r="5"
          fill="none"
          stroke={getRgbColor(0, 0.8)}
          strokeWidth="0.3"
          className="animate-pulse"
          style={{ animationDuration: "1.5s" }}
        />
        <circle
          cx="50"
          cy="50"
          r={3 + waveIntensity * 1.5}
          fill={getRgbColor(0, 0.2 + waveIntensity * 0.3)}
          stroke={getRgbColor(0, 0.8)}
          strokeWidth="0.5"
          className="transition-all duration-150"
        />
      </svg>

      {/* 3D effect overlays */}
      <svg className="absolute w-full h-full pointer-events-none" viewBox="0 0 100 100">
        {/* Add subtle background texture */}
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill="url(#noise)"
          opacity="0.05"
        />
        
        {/* Add subtle vignette for depth */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="85%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
        </radialGradient>
        <rect x="0" y="0" width="100" height="100" fill="url(#vignette)" />
      </svg>

      {/* Tech overlay elements */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        {/* Small futuristic UI elements */}
        <g className="opacity-40">
          <rect x="10" y="10" width="6" height="3" rx="0.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="0.2" />
          <line x1="11" y1="11.5" x2="15" y2="11.5" stroke="rgba(252, 211, 77, 0.8)" strokeWidth="0.2" />
          
          <rect x="84" y="10" width="6" height="3" rx="0.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="0.2" />
          <line x1="85" y1="11.5" x2="89" y2="11.5" stroke="rgba(252, 211, 77, 0.8)" strokeWidth="0.2" />
          
          <rect x="10" y="87" width="6" height="3" rx="0.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="0.2" />
          <line x1="11" y1="88.5" x2="15" y2="88.5" stroke="rgba(252, 70, 107, 0.8)" strokeWidth="0.2" />
          
          <rect x="84" y="87" width="6" height="3" rx="0.5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="0.2" />
          <line x1="85" y1="88.5" x2="89" y2="88.5" stroke="rgba(63, 94, 251, 0.8)" strokeWidth="0.2" />
        </g>
          
        {/* Sound indicator lines */}
        <g className="opacity-30">
          {Array.from({ length: 5 }).map((_, i) => {
            const height = 2 + (i * 1.5) * waveIntensity;
            return (
              <rect
                key={`indicator-left-${i}`}
                x={20 + i * 1.5}
                y={50 - height/2}
                width="0.7"
                height={height}
                rx="0.2"
                fill={getRgbColor(i % 4, 0.8)}
                className="transition-all duration-150"
              />
            );
          })}
          
          {Array.from({ length: 5 }).map((_, i) => {
            const height = 2 + (i * 1.5) * waveIntensity;
            return (
              <rect
                key={`indicator-right-${i}`}
                x={73 + i * 1.5}
                y={50 - height/2}
                width="0.7"
                height={height}
                rx="0.2"
                fill={getRgbColor(i % 4, 0.8)}
                className="transition-all duration-150"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default AudioWaveAnimations;