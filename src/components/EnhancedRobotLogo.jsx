import { useState, useEffect } from 'react';

const EnhancedRobotLogo = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Trigger animation when component mounts
    setAnimate(true);
    
    // Reset animation after it completes for potential replay
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setAnimate(true);
  };
  
  return (
    <div 
      className="w-12 h-12 relative cursor-pointer" 
      onMouseEnter={handleMouseEnter}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-lg"
      >
        {/* Robot Base Shadow */}
        <ellipse cx="50" cy="93" rx="20" ry="5" fill="rgba(0,0,0,0.2)" />
        
        {/* Robot Body */}
        <g className="robot-body">
          {/* Robot Legs */}
          <rect x="40" y="75" width="6" height="15" rx="2" fill="#2D3748" />
          <rect x="54" y="75" width="6" height="15" rx="2" fill="#2D3748" />
          <rect x="38" y="88" width="10" height="4" rx="1" fill="#1E293B" />
          <rect x="52" y="88" width="10" height="4" rx="1" fill="#1E293B" />
          
          {/* Robot Torso */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4B5563" />
            <stop offset="50%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1F2937" />
          </linearGradient>
          <rect x="35" y="48" width="30" height="28" rx="6" fill="url(#bodyGradient)" />
          
          {/* Chest Panel */}
          <rect x="40" y="52" width="20" height="12" rx="2" fill="#E5E7EB" />
          <linearGradient id="panelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9FAFB" />
            <stop offset="100%" stopColor="#E5E7EB" />
          </linearGradient>
          <rect x="42" y="54" width="16" height="8" rx="1" fill="url(#panelGradient)" />
          
          {/* Status Lights */}
          <circle cx="45" cy="58" r="1.5" fill={animate ? "#10B981" : "#6B7280"}>
            {animate && (
              <animate 
                attributeName="fill" 
                values="#6B7280;#10B981;#6B7280" 
                dur="2s" 
                repeatCount="1" 
              />
            )}
          </circle>
          <circle cx="50" cy="58" r="1.5" fill={animate ? "#3B82F6" : "#6B7280"}>
            {animate && (
              <animate 
                attributeName="fill" 
                values="#6B7280;#3B82F6;#6B7280" 
                dur="1.5s" 
                repeatCount="1" 
              />
            )}
          </circle>
          <circle cx="55" cy="58" r="1.5" fill={animate ? "#EC4899" : "#6B7280"}>
            {animate && (
              <animate 
                attributeName="fill" 
                values="#6B7280;#EC4899;#6B7280" 
                dur="2.5s" 
                repeatCount="1" 
              />
            )}
          </circle>
        </g>

        {/* Robot Head */}
        <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4B5563" />
          <stop offset="60%" stopColor="#374151" />
          <stop offset="100%" stopColor="#1F2937" />
        </linearGradient>
        <rect x="30" y="15" width="40" height="35" rx="8" fill="url(#headGradient)" />
        
        {/* Head Shine Effect */}
        <path 
          d="M30,23 Q50,18 70,23" 
          fill="none" 
          stroke="rgba(255,255,255,0.2)" 
          strokeWidth="1"
        />
        
        {/* Robot Face Panel */}
        <linearGradient id="faceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9FAFB" />
          <stop offset="100%" stopColor="#E5E7EB" />
        </linearGradient>
        <rect x="35" y="22" width="30" height="20" rx="4" fill="url(#faceGradient)" />
        
        {/* Robot Eyes */}
        <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <circle 
          cx="43" 
          cy="32" 
          r="4" 
          fill={animate ? "url(#eyeGradient)" : "#1F2937"}
        >
          {animate && (
            <animate 
              attributeName="fill" 
              values="#1F2937;url(#eyeGradient);#1F2937" 
              dur="2s" 
              repeatCount="1" 
            />
          )}
        </circle>
        <circle 
          cx="57" 
          cy="32" 
          r="4" 
          fill={animate ? "url(#eyeGradient)" : "#1F2937"}
        >
          {animate && (
            <animate 
              attributeName="fill" 
              values="#1F2937;url(#eyeGradient);#1F2937" 
              dur="2s" 
              repeatCount="1" 
            />
          )}
        </circle>
        
        {/* Eye Shine */}
        <circle cx="44" cy="31" r="1" fill="white" />
        <circle cx="58" cy="31" r="1" fill="white" />
        
        {/* Robot Mouth */}
        <rect 
          x="42" 
          y="40" 
          width="16" 
          height="1.5" 
          rx="0.75" 
          fill="#1F2937"
        >
          {animate && (
            <animate 
              attributeName="width" 
              values="16;18;16" 
              dur="2s" 
              repeatCount="1" 
            />
          )}
        </rect>
        
        {/* Robot Antenna */}
        <rect x="48" y="8" width="4" height="7" fill="#2D3748" />
        <linearGradient id="antennaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <circle 
          cx="50" 
          cy="7" 
          r="4" 
          fill={animate ? "url(#antennaGradient)" : "#60A5FA"}
        >
          {animate && (
            <animate 
              attributeName="r" 
              values="4;4.5;4" 
              dur="1s" 
              repeatCount="2" 
            />
            )}
        </circle>
        
        {/* Robot Arms */}
        {/* Left Arm */}
        <g transform={`rotate(${animate ? '20' : '0'}, 30, 55)`}>
          {animate && (
            <animateTransform 
              attributeName="transform"
              type="rotate"
              values="0,30,55; 20,30,55; 0,30,55"
              dur="1s"
              repeatCount="2"
            />
          )}
          <rect x="15" y="52" width="20" height="6" rx="3" fill="#374151" />
          <circle cx="15" cy="55" r="3" fill="#1F2937" />
        </g>
        
        {/* Right Arm */}
        <g transform={`rotate(${animate ? '-20' : '0'}, 70, 55)`}>
          {animate && (
            <animateTransform 
              attributeName="transform"
              type="rotate"
              values="0,70,55; -20,70,55; 0,70,55"
              dur="1s"
              repeatCount="2"
            />
          )}
          <rect x="65" y="52" width="20" height="6" rx="3" fill="#374151" />
          <circle cx="85" cy="55" r="3" fill="#1F2937" />
        </g>

        {/* 3D Effects - Highlights and Shadows */}
        <ellipse cx="50" cy="20" rx="18" ry="2" fill="rgba(255,255,255,0.1)" />
        <ellipse cx="50" cy="45" rx="15" ry="2" fill="rgba(0,0,0,0.1)" />
      </svg>
    </div>
  );
};

export default EnhancedRobotLogo;