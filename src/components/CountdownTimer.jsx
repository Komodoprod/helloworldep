import React, { useState, useEffect } from 'react';
import TextGlitchEffect from './TextGlitchEffect';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    // Target date: March 28, 2025 at midnight Paris time (GMT+1)
    const targetDate = new Date('March 28, 2025 00:00:00 GMT+0100');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    };
    
    // Update immediately
    setTimeLeft(calculateTimeLeft());
    
    // Set up interval to update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, []);
  
  // Format numbers to always be two digits
  const format = (num) => num.toString().padStart(2, '0');
  
  return (
    <div className="fixed top-4 left-0 right-0 z-50 text-center">
      <div className="inline-block px-4 py-2 bg-black/70 rounded crt-text crt-jitter">
        <TextGlitchEffect>
          <div className="text-sm text-green-500 mb-1">KOMODO - HELLO, WORLD!</div>
          <div className="font-mono text-green-400 font-bold">
            {timeLeft.days}D : {format(timeLeft.hours)}H : {format(timeLeft.minutes)}M : {format(timeLeft.seconds)}S
          </div>
        </TextGlitchEffect>
      </div>
    </div>
  );
};

export default CountdownTimer;