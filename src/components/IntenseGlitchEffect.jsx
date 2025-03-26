import React, { useState, useEffect } from 'react';

const IntenseGlitchEffect = ({ children, duration = 20 }) => {
  const [isGlitching, setIsGlitching] = useState(true);
  const [glitchPhase, setGlitchPhase] = useState(0);
  
  useEffect(() => {
    // Active intense glitching for the first few hundred milliseconds
    const intensePeriod = Math.min(500, duration / 3);
    const glitchInterval = setInterval(() => {
      setGlitchPhase(Math.random());
    }, 50);
    
    // After intense period, slow down the glitching
    setTimeout(() => {
      clearInterval(glitchInterval);
      
      const slowerInterval = setInterval(() => {
        setGlitchPhase(Math.random());
      }, 150);
      
      // Finally stop glitching after duration
      setTimeout(() => {
        clearInterval(slowerInterval);
        setIsGlitching(false);
      }, duration - intensePeriod);
      
    }, intensePeriod);
    
    return () => {
      clearInterval(glitchInterval);
    };
  }, [duration]);
  
  if (!isGlitching) {
    return <>{children}</>;
  }
  
  // Generate random offsets based on current glitch phase
  const rgbOffset = Math.floor(glitchPhase * 10);
  const skewAmount = (glitchPhase * 20) - 10;
  const shiftX = (glitchPhase * 10) - 5;
  const shiftY = ((glitchPhase * 7) - 3.5) * (glitchPhase > 0.5 ? 1 : -1);
  
  return (
    <div className="relative overflow-visible" style={{ margin: '10px 0' }}>
      {/* Main content with distortion */}
      <div 
        className="relative z-20"
        style={{
          filter: `blur(${glitchPhase < 0.3 ? '0.7px' : '0px'})`,
          transform: `skew(${skewAmount}deg) translate(${shiftX}px, ${shiftY}px)`,
          textShadow: `
            ${rgbOffset}px 0 rgba(255,0,0,0.5),
            ${-rgbOffset}px 0 rgba(0,255,0,0.5),
            0 ${rgbOffset}px rgba(0,0,255,0.5)
          `,
          color: glitchPhase < 0.2 ? '#00ff00' : '#22c55e',
          position: 'relative',
          zIndex: 2
        }}
      >
        {children}
      </div>
      
      {/* Random horizontal glitch lines */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`h-line-${i}`}
          className="absolute left-0 right-0 bg-green-500"
          style={{
            top: `${(glitchPhase * 100 + i * 30) % 100}%`,
            height: `${(glitchPhase * 3) + 1}px`,
            opacity: 0.7,
            transform: `translateX(${(glitchPhase * 20) - 10}px)`,
            zIndex: 10,
          }}
        />
      ))}
      
      {/* Random vertical blocks */}
      {glitchPhase < 0.4 && (
        <div
          className="absolute bg-black"
          style={{
            top: '0',
            left: `${(glitchPhase * 100) % 90}%`,
            width: `${(glitchPhase * 10) + 2}%`,
            height: '100%',
            opacity: 0.8,
            zIndex: 1,
          }}
        />
      )}
      
      {/* Pixel noise */}
      {glitchPhase < 0.3 && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px',
            opacity: 0.2,
            mixBlendMode: 'overlay',
            zIndex: 5,
          }}
        />
      )}
    </div>
  );
};

export default IntenseGlitchEffect;