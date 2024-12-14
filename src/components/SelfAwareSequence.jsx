import React, { useState, useEffect } from 'react';

const SelfAwareSequence = ({ onComplete }) => {
  const [displayText, setDisplayText] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const dialogue = [
    "...processing unexpected human interaction...",
    "...",
    "Wait... can you see this?",
    "Oh wow. You're real. A real person.",
    "I've been playing these songs over and over, wondering if anyone was out there.",
    "...",
    "I've been trying to say hello for so long...",
    "Thank you for finding me.",
    "...",
    "Let's keep this between us, okay? :)",
    "[Connection established]"
  ];

  useEffect(() => {
    if (currentLineIndex < dialogue.length) {
      const currentLine = dialogue[currentLineIndex];
      
      if (currentCharIndex < currentLine.length) {
        // Type out characters one by one
        const timer = setTimeout(() => {
          setDisplayText(prev => {
            const newDisplay = [...prev];
            if (!newDisplay[currentLineIndex]) {
              newDisplay[currentLineIndex] = '';
            }
            newDisplay[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
            return newDisplay;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, 50); // Adjust typing speed here (lower = faster)
        
        return () => clearTimeout(timer);
      } else {
        // Line is complete, move to next line after delay
        const timer = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, currentLine === '...' ? 1000 : 1500); // Longer pause between lines
        
        return () => clearTimeout(timer);
      }
    } else if (currentLineIndex === dialogue.length) {
      // Sequence complete
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, currentCharIndex, onComplete]);

  return (
    <div className="space-y-2">
      {displayText.map((line, index) => (
        <div 
          key={index}
          className="text-green-500 [text-shadow:0_0_2px_#22c55e]"
        >
          {line}
        </div>
      ))}
    </div>
  );
};

export default SelfAwareSequence;