import React from "react";

function JarvisCircleAnimations() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Outer Rings */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(0, 0, 0, 0.05)"
          strokeWidth="0.2"
          className="animate-spin-slow"
          style={{ animationDuration: "120s" }}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="rgba(0, 0, 0, 0.05)"
          strokeWidth="0.2"
          className="animate-spin-slow"
          style={{ animationDuration: "100s", animationDirection: "reverse" }}
        />
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="rgba(0, 0, 0, 0.07)"
          strokeWidth="0.3"
          strokeDasharray="0.5 0.5"
          className="animate-spin-slow"
          style={{ animationDuration: "80s" }}
        />
      </svg>

      {/* Middle spinning elements */}
      <svg className="absolute w-2/3 h-2/3" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth="0.4"
          strokeDasharray="1 2"
          className="animate-spin-slow"
          style={{ animationDuration: "60s", animationDirection: "reverse" }}
        />
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          stroke="rgba(0, 0, 0, 0.12)"
          strokeWidth="0.4"
          className="animate-spin-slow"
          style={{ animationDuration: "40s" }}
        />
        
        {/* Dashes along the circle - Iron Man HUD style */}
        {Array.from({ length: 36 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="23"
            x2="50"
            y2="21"
            stroke="rgba(0, 0, 0, 0.2)"
            strokeWidth="0.3"
            transform={`rotate(${i * 10} 50 50)`}
            className="origin-center"
          />
        ))}
        
        {/* Adding HUD style elements */}
        <path
          d="M50,30 L53,33 L53,34 L51,36 L49,36 L47,34 L47,33 L50,30"
          fill="none"
          stroke="rgba(252, 211, 77, 0.7)" /* Yellow accent */
          strokeWidth="0.2"
          className="animate-pulse"
          style={{ animationDuration: "3s" }}
        />
        <path
          d="M30,50 L33,53 L34,53 L36,51 L36,49 L34,47 L33,47 L30,50"
          fill="none"
          stroke="rgba(0, 0, 0, 0.15)"
          strokeWidth="0.2"
          className="animate-pulse"
          style={{ animationDuration: "3.5s" }}
        />
        <path
          d="M70,50 L67,53 L66,53 L64,51 L64,49 L66,47 L67,47 L70,50"
          fill="none"
          stroke="rgba(0, 0, 0, 0.15)"
          strokeWidth="0.2"
          className="animate-pulse"
          style={{ animationDuration: "4s" }}
        />
      </svg>

      {/* Inner elements */}
      <svg className="absolute w-1/2 h-1/2" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="rgba(0, 0, 0, 0.15)"
          strokeWidth="0.5"
          strokeDasharray="1 1"
          className="animate-spin-slow"
          style={{ animationDuration: "30s", animationDirection: "reverse" }}
        />
        <circle
          cx="50"
          cy="50"
          r="15"
          fill="none"
          stroke="rgba(252, 211, 77, 0.4)" /* Yellow accent */
          strokeWidth="0.5"
          className="animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        
        {/* Inner hexagon */}
        <polygon
          points="50,40 55,45 55,55 50,60 45,55 45,45"
          fill="none"
          stroke="rgba(0, 0, 0, 0.25)"
          strokeWidth="0.3"
          className="animate-spin-slow"
          style={{ animationDuration: "20s" }}
        />
        
        {/* Center point with pulse */}
        <circle
          cx="50"
          cy="50"
          r="2"
          fill="rgba(252, 211, 77, 0.7)" /* Yellow accent */
          className="animate-pulse"
          style={{ animationDuration: "2s" }}
        />
        
        {/* Small triangular indicators */}
        <polygon
          points="50,35 51,37 49,37"
          fill="rgba(0, 0, 0, 0.4)"
          className="animate-pulse"
          style={{ animationDuration: "3s" }}
        />
        <polygon
          points="50,65 51,63 49,63"
          fill="rgba(0, 0, 0, 0.4)"
          className="animate-pulse"
          style={{ animationDuration: "3.2s" }}
        />
        <polygon
          points="35,50 37,51 37,49"
          fill="rgba(252, 211, 77, 0.7)" /* Yellow accent */
          className="animate-pulse"
          style={{ animationDuration: "3.4s" }}
        />
        <polygon
          points="65,50 63,51 63,49"
          fill="rgba(252, 211, 77, 0.7)" /* Yellow accent */
          className="animate-pulse"
          style={{ animationDuration: "3.6s" }}
        />
      </svg>

      {/* Futuristic scanning lines */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        <line
          x1="0"
          y1="50"
          x2="100"
          y2="50"
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth="0.2"
          className="animate-scan-horizontal"
        />
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="100"
          stroke="rgba(0, 0, 0, 0.1)"
          strokeWidth="0.2"
          className="animate-scan-vertical"
        />
      </svg>

      {/* Randomly positioned small dots */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        {Array.from({ length: 30 }).map((_, i) => {
          const x = 20 + Math.random() * 60;
          const y = 20 + Math.random() * 60;
          const size = 0.1 + Math.random() * 0.3;
          const useYellow = Math.random() > 0.7; // 30% chance for yellow dots
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={size}
              fill={useYellow ? "rgba(252, 211, 77, 0.7)" : "rgba(0, 0, 0, 0.4)"}
              className="animate-pulse"
              style={{
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          );
        })}
      </svg>

      {/* Add data visualization style elements */}
      <svg className="absolute w-full h-full opacity-30" viewBox="0 0 100 100">
        {/* Top right data rectangle block */}
        <rect x="70" y="20" width="15" height="8" rx="1" fill="rgba(250, 250, 250, 0.7)" stroke="rgba(0, 0, 0, 0.3)" strokeWidth="0.2" />
        <line x1="72" y1="22" x2="83" y2="22" stroke="rgba(50, 50, 50, 0.7)" strokeWidth="0.2" />
        <line x1="72" y1="24" x2="78" y2="24" stroke="rgba(50, 50, 50, 0.7)" strokeWidth="0.2" />
        <line x1="72" y1="26" x2="81" y2="26" stroke="rgba(50, 50, 50, 0.7)" strokeWidth="0.2" />
        
        {/* Bottom left data block */}
        <rect x="15" y="70" width="15" height="8" rx="1" fill="rgba(250, 250, 250, 0.7)" stroke="rgba(0, 0, 0, 0.3)" strokeWidth="0.2" />
        <line x1="17" y1="72" x2="28" y2="72" stroke="rgba(50, 50, 50, 0.7)" strokeWidth="0.2" />
        <line x1="17" y1="74" x2="23" y2="74" stroke="rgba(50, 50, 50, 0.7)" strokeWidth="0.2" />
        <line x1="17" y1="76" x2="26" y2="76" stroke="rgba(50, 50, 50, 0.7)" strokeWidth="0.2" />
        
        {/* Futuristic data panels that appear and disappear */}
        <g className="animate-fadeInOut" style={{ animationDuration: '8s' }}>
          <rect x="10" y="10" width="10" height="5" rx="1" fill="rgba(30, 30, 30, 0.8)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.2" />
          <line x1="12" y1="12" x2="18" y2="12" stroke="rgba(220, 220, 220, 0.6)" strokeWidth="0.2" />
          <line x1="12" y1="14" x2="16" y2="14" stroke="rgba(220, 220, 220, 0.6)" strokeWidth="0.2" />
        </g>
        <g className="animate-fadeInOut" style={{ animationDuration: '12s', animationDelay: '4s' }}>
          <rect x="80" y="80" width="10" height="5" rx="1" fill="rgba(30, 30, 30, 0.8)" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.2" />
          <line x1="82" y1="82" x2="88" y2="82" stroke="rgba(220, 220, 220, 0.6)" strokeWidth="0.2" />
          <line x1="82" y1="84" x2="86" y2="84" stroke="rgba(220, 220, 220, 0.6)" strokeWidth="0.2" />
        </g>
      </svg>
    </div>
  );
}

export default JarvisCircleAnimations;