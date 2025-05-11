const FuturisticGrid = () => {
  return (
    <div className="absolute inset-0 opacity-30">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Horizontal Lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line 
            key={`h-${i}`} 
            x1="0" 
            y1={i * 5} 
            x2="100" 
            y2={i * 5} 
            stroke={i % 5 === 0 ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.1)"} 
            strokeWidth={i % 5 === 0 ? "0.2" : "0.1"} 
          />
        ))}
        
        {/* Vertical Lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line 
            key={`v-${i}`} 
            x1={i * 5} 
            y1="0" 
            x2={i * 5} 
            y2="100" 
            stroke={i % 5 === 0 ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.1)"}
            strokeWidth={i % 5 === 0 ? "0.2" : "0.1"}
          />
        ))}
        
        {/* Accent Lines */}
        <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255, 180, 0, 0.3)" strokeWidth="0.3" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255, 180, 0, 0.3)" strokeWidth="0.3" />
        
        {/* Diagonal Lines for Added Depth */}
        <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="0.2" strokeDasharray="1 10" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="0.2" strokeDasharray="1 10" />
      </svg>
    </div>
  );
};

export default FuturisticGrid;