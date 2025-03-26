// MobileTerminal.jsx - Updated Component with Fixes

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Send, X, Terminal } from 'lucide-react';
import TypingText from './TypingText';
import { processEasterEgg, fireflyCSS } from './EasterEggs';
import TextGlitchEffect from './TextGlitchEffect';
import EnhancedCRTGlitchEffect from './EnhancedCRTGlitchEffect';

const MobileTerminal = ({ 
  output, 
  onCommandSubmit, 
  availableCommands,
  isPlaying,
  language,
  audioManager 
}) => {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState('');
  const [trackName, setTrackName] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [displayedOutput, setDisplayedOutput] = useState([]);
  const [customCommand, setCustomCommand] = useState('');
  const [isCustomCommand, setIsCustomCommand] = useState(false);
  
  // Create and apply fireflyCSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = fireflyCSS;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const outputContainerRef = useRef(null);
  const initRef = useRef(false);
  const scrollToBottomTimeoutRef = useRef(null);

  const commandGroups = {
    tracks: ['PLAY', 'STORY', 'CREDITS'],
    system: ['HELP', 'ABOUT', 'TRACKLIST', 'CLEAR', 'STOP'],
    language: ['FR', 'EN'],
    custom: ['CUSTOM COMMAND']
  };

  // Enhanced scroll to bottom function
  const scrollToBottom = () => {
    // Clear any existing timeout to avoid multiple scrolls
    if (scrollToBottomTimeoutRef.current) {
      clearTimeout(scrollToBottomTimeoutRef.current);
    }
    
    // Set a small timeout to ensure content is rendered before scrolling
    scrollToBottomTimeoutRef.current = setTimeout(() => {
      if (outputContainerRef.current) {
        const scrollElement = outputContainerRef.current;
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }, 50); // Small delay to ensure rendering is complete
  };

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    scrollToBottom();
  }, [displayedOutput]);

  useEffect(() => {
    const initMessages = [
      { message: 'Initializing...', delay: 1000 },
      { message: 'HELLO, WORLD!', delay: 1500 },
      { message: 'Select HELP for available commands.', delay: 1000 }
    ];

    const displayInitSequence = async () => {
      if (initRef.current) return;
      initRef.current = true;

      for (const { message, delay } of initMessages) {
        await new Promise(resolve => setTimeout(resolve, delay));
        setDisplayedOutput(prev => [
          ...prev, 
          {
            type: 'system', 
            content: <div className="w-full text-left">
              <TypingText text={message} speed={30} audioManager={audioManager} />
            </div>
          }
        ]);
        // Ensure scroll after each message
        scrollToBottom();
      }
      setIsInitialized(true);
    };

    displayInitSequence();
  }, [audioManager]);

  useEffect(() => {
    if (audioManager && !isInitialized) {
      try {
        audioManager.context.resume().then(() => {
          audioManager.startAmbient();
        });
      } catch (err) {
        console.error('Error starting ambient sound:', err);
      }
    }
  }, [audioManager, isInitialized]);

  useEffect(() => {
    if (isInitialized && output.length > 0) {
      setDisplayedOutput(prev => {
        const newOutput = [...prev, ...output];
        // Ensure scroll when new output is added
        setTimeout(scrollToBottom, 50);
        return newOutput;
      });
    }
  }, [output, isInitialized]);

  const handleCommandSelect = (command) => {
    if (command === 'CUSTOM COMMAND') {
      setIsCustomCommand(true);
      setSelectedCommand('');
    } else {
      setIsCustomCommand(false);
      setSelectedCommand(command);
      if (!commandGroups.tracks.includes(command)) {
        onCommandSubmit(command);
        setSelectedCommand('');
      }
    }
    setIsCommandMenuOpen(false);
    setCustomCommand('');
  };

  const handleSubmit = () => {
    if (isCustomCommand) {
      if (customCommand.trim()) {
        const easterEgg = processEasterEgg(customCommand.trim(), language);
        
        if (easterEgg) {
          if (easterEgg.isComponent) {
            setDisplayedOutput(prev => [
              ...prev,
              { type: 'input', content: `> ${customCommand.trim()}` },
              { type: 'special', content: easterEgg.content }
            ]);
            
            if (easterEgg.duration) {
              setTimeout(() => {
                setDisplayedOutput(prev => 
                  prev.filter(item => item.content !== easterEgg.content)
                );
              }, easterEgg.duration);
            }
          } else {
            setDisplayedOutput(prev => [
              ...prev,
              { type: 'input', content: `> ${customCommand.trim()}` },
              { type: 'output', content: easterEgg.content }
            ]);
          }
          setCustomCommand('');
          setIsCustomCommand(false);
          scrollToBottom();
          return;
        }
        
        onCommandSubmit(customCommand.trim());
        setCustomCommand('');
        setIsCustomCommand(false);
      }
    } else if (selectedCommand && (trackName || !commandGroups.tracks.includes(selectedCommand))) {
      const fullCommand = trackName ? `${selectedCommand} ${trackName}` : selectedCommand;
      onCommandSubmit(fullCommand);
      setSelectedCommand('');
      setTrackName('');
    }
  };

  // Helper function to check if a string contains HTML
  const containsHTML = (str) => {
    return typeof str === 'string' && /<[a-z][\s\S]*>/i.test(str);
  };

  // Function to render content properly (text or HTML)
  const renderContent = (line) => {
    if (React.isValidElement(line.content)) {
      return line.content;
    }
    
    if (containsHTML(line.content)) {
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: line.content }} 
          className="content-html"
        />
      );
    }
    
    return (
      <TextGlitchEffect>
        {line.content}
      </TextGlitchEffect>
    );
  };

  // Add smooth scrolling CSS to the document
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .terminal-scrollable {
        -webkit-overflow-scrolling: touch;
        scroll-behavior: smooth;
        overflow-y: auto;
        overscroll-behavior-y: contain;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div 
      className="min-h-screen w-full bg-black text-green-500 font-mono flex flex-col crt-screen crt-overlay crt-scanlines crt-scanline crt-noise mobile-terminal-inner"
      style={{
        position: 'relative',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
      translate="no"
    >
      {/* Output Display with CRT effects */}
      <div className="flex-1 relative crt-flicker" style={{ overflowY: 'visible' }}>
        {/* Scanlines overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-10 scanlines-overlay"
          style={{
            background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 2px)',
            backgroundSize: '100% 2px'
          }}
        />
        
        {/* Main content - This is the scrollable container */}
        <div 
          ref={outputContainerRef}
          className="h-full terminal-scrollable pb-32"
          style={{
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch', // For iOS smooth scrolling
            touchAction: 'pan-y', // Explicit touch behavior
            paddingBottom: '120px' // Extra padding to ensure content isn't hidden behind command interface
          }}
        >
          <div className="p-4 space-y-2">
            {displayedOutput.map((line, i) => (
              <div 
                key={`output-${i}`}
                className={`
                  ${line.type === 'system' ? 'text-green-500' : ''}
                  ${line.type === 'input' ? 'text-green-300' : ''}
                  ${line.type === 'special' ? 'text-yellow-400 font-bold' : ''}
                  whitespace-pre-wrap break-words
                  crt-text crt-jitter
                `}
              >
                {renderContent(line)}
              </div>
            ))}
          </div>
        </div>
      </div>
  
      {/* Command Interface */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-black border-t border-green-500/30 p-4 transition-opacity duration-1000 z-20 ${
          isInitialized ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Show either selected command or custom command input */}
        {isCustomCommand ? (
          <div className="flex items-center gap-2 text-green-400 mb-2 crt-text">
            <Terminal className="w-4 h-4" />
            <input
              type="text"
              value={customCommand}
              onChange={(e) => setCustomCommand(e.target.value.toUpperCase())}
              placeholder={language === 'fr' ? "Commande personnalisée..." : "Type your command..."}
              className="flex-1 bg-transparent border-none outline-none crt-text crt-jitter"
            />
            <X 
              className="w-4 h-4 cursor-pointer" 
              onClick={() => setIsCustomCommand(false)}
            />
          </div>
        ) : (
          selectedCommand && (
            <div className="flex items-center gap-2 text-green-400 mb-2 crt-text">
              <span>{selectedCommand}</span>
              <X 
                className="w-4 h-4 cursor-pointer" 
                onClick={() => setSelectedCommand('')}
              />
            </div>
          )
        )}
  
        {selectedCommand && commandGroups.tracks.includes(selectedCommand) && (
          <input
            type="text"
            value={trackName}
            onChange={(e) => setTrackName(e.target.value.toUpperCase())}
            placeholder={language === 'fr' ? "Nom du morceau..." : "Track name..."}
            className="w-full bg-black border border-green-500/30 rounded p-2 text-green-500 placeholder-green-500/50 mb-2 crt-text crt-jitter"
          />
        )}
  
        <div className="flex gap-2">
          <button
            onClick={() => setIsCommandMenuOpen(true)}
            className="flex-1 flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded p-2 crt-text crt-jitter"
          >
            <span>
              {isCustomCommand 
                ? (language === 'fr' ? "Commande personnalisée" : "Custom Command")
                : (language === 'fr' ? "Sélectionner une commande" : "Select command")}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {((isCustomCommand && customCommand.trim()) || 
            (selectedCommand && (!commandGroups.tracks.includes(selectedCommand) || trackName))) && (
            <button
              onClick={handleSubmit}
              disabled={isPlaying}
              className="bg-green-500/10 border border-green-500/30 rounded p-2 crt-text crt-jitter"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
  
      {/* Command Menu Modal with scrolling */}
      {isCommandMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col crt-overlay crt-scanlines crt-noise">
          {/* Scanlines overlay for modal */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 2px)',
              backgroundSize: '100% 2px'
            }}
          />
  
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto terminal-scrollable">
            <div className="p-4 space-y-4 relative">
              {Object.entries(commandGroups).map(([group, commands]) => (
                <div key={group}>
                  <h3 className="text-green-500/50 mb-2 crt-text crt-jitter uppercase sticky top-0 bg-black z-10">
                    <TextGlitchEffect>{group}</TextGlitchEffect>
                  </h3>
                  <div className="space-y-2">
                    {commands.map((command) => (
                      <button
                        key={command}
                        onClick={() => handleCommandSelect(command)}
                        className="w-full text-left p-2 border border-green-500/30 rounded hover:bg-green-500/10 transition-colors crt-text crt-jitter active:bg-green-500/20"
                      >
                        <TextGlitchEffect>{command}</TextGlitchEffect>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Fixed bottom section */}
          <div className="p-4 border-t border-green-500/30 bg-black">
            <button
              onClick={() => setIsCommandMenuOpen(false)}
              className="w-full p-2 border border-green-500/30 rounded crt-text crt-jitter hover:bg-green-500/10 transition-colors active:bg-green-500/20"
            >
              <TextGlitchEffect>{language === 'fr' ? "Fermer" : "Close"}</TextGlitchEffect>
            </button>
          </div>
        </div>
      )}
      
      {/* Add enhanced glitch effect */}
      <EnhancedCRTGlitchEffect />
    </div>
  );
};

export default MobileTerminal;