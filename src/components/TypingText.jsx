import React, { useState, useEffect, useRef } from 'react';

const TypingText = ({ text, onComplete, speed = 30, audioManager }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (!text) return;

    const typeNextCharacter = async () => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        
        // Trigger scroll after text update
        setTimeout(() => {
          if (textRef.current) {
            // Find the closest scrollable parent
            let scrollableParent = textRef.current.parentElement;
            while (
              scrollableParent && 
              !(scrollableParent.scrollHeight > scrollableParent.clientHeight && 
                window.getComputedStyle(scrollableParent).overflowY !== 'hidden')
            ) {
              scrollableParent = scrollableParent.parentElement;
            }
            
            // Scroll the parent to show the bottom of this text
            if (scrollableParent) {
              scrollableParent.scrollTop = scrollableParent.scrollHeight;
            }
          }
        }, 10);
        
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
    <div 
      className="whitespace-pre-wrap"
      translate="no"
      ref={textRef}
    >
      {displayedText}
      {!isComplete && (
        <span className="animate-[blink_1s_step-end_infinite] ml-0.5">▋</span>
      )}
    </div>
  );
};

export default TypingText;