import React, { useState, useEffect } from 'react';

const TypingText = ({ text, onComplete, speed = 30, audioManager }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    const typeNextCharacter = async () => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        
        if (audioManager) {
          try {
            if (audioManager.context.state === 'suspended') {
              await audioManager.context.resume();
            }
            audioManager.playTypingSound();
          } catch (err) {
            console.error('Error playing typing sound:', err);
          }
        }
      } else {
        setIsComplete(true);
        onComplete && onComplete();
      }
    };

    // Calculate delay based on character
    let delay = speed;
    if (currentIndex > 0) {
      const currentChar = text[currentIndex - 1];
      if (currentChar === '.' || currentChar === '!' || currentChar === '?') {
        delay = speed * 8; // Longer pause after sentences
      } else if (currentChar === ',' || currentChar === ';') {
        delay = speed * 4; // Medium pause after clauses
      } else if (currentChar === '\n') {
        delay = speed * 12; // Even longer pause at paragraphs
      }
    }

    const timeout = setTimeout(typeNextCharacter, delay);
    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, onComplete, audioManager]);

  // Reset states when text prop changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  return (
    <div className="whitespace-pre-wrap">
      {displayedText}
      {!isComplete && (
        <span className="animate-[blink_1s_step-end_infinite] ml-0.5">▋</span>
      )}
    </div>
  );
};

export default TypingText;