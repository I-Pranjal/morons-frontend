// CircleAnimations.jsx
import { useEffect, useRef } from 'react';

export default function CircleAnimations() {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    let particles = [];
    
    // Initialize particles
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 100 + Math.random() * 150;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      particles.push({
        x,
        y,
        size: 0.5 + Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: 0.1 + Math.random() * 0.3,
        hue: 180 + Math.random() * 20, // Cyan-blue hues
      });
    }
    
    const animate = () => {
      const ctx = container.getContext('2d');
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Draw circles
      drawCircle(ctx, centerX, centerY, 200, 'rgba(6, 182, 212, 0.05)', 1);
      drawCircle(ctx, centerX, centerY, 180, 'rgba(6, 182, 212, 0.05)', 1); 
      drawCircle(ctx, centerX, centerY, 160, 'rgba(6, 182, 212, 0.07)', 1);
      drawCircle(ctx, centerX, centerY, 140, 'rgba(6, 182, 212, 0.08)', 1);
      drawDashedCircle(ctx, centerX, centerY, 120, 'rgba(6, 182, 212, 0.1)', 1, 5, 10);
      drawDashedCircle(ctx, centerX, centerY, 100, 'rgba(6, 182, 212, 0.12)', 1, 2, 5);
      drawCircle(ctx, centerX, centerY, 80, 'rgba(6, 182, 212, 0.15)', 1);
      drawPulsingCircle(ctx, centerX, centerY, 60, 'rgba(6, 182, 212, 0.2)', 1);
      
      // Draw center
      drawCircle(ctx, centerX, centerY, 5, 'rgba(6, 182, 212, 0.3)', 2);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        const distance = Math.sqrt(
          Math.pow(particle.x - centerX, 2) + 
          Math.pow(particle.y - centerY, 2)
        );
        
        if (distance > 250) {
          // Reset to a random position on the circle
          const angle = Math.random() * Math.PI * 2;
          const radius = 100 + Math.random() * 100;
          particle.x = centerX + Math.cos(angle) * radius;
          particle.y = centerY + Math.sin(angle) * radius;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 50%, ${particle.opacity})`;
        ctx.fill();
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize canvas
    container.width = rect.width;
    container.height = rect.height;
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Helper functions for drawing
  const drawCircle = (ctx, x, y, radius, color, lineWidth) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };
  
  const drawDashedCircle = (ctx, x, y, radius, color, lineWidth, dashLen, gapLen) => {
    ctx.beginPath();
    ctx.setLineDash([dashLen, gapLen]);
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash
  };
  
  const drawPulsingCircle = (ctx, x, y, radius, color, lineWidth) => {
    // Calculate pulsing effect based on time
    const pulse = Math.sin(Date.now() * 0.002) * 5;
    drawCircle(ctx, x, y, radius + pulse, color, lineWidth);
  };

  return (
    <canvas 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-0"
      style={{ opacity: 0.8 }}
    />
  );
}