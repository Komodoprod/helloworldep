import React, { useState, useEffect } from 'react';

const EnhancedCRTGlitchEffect = () => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchType, setGlitchType] = useState(0);
  const [textGlitch, setTextGlitch] = useState(false);
  const [offsetGlitch, setOffsetGlitch] = useState(false);
  
  useEffect(() => {
    // Random glitch timing function
    const randomGlitch = () => {
      // Determine if a glitch should occur (rare)
      const shouldGlitch = Math.random() < 0.15; // 15% chance
      
      if (shouldGlitch) {
        // Set a random glitch type (1-4)
        setGlitchType(Math.floor(Math.random() * 4) + 1);
        setIsGlitching(true);
        
        // 30% chance of text glitch
        if (Math.random() < 0.3) {
          setTextGlitch(true);
          setTimeout(() => {
            setTextGlitch(false);
          }, Math.random() * 100 + 50);
        }
        
        // 20% chance of offset glitch
        if (Math.random() < 0.2) {
          setOffsetGlitch(true);
          setTimeout(() => {
            setOffsetGlitch(false);
          }, Math.random() * 150 + 50);
        }
        
        // Glitch duration between 50ms and 300ms
        const glitchDuration = Math.random() * 250 + 50;
        
        setTimeout(() => {
          setIsGlitching(false);
        }, glitchDuration);
      }
      
      // Schedule next potential glitch
      const nextCheck = Math.random() * 10000 + 3000; // 3-13 seconds
      setTimeout(randomGlitch, nextCheck);
    };
    
    // Start the glitch check cycle
    const initialDelay = Math.random() * 5000 + 3000; // Initial 3-8 second delay
    const timer = setTimeout(randomGlitch, initialDelay);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Global text distortion effect
  if (textGlitch) {
    return (
      <div 
        className="absolute inset-0 pointer-events-none z-50"
        style={{
          transform: `skewX(${Math.random() * 3 - 1.5}deg)`,
          animation: 'textJitter 0.05s infinite',
        }}
      />
    );
  }
  
  // Global offset effect
  if (offsetGlitch) {
    return (
      <div 
        className="absolute inset-0 pointer-events-none z-50"
        style={{
          boxShadow: `
            ${Math.random() * 10 - 5}px 0 0 rgba(255,0,0,0.2),
            ${Math.random() * 10 - 5}px 0 0 rgba(0,255,0,0.2),
            ${Math.random() * 10 - 5}px 0 0 rgba(0,0,255,0.2)
          `,
        }}
      />
    );
  }
  
  if (!isGlitching) return null;
  
  // Different glitch effects
  switch (glitchType) {
    case 1: // Horizontal line glitch
      return (
        <div 
          className="absolute left-0 right-0 bg-green-500 pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            height: `${Math.random() * 5 + 1}px`,
            opacity: 0.5,
            zIndex: 10,
          }}
        />
      );
      
    case 2: // Screen shift glitch
      return (
        <div 
          className="absolute inset-0 bg-transparent pointer-events-none"
          style={{
            boxShadow: `
              ${Math.random() * 10 - 5}px 0 0 rgba(255,0,0,0.15),
              ${Math.random() * 10 - 5}px 0 0 rgba(0,255,0,0.15),
              ${Math.random() * 10 - 5}px 0 0 rgba(0,0,255,0.15)
            `,
            zIndex: 10,
          }}
        />
      );
      
    case 3: // Noise block glitch
      return (
        <div 
          className="absolute pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 40 + 5}%`,
            height: `${Math.random() * 40 + 5}%`,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
            opacity: 0.5,
            zIndex: 10,
          }}
        />
      );
    
    case 4: // Text scramble block
      const top = Math.random() * 80 + 10;
      const left = Math.random() * 80 + 10;
      return (
        <div 
          className="absolute bg-black pointer-events-none"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${Math.random() * 30 + 10}%`,
            height: `${Math.random() * 10 + 2}%`,
            transform: `skewX(${Math.random() * 20 - 10}deg)`,
            opacity: 0.7,
            zIndex: 10,
          }}
        />
      );
      
    default:
      return null;
  }
};

export default EnhancedCRTGlitchEffect;