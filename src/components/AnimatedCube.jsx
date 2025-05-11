import { useRef, useEffect } from 'react';

const AnimatedCube = () => {
  const cubeRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const cube = cubeRef.current;
    const circle = circleRef.current;
    
    // Animation timers and cleanup
    let cubeTimer, waveTimer, orbitTimer;

    if (cube && circle) {
      // Start cube rotation animation
      let rotation = 0;
      cubeTimer = setInterval(() => {
        rotation += 0.8;
        cube.style.transform = `rotateY(${rotation}deg) rotateX(${rotation/3}deg) rotateZ(${rotation/6}deg)`;
      }, 30);
      
      // Wave animation for the neon circles - more dynamic
      let wave = 0;
      waveTimer = setInterval(() => {
        wave += 0.08;
        const waveOffset1 = Math.sin(wave) * 5;
        const waveOffset2 = Math.cos(wave + 1) * 3;
        const waveOffset3 = Math.sin(wave * 1.5) * 4;
        
        document.getElementById('neonCircle1').setAttribute('r', `${70 + waveOffset1}`);
        document.getElementById('neonCircle2').setAttribute('r', `${60 - waveOffset2}`);
        document.getElementById('neonCircle3').setAttribute('r', `${50 + waveOffset3}`);
        
        // Color animation
        const hue1 = (Math.sin(wave * 0.5) * 20 + 40); // Gold to amber hue range
        const hue2 = (Math.cos(wave * 0.3) * 20 + 30); // Amber range
        
        document.getElementById('neonCircle1').setAttribute('stroke', `rgba(255, ${hue1 + 180}, 0, 0.6)`);
        document.getElementById('neonCircle2').setAttribute('stroke', `rgba(255, ${hue2 + 150}, 0, 0.4)`);
      }, 50);
      
      // Orbiting particles animation
      let orbitAngle = 0;
      orbitTimer = setInterval(() => {
        orbitAngle += 0.03;
        
        // Update particle positions
        for (let i = 1; i <= 5; i++) {
          const angle = orbitAngle + (i * Math.PI * 0.4);
          const x = 100 + Math.cos(angle) * 80;
          const y = 100 + Math.sin(angle) * 80;
          const particle = document.getElementById(`particle${i}`);
          if (particle) {
            particle.setAttribute('cx', x.toString());
            particle.setAttribute('cy', y.toString());
            
            // Pulse size based on position
            const pulseSize = 2 + Math.sin(angle * 2) * 1;
            particle.setAttribute('r', pulseSize.toString());
          }
        }
      }, 30);
    }

    return () => {
      clearInterval(cubeTimer);
      clearInterval(waveTimer);
      clearInterval(orbitTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Neon Circle Container with Enhanced Wave Animation */}
      <svg className="absolute w-full h-full" viewBox="0 0 200 200" ref={circleRef}>
        {/* Enhanced Background Glow */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
            <stop offset="50%" stopColor="rgba(255, 200, 0, 0.6)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0.3)" />
          </linearGradient>
          
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
            <stop offset="70%" stopColor="rgba(255, 200, 0, 0.2)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>
        </defs>
        
        {/* Center Glow Effect */}
        <circle 
          cx="100" 
          cy="100" 
          r="30" 
          fill="url(#centerGlow)" 
        />
        
        {/* Animated Neon Circles - More Dynamic */}
        <circle 
          id="neonCircle1" 
          cx="100" 
          cy="100" 
          r="70" 
          fill="none" 
          stroke="rgba(255, 200, 0, 0.6)" 
          strokeWidth="1.5" 
          filter="url(#glow)"
        />
        
        <circle 
          id="neonCircle2" 
          cx="100" 
          cy="100" 
          r="60" 
          fill="none" 
          stroke="rgba(255, 150, 0, 0.4)" 
          strokeWidth="1" 
          filter="url(#glow)"
        />
        
        <circle 
          id="neonCircle3" 
          cx="100" 
          cy="100" 
          r="50" 
          fill="none" 
          stroke="rgba(0, 0, 0, 0.2)" 
          strokeWidth="0.5"
          strokeDasharray="1 3"
        />
        
        {/* Grid Lines within Inner Circle - Added black and white contrast */}
        <line x1="70" y1="100" x2="130" y2="100" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="0.5" />
        <line x1="100" y1="70" x2="100" y2="130" stroke="rgba(0, 0, 0, 0.15)" strokeWidth="0.5" />
        
        {/* Diagonal Grid Lines */}
        <line x1="80" y1="80" x2="120" y2="120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.5" />
        <line x1="120" y1="80" x2="80" y2="120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.5" />
        
        {/* Orbiting Particles - Adding interactive elements */}
        <circle id="particle1" cx="100" cy="20" r="2" fill="white" filter="url(#glow)" />
        <circle id="particle2" cx="180" cy="100" r="2" fill="rgba(255, 200, 0, 0.9)" filter="url(#glow)" />
        <circle id="particle3" cx="100" cy="180" r="2" fill="white" filter="url(#glow)" />
        <circle id="particle4" cx="20" cy="100" r="2" fill="rgba(255, 200, 0, 0.9)" filter="url(#glow)" />
        <circle id="particle5" cx="150" cy="150" r="2" fill="rgba(0, 0, 0, 0.7)" />
      </svg>
      
      {/* Enhanced 3D Cube with Improved Glass & Black/White Effect */}
      <div className="relative w-40 h-40" style={{ perspective: "1000px" }}>
        <div 
          ref={cubeRef}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front face */}
          <div className="absolute w-full h-full bg-gradient-to-br from-white via-amber-300 to-black opacity-70 border border-white border-opacity-50" 
               style={{ transform: "translateZ(40px)" }}></div>
          
          {/* Back face */}
          <div className="absolute w-full h-full bg-gradient-to-tr from-black via-amber-600 to-white opacity-70 border border-white border-opacity-50" 
               style={{ transform: "translateZ(-40px) rotateY(180deg)" }}></div>
          
          {/* Right face */}
          <div className="absolute w-full h-full bg-gradient-to-br from-white via-amber-400 to-gray-800 opacity-70 border border-white border-opacity-50" 
               style={{ transform: "rotateY(90deg) translateZ(40px)" }}></div>
          
          {/* Left face */}
          <div className="absolute w-full h-full bg-gradient-to-tl from-gray-800 via-amber-400 to-white opacity-70 border border-white border-opacity-50" 
               style={{ transform: "rotateY(-90deg) translateZ(40px)" }}></div>
          
          {/* Top face */}
          <div className="absolute w-full h-full bg-gradient-to-tr from-white to-gray-800 opacity-70 border border-white border-opacity-50" 
               style={{ transform: "rotateX(90deg) translateZ(40px)" }}></div>
          
          {/* Bottom face */}
          <div className="absolute w-full h-full bg-gradient-to-br from-gray-800 to-white opacity-70 border border-white border-opacity-50" 
               style={{ transform: "rotateX(-90deg) translateZ(40px)" }}></div>
               
          {/* Inner cube - Adding depth */}
          <div className="absolute w-1/2 h-1/2 top-1/4 left-1/4" style={{ transformStyle: "preserve-3d" }}>
            {/* Inner faces with contrasting colors */}
            <div className="absolute w-full h-full bg-black bg-opacity-80" style={{ transform: "translateZ(10px)" }}></div>
            <div className="absolute w-full h-full bg-white bg-opacity-80" style={{ transform: "translateZ(-10px) rotateY(180deg)" }}></div>
            <div className="absolute w-full h-full bg-amber-500 bg-opacity-80" style={{ transform: "rotateY(90deg) translateZ(10px)" }}></div>
            <div className="absolute w-full h-full bg-amber-300 bg-opacity-80" style={{ transform: "rotateY(-90deg) translateZ(10px)" }}></div>
            <div className="absolute w-full h-full bg-black bg-opacity-80" style={{ transform: "rotateX(90deg) translateZ(10px)" }}></div>
            <div className="absolute w-full h-full bg-white bg-opacity-80" style={{ transform: "rotateX(-90deg) translateZ(10px)" }}></div>
          </div>
        </div>
      </div>
      
      {/* Inner Rotating Elements with Enhanced Contrast */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-3/4 h-3/4" viewBox="0 0 100 100" style={{ animation: "spin 20s linear infinite reverse" }}>
          <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="rgba(0, 0, 0, 0.2)" strokeWidth="0.5" />
          <line x1="50" y1="20" x2="50" y2="80" stroke="rgba(0, 0, 0, 0.2)" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedCube;