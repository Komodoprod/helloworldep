import React, { useState, useEffect } from 'react';

const TextGlitchEffect = ({ children }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    const triggerGlitch = () => {
      const shouldGlitch = Math.random() < 0.05; // 5% chance
      
      if (shouldGlitch) {
        setIsGlitching(true);
        
        setTimeout(() => {
          setIsGlitching(false);
        }, Math.random() * 150 + 50);
      }
      
      const nextCheck = Math.random() * 8000 + 2000; // 2-10 seconds
      setTimeout(triggerGlitch, nextCheck);
    };
    
    const timer = setTimeout(triggerGlitch, Math.random() * 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isGlitching) {
    // Apply text distortion effects
    return (
      <span 
        className="inline-block"
        style={{
          filter: 'blur(0.5px)',
          transform: `skewX(${Math.random() * 5 - 2.5}deg)`,
          animation: 'textJitter 0.05s steps(2) infinite',
          textShadow: '2px 0 #22c55e80, -2px 0 #22c55e80'
        }}
      >
        {children}
      </span>
    );
  }
  
  return <>{children}</>;
};

export default TextGlitchEffect;