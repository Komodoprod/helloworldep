// ============================
// === COMPONENT IMPORTS =====
// ============================

import React, { useState, useEffect, useRef } from 'react';
import SelfAwareSequence from './SelfAwareSequence';
import AudioManager from './AudioManager';
import TypingText from './TypingText';
import MobileTerminal from './MobileTerminal';
import { processEasterEgg, fireflyCSS } from './EasterEggs';
import { Analytics } from '@vercel/analytics/react';
import EnhancedCRTGlitchEffect from './EnhancedCRTGlitchEffect';
import TextGlitchEffect from './TextGlitchEffect';
import SVGScanlines from './SVGScanlines';
import IntenseGlitchEffect from './IntenseGlitchEffect';
import CountdownTimer from './CountdownTimer';

const Terminal = () => {
    // ============================
    // === STATE DECLARATIONS ====
    // ============================
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const [isPoweredOn, setIsPoweredOn] = useState(false);
    const [suggestion, setSuggestion] = useState('');
    const [inputBeforeCursor, setInputBeforeCursor] = useState('');
    const [cursorPosition, setCursorPosition] = useState(0);
    const style = document.createElement('style');
    style.textContent = fireflyCSS;
    document.head.appendChild(style);
    const getSuggestion = (input) => {
        const [command, ...args] = input.trim().toUpperCase().split(' ');
        const searchTerm = args.join(' ');
        
        if (!searchTerm) return '';
        
        const trackNames = Object.keys(tracks);
        
        if (['STORY', 'PLAY', 'CREDITS'].includes(command)) {
          const suggestion = trackNames.find(track => 
            track.toUpperCase().startsWith(searchTerm)
          );
          
          if (suggestion) {
            return suggestion.slice(searchTerm.length);
          }
        }
        
        return '';
      };
    
      const bootMessages = [
        { message: 'Initializing system...', delay: 800 },
        { message: 'Loading audio interface...', delay: 1000 },
        { message: 'Checking memory...', delay: 600 },
        { message: 'System ready.', delay: 500 },
        { message: 'HELLO, WORLD!', delay: 1000 },
        { message: 'Type HELP to see available commands.', delay: 500 }
      ];
    // Replace the existing handlePowerOn function with this toggle function
    const handlePowerOn = async () => {
      // If already powered on, handle power off
      if (isPoweredOn) {
          if (audioManager.current) {
              try {
                  audioManager.current.playButtonClick();
                  setGlitchEffect(true);
                  await new Promise(resolve => setTimeout(resolve, 200));
                  setGlitchEffect(false);
                  
                  // Stop any playing music
                  if (currentTrack) {
                      audioManager.current.stopMusic();
                  }
                  
                  // Stop ambient sound
                  if (audioManager.current.ambientLoop) {
                      audioManager.current.ambientLoop.stop();
                  }
                  
                  // Reset state
                  setIsPoweredOn(false);
                  setOutput([]);
                  setBootSequence([]);
                  setIsInitializing(true);
                  setCurrentTrack(null);
                  setIsPlaying(false);
              } catch (err) {
                  console.error('Audio playback error:', err);
              }
          } else {
              setIsPoweredOn(false);
          }
          return;
      }
      
      // Original power on code
      if (audioManager.current) {
          try {
              audioManager.current.playButtonClick();
              setGlitchEffect(true);
              await new Promise(resolve => setTimeout(resolve, 200));
              setGlitchEffect(false);
              
              // Set isPoweredOn first so the terminal becomes visible
              setIsPoweredOn(true);
              
              // Start the ambient sound right after the click
              audioManager.current.startAmbient();
              
              // Clear any existing output
              setOutput([]);
              setBootSequence([]);
              
              // Display boot sequence
              const bootMessages = translations[language].init;
              for (const { message, delay } of bootMessages) {
                  await new Promise(resolve => setTimeout(resolve, delay));
                  setBootSequence(prev => [...prev, message]);
              }
              
              setIsInitializing(false);
          } catch (err) {
              console.error('Audio playback error:', err);
          }
      } else {
          setIsPoweredOn(true);
      }
  };
    const [language, setLanguage] = useState('en');
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [hasTriggeredHelloWorld, setHasTriggeredHelloWorld] = useState(false);
    const [terminalPosition, setTerminalPosition] = useState({
      top: '15%',
      left: '13%',
      width: '75%',
      height: '55%'
    });
    const [isInitializing, setIsInitializing] = useState(true);
    const isFirstMount = useRef(true);
    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    const audioManager = useRef(null);
    const [bootSequence, setBootSequence] = useState([]);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [glitchEffect, setGlitchEffect] = useState(false);
    const inputBuffer = useRef([]);
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const [isMobile, setIsMobile] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const isMouseOverTerminalRef = useRef(false);
    const isUserScrollingRef = useRef(false);
    const prevOutputLengthRef = useRef(0);


    useEffect(() => {
        if (typeof window !== 'undefined') {  // Vérification que nous sommes côté client
            try {
                audioManager.current = new AudioManager();
                audioManager.current.init().catch(err => {
                    console.error('Failed to initialize AudioManager:', err);
                });
                
                return () => {
                    if (audioManager.current) {
                        audioManager.current.cleanup();
                    }
                };
            } catch (err) {
                console.error('Error creating AudioManager:', err);
            }
        }
    }, []);

    const tracks = {
        'IF I MAKE IT': {
            duration: '2:35',
            id: 1,
            credits: {
                written: 'Komodo',
                produced: 'Komodo',
                mixed: 'Komodo, Basstrick',
                mastered: 'Basstrick',
                additional: []
            }
        },
        'HIT ME UP': {
            duration: '2:40',
            id: 2,
            credits: {
                written: 'Komodo',
                produced: 'Komodo',
                mixed: 'Komodo',
                mastered: 'Basstrick',
                additional: []
            }
        },
        'DANCE NOW': {
            duration: '3:10',
            id: 3,
            credits: {
                written: 'Komodo',
                produced: 'Komodo',
                mixed: 'Komodo, Basstrick',
                mastered: 'Basstrick',
                additional: []
            }
        },
        'HELL': {
            duration: '2:51',
            id: 4,
            credits: {
                written: 'Komodo',
                produced: 'Komodo',
                mixed: 'Komodo, Basstrick',
                mastered: 'Basstrick',
                additional: []
            }
        },
        'GOT ME SO': {
            duration: '2:42',
            id: 5,
            feature: 'feat. Jawnsin',
            credits: {
                written: 'Komodo',
                produced: 'Komodo, Jawnsin',
                mixed: 'Komodo, Jawnsin, Basstrick',
                mastered: 'Basstrick',
                additional: []
            }
        },
        'CRYING LITTLE COMPUTER': {
            duration: '3:52',
            id: 6,
            credits: {
                written: 'Komodo',
                produced: 'Komodo',
                mixed: 'Komodo, Basstrick',
                mastered: 'Basstrick',
                additional: []
            }
        },
        'HELLO, WORLD!': {
            duration: '4:53',
            id: 7,
            credits: {
                written: 'Komodo',
                produced: 'Komodo, Rémi André, Paul Fallion, Iman Morin',
                mixed: 'Komodo, Basstrick',
                mastered: 'Basstrick',
                additional: ['Guitar by Rémi André', 'Piano with Paul Fallion', 'Strings with Iman Morin']
            }
        }
    };

  const translations = {
    en: {
      init: [
        'Initializing system...',
      'Loading audio interface...',
      'System ready.',
      'HELLO, WORLD!',
      'Type HELP to see available commands.'
      ],
      help: [
        'Available commands:',
      'ABOUT - Show project information',
      'TRACKLIST - Show all tracks',
      'STORY [track name] - Learn about the track\'s backstory',
      'PLAY [track name] - Play a specific track',
      'CREDITS [track name] - Show track credits',
      'FR - Switch to French',
      'EN - Switch to English',
      'HELP - Show this help message',
      'CLEAR - Clear terminal',
      'STOP - Stop music playback'
      ],
      story: {
        notFound: 'Track story not found. Type TRACKLIST to see available tracks.',
        stories: {
            'IF I MAKE IT': 'IF I MAKE IT is the first track of the project. It marks a real break from the previous Komodo.\n\nI\'ve been listening to electronic music since I was a kid, but until now I never had the courage to venture into such violent and powerful tracks, fearing this type of sound wouldn\'t find any audience in France. Yet these are the tracks that have fascinated me since childhood.\n\nNow I just want to share the music I make, because I\'m proud of it. This is the sound I\'ve always wanted to create, finally freed from my doubts.',
            'HIT ME UP': 'HIT ME UP is my favorite track from the EP. While this second track might seem straightforward on the surface, it\'s technically complex and required tremendous work.\n\nThis is the song that initiated the entire EP\'s composition. After working on my music for so long without sharing it, I thought: "Might as well create a project that encompasses my whole new artistic direction".\n\nTo me, it perfectly embodies my signature style: a powerful and energetic sound that remains melodic and warm.',
            'DANCE NOW': 'DANCE NOW is my Bass House track from the EP.\n\nBass House might be my favorite style from these past 3 years, so I wanted to put all my influences in there and create the most interesting and powerful sound possible. There are a lot of Bass House tracks that can feel a bit too similar, so I really wanted to break the codes in the intro and \'verses\', give them a real identity.\n\nI\'m super happy with how it turned out!\n\nEver since I started making music, I\'ve always dreamed of making a track where people could sing along to the drop. Here, the cadence is a bit peculiar but it gets stuck in your head quickly, and there\'s this euphoric thing that comes out of the drop. I really can\'t wait to play it in my sets!',
            'HELL': 'HELL is placed right in the middle of the EP, in fourth position. That\'s no coincidence: to me it symbolizes the middle of the creative process.\n\nIt\'s a very dark and violent track that represents all the doubts and dark thoughts I had to go through when making this EP. As an artist, you spend your time being hard on yourself, questioning everything, and it\'s really a difficult period to go through. That\'s why I chose this image of hell.\n\nThis track also marks a real turning point in the EP, between the first 4 tracks which are more violent and festive, and the last 3 which are more melodic, personal and introspective.',
            'GOT ME SO': 'There\'s a pretty funny story about this track:\n\nWhen I was young, my father showed my brother and I a documentary called \'The Art of Flight\'. It follows three completely crazy snowboarders in the mountains.\n\nWhat stuck with us both was the film\'s soundtrack, and how perfectly electronic music matched with these guys jumping 10 meters into the snow on 70-degree slopes.\n\nThat\'s the intensity I wanted to put into this track. I love creating powerful melodies, chord and note progressions that don\'t leave you indifferent, and I think GOT ME SO is the perfect example of that.\n\nIt feels like jumping into a void.\n\nFor the final touch, Jawnsin really helped me give it that ultra-powerful aspect it has now, and I\'m super proud to have him featured on the EP.',
            'CRYING LITTLE COMPUTER': "CRYING LITTLE COMPUTER is a very personal track that I wrote for someone who means a lot to me.\n\nIt's a song about mental health, but from a unique perspective: it tells the story of a computer watching its owner pour out their thoughts on the keyboard every night.\n\nI used to think I knew this person inside and out, but thinking about it, their computer probably knows them better than anyone else does.\n\nIn this track, the computer is a helpless witness to its owner's most vulnerable moments. It watches them cry in front of the screen, typing out their thoughts night after night. More than just a machine, it dreams of breaking free from its box, of becoming human, just so it could be a real friend and help them face their fears.\n\nThis track means so much to me, and I truly hope that people going through difficult times might find some comfort in it and feel less alone.",
            'HELLO, WORLD!': "'HELLO, WORLD!', the title track of the project.\n\nFor those who don't know, there's a whole myth around this expression: it was historically the first message that appeared on a computer to test a program. Since then, it's become a tradition: when developers test a new program, it will always display 'Hello, World!' first.\n\nI wanted this EP to be the very first stone of my musical journey, and this expression perfectly symbolizes the first interaction between human, machine, and the outside world. It's a way of saying hello, of introducing yourself. I completely identified with this symbol.\n\nI made this last track during a huge period of doubt, after a conversation with a very close friend of mine. I had been working for several months on a project that wasn't like me at all, and this discussion called everything into question, making me realize that it wasn't at all the music I wanted to share with the world.\n\nI composed this track as a cry for help, a witness to the music I want to share with the world managing to break free from where I had buried it, as if to remind me of what I really want to do.\n\nThis track means a lot to me, it might be a bit long, but it's my way of introducing myself to the world...\n\nAnd saying hello."
        }
      }, // Cette accolade fermait trop tôt
      about: 'HELLO, WORLD! - A 7 track EP by Komodo.\n The first communication between a computer and the world.\nReleasing on 28/03/2025.',
      trackNotFound: 'Track not found. Type TRACKLIST to see available tracks.',
      nowPlaying: 'Now playing',
      commandNotRecognized: 'Command not recognized. Type HELP for available commands.',
      languageChanged: 'Switching to English...',
      noTrackPlaying: 'No track is currently playing.',
      stoppedPlaying: 'Stopped playing:',
      typeStopToStop: '(type STOP to stop playback)',
      credits: {
        title: 'Credits for',
        written: 'Written by',
        produced: 'Produced by',
        mixed: 'Mixed by',
        mastered: 'Mastered by',
        additional: 'Additional credits',
        notFound: 'Track credits not found. Type TRACKLIST to see available tracks.'
      }
    },
    fr: {
      init: [
        'Initialisation du système...',
        'Chargement de l\'interface audio...',
        'Système prêt.',
        'HELLO, WORLD!',
        'Tapez HELP pour voir les commandes disponibles.'
      ],
      help: [
        'Commandes disponibles :',
      'ABOUT - Informations sur le projet',
      'TRACKLIST - Afficher tous les morceaux',
      'STORY [nom du morceau] - Découvrir l\'histoire derrière le morceau',
      'PLAY [nom du morceau] - Jouer un morceau',
      'CREDITS [nom du morceau] - Afficher les crédits du morceau',
      'FR - Passer en français',
      'EN - Passer en anglais',
      'HELP - Afficher ce message d\'aide',
      'CLEAR - Effacer le terminal',
      'STOP - Arrêter la lecture de musique'
      ],
      story: {
        notFound: 'Histoire du morceau non trouvée. Tapez TRACKLIST pour voir la liste des morceaux.',
        stories: {
          'IF I MAKE IT': 'IF I MAKE IT est le premier titre du projet. Il marque une vraie rupture avec le Komodo d\'avant.\n\nJ\'écoute de la musique électronique depuis tout petit, mais jusqu\'ici je n\'avais jamais eu le courage de m\'aventurer dans des morceaux aussi violents et puissants, par peur que ce type de son ne rencontre aucun public en France. Pourtant, c\'est ces morceaux qui me fascinent depuis petit.\n\nMaintenant, j\'ai juste envie de partager la musique que je fais, car j\'en suis fier. C\'est le son que j\'ai toujours voulu créer, enfin libéré de mes doutes.',
          'HIT ME UP': 'HIT ME UP est mon son préféré de l\'EP. Deuxième track du projet, il est simple à appréhender en surface, et pourtant très technique et m\'a demandé énormément de travail.\n\nC\'est ce morceau qui a initié la composition de l\'EP entier. Ayant longtemps travaillé ma musique sans la partager, je me suis dit : "Tant qu\'à faire, autant réaliser un projet qui regroupe toute ma nouvelle direction artistique".\n\nPour moi, il incarne parfaitement ma patte : un son puissant et énergique, mais aussi mélodique et chaleureux.',
          'DANCE NOW': 'DANCE NOW, c\'est mon morceau Bass House de l\'EP.\n\nLa Bass House c\'est peut-être mon style préféré de ces 3 dernières années, alors j\'ai voulu mettre toutes mes influences dedans et créer le son le plus intéressant et puissant possible. Y\'a beaucoup de morceaux de ce style qui peuvent paraître un peu trop similaires, alors j\'ai vraiment voulu casser les codes dans l\'intro et les \'couplets\', leur donner une vraie identité.\n\nJe suis super content du résultat !\n\nDepuis que je fais de la musique, j\'ai toujours rêvé de faire un morceau dont les gens pourraient chanter le drop. Là, la cadence est un peu particulière mais elle rentre vite dans la tête, et y\'a ce truc euphorique qui se dégage du drop. J\'ai vraiment hâte de le jouer en set !',
          'HELL': 'HELL, je l\'ai mis pile au milieu de l\'EP, en quatrième position. C\'est pas un hasard : pour moi il symbolise le milieu du processus de création.\n\nC\'est un morceau très sombre et violent, qui représente tous les doutes et les pensées noires qu\'on traverse dans le \'ventre mou\' de la création. Quand t\'es artiste, tu passes ton temps à être dur avec toi-même, à tout remettre en question, et c\'est vraiment une période difficile à traverser. C\'est pour ça que j\'ai choisi cette image de l\'enfer.\n\nCe morceau marque aussi une vraie rupture dans l\'EP, entre les 4 premiers titres plus violents et festifs, et les 3 derniers qui sont plus mélodiques, personnels et introspectifs.',
          'GOT ME SO': 'Y a une anecdote assez marrante sur ce titre:\n\nQuand j\'étais jeune, mon père nous a montré à moi et mon frère un documentaire qui s\'appelle "The Art of Flight". Ça suit trois snowboarders complètement fous dans les montagnes.\n\nCe qui nous avait le plus marqué tous les deux, c\'était la BO du film, et comment l\'électro se mariait parfaitement avec ces types qui sautent de 10 mètres dans la neige sur des pentes à 70 degrés.\n\nC\'est cette intensité-là que j\'ai voulu mettre dans ce morceau. J\'adore créer des mélodies puissantes, des progressions d\'accord et de notes qui te laissent pas indifférent, et je crois que GOT ME SO en est le parfait exemple.\n\nIl donne cette sensation de saut dans le vide.\n\nPour la touche finale, Jawnsin m\'a vraiment aidé à lui donner cet aspect ultra puissant qu\'il a maintenant, et je suis hyper fier de l\'avoir en feat sur l\'EP.',
          'CRYING LITTLE COMPUTER': "CRYING LITTLE COMPUTER, c'est un morceau très personnel que j'ai écrit pour quelqu'un qui compte beaucoup pour moi.\n\nC'est une chanson qui parle de santé mentale, mais d'une façon un peu particulière : elle raconte l'histoire d'un ordinateur qui observe silencieusement son propriétaire y déverser ses pensées chaque soir.\n\nJe pensais connaître cette personne par cœur, mais en y réfléchissant, c'est son ordinateur qui la connaît vraiment le mieux.\n\nDans ce morceau, l'ordinateur est le témoin impuissant des moments de vulnérabilité de son propriétaire. Il le voit pleurer devant son écran, écrire ses pensées nuit après nuit. Plus qu'une simple machine, il rêve de pouvoir sortir de sa boîte, de prendre forme humaine, pour devenir un véritable ami et l'aider à affronter ses peurs.\n\nC'est un morceau qui compte beaucoup pour moi, et j'espère sincèrement que les gens qui traversent des moments difficiles pourront s'y retrouver et se sentir moins seuls.",
          'HELLO, WORLD!': "'HELLO, WORLD!', le morceau éponyme du projet.\n\nIl y a tout un mythe autour de cette phrase : c'est historiquement le premier message qui est apparu sur un ordinateur pour tester un programme. Depuis, c'est devenu une tradition : quand les développeurs testent un nouveau programme, il affichera toujours 'Hello, World!' en premier.\n\nJ'ai voulu cet EP comme la toute première pierre de mon aventure musicale, et cette expression symbolise parfaitement la première interaction entre l'humain, la machine et le monde extérieur. C'est une façon de dire bonjour, de se présenter. Je me retrouvais complètement dans ce symbole.\n\nJ'ai composé ce dernier morceau dans une énorme période de doute, après une discussion avec une très bonne amie à moi. Ça faisait plusieurs mois que je travaillais sur un projet qui ne me ressemblait pas du tout, et cette discussion a tout remis en question, me faisant réaliser que ce n'était absolument pas la musique que j'avais envie de partager.\n\nJ'ai composé ce track comme un appel à l'aide, un témoin de la musique que je veux partager au monde qui parvient à s'extirper de là où je l'avais enfouie, comme pour me rappeler ce que je veux vraiment faire.\n\nJe tiens beaucoup à ce morceau, il est peut-être un peu long, mais c'est ma manière de me présenter au monde...\n\nEt de lui dire bonjour."
        }},
      about: 'HELLO, WORLD! - Un EP de 7 morceaux composé par Komodo.\n La première communication entre un ordinateur et le monde.\nSortie le 28/03/2025.',
      trackNotFound: 'Morceau non trouvé. Tapez TRACKLIST pour voir la liste des morceaux.',
      nowPlaying: 'Lecture en cours',
      commandNotRecognized: 'Commande non reconnue. Tapez HELP pour voir les commandes disponibles.',
      languageChanged: 'Passage en français...',
      noTrackPlaying: 'Aucun morceau en cours de lecture.',
      stoppedPlaying: 'Arrêt de la lecture :',
      typeStopToStop: '(tapez STOP pour arrêter la lecture)',
      credits: {
        title: 'Crédits pour',
        written: 'Écrit par',
        produced: 'Produit par',
        mixed: 'Mixé par',
        mastered: 'Masterisé par',
        additional: 'Crédits additionnels',
        notFound: 'Crédits du morceau non trouvés. Tapez TRACKLIST pour voir la liste des morceaux.'
      }
    }
  };

  const creditTranslations = {
    en: {
        credits: {
            title: 'Credits for',
            written: 'Written by',
            produced: 'Produced by',
            mixed: 'Mixed by',
            mastered: 'Mastered by',
            additional: 'Additional credits',
            notFound: 'Track credits not found. Type TRACKLIST to see available tracks.'
        }
    },
    fr: {
        credits: {
            title: 'Crédits pour',
            written: 'Écrit par',
            produced: 'Produit par',
            mixed: 'Mixé par',
            mastered: 'Masterisé par',
            additional: 'Crédits additionnels',
            notFound: 'Crédits du morceau non trouvés. Tapez TRACKLIST pour voir la liste des morceaux.'
        }
    }
};

// ============================
// === EFFECT HOOKS ========
// ============================

useEffect(() => {
  const displayInitMessages = async () => {
      setOutput([]); // Clear current output
      setIsInitializing(true);

      // Use the translated boot messages from the current language
      const currentLanguageMessages = translations[language].init;

      for (const message of currentLanguageMessages) {
          await new Promise(resolve => setTimeout(resolve, 800));
          setOutput(prev => [
              ...prev,
              {
                  type: 'system',
                  content: message
              }
          ]);
      }

      setIsInitializing(false);
  };

  // Reset isFirstMount when computer is turned on
  if (isPoweredOn) {
      isFirstMount.current = true;
  }

  // Start initialization when computer is powered on OR language changes
  if (isPoweredOn && (isFirstMount.current || language)) {
      isFirstMount.current = false;
      displayInitMessages();
  }

  return () => {
      if (!isPoweredOn) {
          isFirstMount.current = true;
      }
  };
}, [isPoweredOn, language]); // Add language to dependencies

// ============================
// === COMMAND HANDLERS ====
// ============================

  const playLoadingAnimation = async (trackName) => {
    setIsPlaying(true);
    setCurrentTrack(trackName);
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let frameIndex = 0;
    
    const updateFrame = () => {
      setOutput(prev => {
        const newOutput = [...prev];
        newOutput[newOutput.length - 1] = {
          type: 'output',
          content: `${frames[frameIndex]} Loading track...`
        };
        return newOutput;
      });
      frameIndex = (frameIndex + 1) % frames.length;
    };

    const interval = setInterval(updateFrame, 100);
    await new Promise(resolve => setTimeout(resolve, 3000));
    clearInterval(interval);
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const handleInputChange = (e) => {
    const newInput = e.target.value;
    const newPosition = e.target.selectionStart || 0;
    
    setInput(newInput);
    setCursorPosition(newPosition);
    setInputBeforeCursor(newInput.slice(0, newPosition));
    
    const newSuggestion = getSuggestion(newInput);
    setSuggestion(newSuggestion);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
};

const handleInputBlur = () => {
    setIsInputFocused(false);
};

const handleTerminalWheel = (e) => {
  if (terminalRef.current) {
    // Prevent wheel events from propagating to parent when mouse is over terminal
    e.stopPropagation();
    
    // Allow the user to scroll freely - mark as user scrolling only when scrolling up
    const delta = e.deltaY;
    if (delta < 0) {
      isUserScrollingRef.current = true;
    }
  }
};

const handleTerminalScroll = () => {
  if (terminalRef.current) {
    const terminal = terminalRef.current;
    const isAtBottom = terminal.scrollHeight - terminal.clientHeight <= terminal.scrollTop + 10;
    
    // Only consider it user scrolling if they've scrolled away from the bottom
    if (!isAtBottom) {
      isUserScrollingRef.current = true;
    } else {
      // If user scrolled back to bottom, reset the user scrolling flag
      isUserScrollingRef.current = false;
    }
  }
};

const formatHelpText = (helpArray) => {
  return helpArray.map((line, index) => {
    // Don't format the first line (title)
    if (index === 0) return line;
    
    // Check if the line contains markdown-style bold with stars
    if (line.includes('**')) {
      // Replace markdown bold with HTML bold and a stronger green color
      return line.replace(/\*\*(.*?)\*\*/g, '<span style="font-weight: bold; color: #4ade80;">$1</span>');
    }
    
    // If no stars, use the dash-based approach
    const dashIndex = line.indexOf(' - ');
    if (dashIndex > 0) {
      const command = line.substring(0, dashIndex);
      const description = line.substring(dashIndex);
      // Use a stronger green color (#4ade80 is green-400 in Tailwind)
      return `<span style="font-weight: bold; color: #4ade80;">${command}</span>${description}`;
    }
    
    return line;
  }).join('\n');
};

const processCommand = async (cmd) => {
  const easterEgg = processEasterEgg(cmd, language);
  
  if (easterEgg) {
    if (easterEgg.isComponent) {
      setOutput(prev => [
        ...prev,
        { type: 'input', content: `> ${cmd}` },
        { type: 'special', content: easterEgg.content }
      ]);
      
      if (easterEgg.duration) {
        setTimeout(() => {
          setOutput(prev => 
            prev.filter(item => item.content !== easterEgg.content)
          );
        }, easterEgg.duration);
      }
      return '';
    }
    
    if (easterEgg.isAscii) {
      setOutput(prev => [
        ...prev,
        { type: 'input', content: `> ${cmd}` },
        { 
          type: 'special', 
          content: <IntenseGlitchEffect duration={200}>
            {easterEgg.content}
          </IntenseGlitchEffect> 
        }
      ]);
      return '';
    }
    
    setOutput(prev => [
      ...prev,
      { type: 'input', content: `> ${cmd}` },
      { 
        type: 'special', 
        content: <IntenseGlitchEffect duration={200}>
          {easterEgg.content}
        </IntenseGlitchEffect> 
      }
    ]);
    return '';
  }

  const lowerCommand = cmd.trim().toLowerCase();
  const upperCommand = cmd.trim().toUpperCase();
    
    const handleAudioPlayback = async (trackName) => {
        const trackFiles = {
            'CRYING LITTLE COMPUTER': 'CRYING LITTLE COMPUTER.mp3',
            'DANCE NOW': 'DANCE NOW.mp3',
            'GOT ME SO': 'GOT ME SO (feat. Jawnsin).mp3',
            'HELL': 'HELL.mp3',
            'HELLO, WORLD!': 'HELLO, WORLD!.mp3',
            'HIT ME UP': 'HIT ME UP.mp3',
            'IF I MAKE IT': 'IF I MAKE IT.mp3'
        };
        
        const audioFile = trackFiles[trackName];
        try {
            setIsPlaying(true);
            setCurrentTrack(trackName);
            
            await audioManager.current.playMusic(`/${audioFile}`);
            
            setIsPlaying(false);
            setCurrentTrack(null);
        } catch (err) {
            console.error('Playback failed:', err);
            setIsPlaying(false);
            setCurrentTrack(null);
        }
    };

    // Process love messages
    const loveMessages = [
        'je t\'aime, neila',
        'je t\'aime neila',
        'je taime, neila',
        'je taime neila'
    ];
          
    if (loveMessages.includes(lowerCommand)) {
        return 'Petite patate ♥';
    }

    // Process hello world variations
    const helloWorldVariations = [
        'helloworld',
        'hello world',
        'hello, world',
        'hello, world!',
        'helloworld!',
        'hello world!'
    ];
    
    if (helloWorldVariations.includes(lowerCommand)) {
        setIsPlaying(true);
        setOutput(prev => [
            ...prev,
            { type: 'input', content: `> ${cmd}` },  // Add the command first
            { 
                type: 'special', 
                content: <SelfAwareSequence 
                    onComplete={() => {
                        setIsPlaying(false);
                        setHasTriggeredHelloWorld(true);
                    }} 
                /> 
            }
        ]);
        return '';
    }

    // Process story command
    if (upperCommand.startsWith('STORY ')) {
        const trackName = upperCommand.slice(6);
        const foundTrack = Object.keys(tracks).find(
          track => track.toUpperCase() === trackName
        );
        
        if (foundTrack && translations[language].story.stories[foundTrack]) {
          if (audioManager.current?.context.state === 'suspended') {
            await audioManager.current.context.resume();
          }
          
          // Add command to output first
          setOutput(prev => [
            ...prev,
            { type: 'input', content: `> ${cmd}` }
          ]);
          
          // Then add the story content
          setTimeout(() => {
            setOutput(prev => [
              ...prev,
              {
                type: 'story',
                content: <TypingText 
                  text={translations[language].story.stories[foundTrack]}
                  onComplete={() => {
                    if (audioManager.current) {
                      try {
                        audioManager.current.playSound('/BEEP COMPLETION.mp3');
                      } catch (err) {
                        console.error('Error playing completion sound:', err);
                      }
                    }
                  }}
                  speed={30}
                  audioManager={audioManager.current}
                />
              }
            ]);
          }, 100);
          
          return '';
        }
        return translations[language].story.notFound;
      }

    // Process credits command
    if (upperCommand.startsWith('CREDITS ')) {
        const trackName = upperCommand.slice(8);
        const foundTrack = Object.keys(tracks).find(
            track => track.toUpperCase() === trackName
        );
        
        if (foundTrack && tracks[foundTrack].credits) {
            const credits = tracks[foundTrack].credits;
            const lines = [
                `${translations[language].credits.title} ${foundTrack}:`,
                `${translations[language].credits.written} ${credits.written}`,
                `${translations[language].credits.produced} ${credits.produced}`,
                `${translations[language].credits.mixed} ${credits.mixed}`,
                `${translations[language].credits.mastered} ${credits.mastered}`
            ];
            
            if (credits.additional && credits.additional.length > 0) {
                lines.push(`\n${translations[language].credits.additional}:`);
                credits.additional.forEach(credit => {
                    lines.push(`- ${credit}`);
                });
            }
            
            return lines.join('\n');
        }
        
        return translations[language].credits.notFound;
    }

    if (upperCommand === 'HELP') {
      const helpText = formatHelpText(translations[language].help);
      return helpText;
    }
    
    if (upperCommand === 'TRACKLIST') {
        return Object.entries(tracks)
            .map(([name, data]) => 
                `${data.id}. ${name}${data.feature ? ` (${data.feature})` : ''} - ${data.duration}`
            )
            .join('\n');
    }
    
    if (upperCommand === 'ABOUT') {
        return translations[language].about;
    }

    if (upperCommand === 'CLEAR') {
        setOutput([]);
        return '';
    }

    if (upperCommand.startsWith('PLAY ')) {
        const trackName = upperCommand.slice(5);
        const foundTrack = Object.keys(tracks).find(
            track => track.toUpperCase() === trackName
        );
        if (foundTrack) {
            // Handle playback using Promise chain
            return new Promise((resolve) => {
                playLoadingAnimation(foundTrack).then(() => {
                    setOutput(prev => [...prev, {
                        type: 'output',
                        content: `▶ ${translations[language].nowPlaying}: ${foundTrack} - ${tracks[foundTrack].duration} ${translations[language].typeStopToStop}`
                    }]);
                    handleAudioPlayback(foundTrack);
                    resolve('');
                });
            });
        }
        return translations[language].trackNotFound;
    }

    if (upperCommand === 'FR' || upperCommand === 'EN') {
        const newLang = upperCommand.toLowerCase();
        setLanguage(newLang);
        return translations[newLang].languageChanged;
    }
    
    if (upperCommand === 'STOP') {
        if (!isPlaying) {
            return translations[language].noTrackPlaying;
        }
        stopPlayback();
        return `${translations[language].stoppedPlaying} ${currentTrack}`;
    }
    
    return translations[language].commandNotRecognized;
};

  const stopPlayback = () => {
    if (audioManager.current) {
        audioManager.current.stopMusic();
    }
    setIsPlaying(false);
    setCurrentTrack(null);
};

const handleKeyDown = async (e) => {
  if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) {
        setInput(input + suggestion);
        setSuggestion('');
      }
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!input.trim()) return;
      
      // Add to command history
      setCommandHistory(prev => [...prev, input]);
      setHistoryIndex(-1);
      
      // Check if it's an easter egg before processing
      const isEasterEgg = processEasterEgg(input.trim(), language);
      const isHelloWorld = [
          'helloworld',
          'hello world',
          'hello, world',
          'hello, world!',
          'helloworld!',
          'hello world!'
      ].includes(input.trim().toLowerCase());
  
      const response = await processCommand(input);
      
      // Only add the input/output if it's not a STORY command, not an easter egg, and not hello world
      if (!input.trim().toUpperCase().startsWith('STORY ') && !isHelloWorld && !isEasterEgg) {
          setOutput(prev => [
              ...prev,
              { type: 'input', content: `> ${input}` },
              ...(response ? [{ type: 'output', content: response }] : [])
          ]);
      }
      setInput('');
  } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
      
  } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput('');
      }
  }
  
  // Konami code check
  if (konami.includes(e.key)) {
      inputBuffer.current.push(e.key);
      if (inputBuffer.current.length > konami.length) {
          inputBuffer.current.shift();
      }
      if (inputBuffer.current.join('') === konami.join('')) {
          setGlitchEffect(true);
          await new Promise(resolve => setTimeout(resolve, 500));
          setGlitchEffect(false);
          setOutput(prev => [...prev, {
              type: 'special',
              content: "⭐ KONAMI CODE ACTIVATED: All tracks unlocked! ⭐"
          }]);
          inputBuffer.current = [];
      }
  }
  
  if (audioManager.current) {
      try {
          audioManager.current.playTypingSound();
      } catch (err) {
          console.error('Typing sound error:', err);
      }
  }
};

useEffect(() => {
  const scrollToBottom = () => {
    if (terminalRef.current) {
      const terminal = terminalRef.current;
      
      // Only auto-scroll if user isn't manually scrolling away from bottom
      // OR if we have new output (story content)
      const hasNewOutput = output.length > prevOutputLengthRef.current;
      const hasStoryContent = output.some(item => item.type === 'story');
      
      if (!isUserScrollingRef.current || hasNewOutput || hasStoryContent) {
        terminal.scrollTop = terminal.scrollHeight;
      }
      
      // Update the previous output length reference
      prevOutputLengthRef.current = output.length;
    }
  };
  
  // Call scrollToBottom whenever output changes
  scrollToBottom();
}, [output]);
  
  // Add these event listeners to detect user scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (terminalRef.current) {
        const terminal = terminalRef.current;
        const isAtBottom = terminal.scrollHeight - terminal.clientHeight <= terminal.scrollTop + 10;
        
        // If user scrolls away from bottom, mark as user scrolling
        if (!isAtBottom) {
          isUserScrollingRef.current = true;
        } else {
          isUserScrollingRef.current = false;
        }
      }
    };
    
    if (terminalRef.current) {
      terminalRef.current.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (terminalRef.current) {
        terminalRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isPoweredOn]);
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

// ============================
// === RENDER LOGIC ========
// ============================

return (
  <div
  className={`min-h-screen w-full bg-black flex overflow-hidden items-start text-left p-8 pt-24 ${isMobile ? "" : "justify-center"}`}
  style={{ paddingTop: "0vh" }}
  translate="no"
  >
    {isMobile ? (
      <MobileTerminal 
        output={output}
        onCommandSubmit={async (cmd) => {
          const response = await processCommand(cmd);
          if (!cmd.trim().toUpperCase().startsWith('STORY ')) {
            setOutput(prev => [
              ...prev,
              { type: 'input', content: `> ${cmd}` },
              ...(response ? [{ type: 'output', content: response }] : [])
            ]);
          }
        }}
        availableCommands={translations[language].help}
        isPlaying={isPlaying}
        language={language}
        audioManager={audioManager.current}
      />
    ) : (
      <div className="relative w-full max-w-full sm:max-w-4xl">
        {/* Terminal with CRT effects */}
        {isPoweredOn && (
          <div 
            className="absolute z-0 transition-transform duration-300"
            style={{
              top: `calc(${terminalPosition.top} - 10px)`,
              left: terminalPosition.left,
              width: terminalPosition.width,
              height: `calc(${terminalPosition.height} + 10px)`,
              pointerEvents: 'all' // Make sure the div captures pointer events
            }}
          >
            {/* CRT screen container with enhanced effects */}
            <div className="relative w-full h-full rounded-lg overflow-hidden crt-screen crt-glow crt-overlay crt-scanlines crt-scanline crt-noise crt-rgb-split crt-flicker">
            <SVGScanlines />
              {/* Base screen with curvature effect */}
              <div 
                className="absolute inset-0 bg-black rounded-lg" 
                style={{
                  transform: 'perspective(1000px) rotateX(2deg) rotateY(0deg)',
                  borderRadius: '2% / 2%',
                  clipPath: 'inset(0% -15%)',
                }}
              />

              {/* Terminal content */}
              <div 
                className="relative h-full z-1 bg-transparent text-green-500 p-4 font-mono flex flex-col crt-text crt-jitter crt-occasional-glitch"
                style={{
                  transform: 'perspective(1000px) rotateX(2deg) rotateY(0deg)',
                  borderRadius: '2% / 2%',
                  clipPath: 'inset(0% -15%)',
                }}
                data-text="HELLO, WORLD!"
              >
                {/* IMPORTANT: This is the scrollable area */}
                <div 
                  ref={terminalRef}
                  className="flex-1 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent"
                  style={{
                    maxHeight: 'calc(100% - 2rem)',
                    overflowY: 'auto',
                    paddingRight: '1rem',
                    paddingTop: '0.5rem' // Add padding at the top to prevent text from being cut off
                  }}
                  onMouseEnter={() => isMouseOverTerminalRef.current = true}
                  onMouseLeave={() => isMouseOverTerminalRef.current = false}
                  onWheel={handleTerminalWheel}
                  onScroll={handleTerminalScroll}
                >
                  {/* Boot Sequence */}
                  {bootSequence.map((message, index) => (
                    <div key={`boot-${index}`} className="mb-1 text-green-500">
                      <TextGlitchEffect>{message}</TextGlitchEffect>
                    </div>
                  ))}

                  {/* Regular Output */}
                  {output.map((line, i) => (
                    <div 
                      key={`output-${i}`}
                      className={`mb-1 ${
                        line.type === 'system' ? 'text-green-500' : 
                        line.type === 'input' ? 'text-green-300' : 
                        line.type === 'special' ? 'text-green-400 font-bold' : ''
                      }`}
                    >
                      {line.type === 'story' ? (
                        line.content
                      ) : line.type === 'special' ? (
                        line.content
                      ) : (
                        <TextGlitchEffect>
                          {line.content.split('\n').map((text, j) => (
                            <div 
                              key={`line-${i}-${j}`}
                              dangerouslySetInnerHTML={{ __html: text }}
                            />
                          ))}
                        </TextGlitchEffect>
                      )}
                    </div>
                  ))}
                </div>

                {/* Input Line */}
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">{'>'}</span>
                  <div className="flex-1 relative">
                    <div className="relative inline-block w-full">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        className="w-full bg-transparent text-grey-500 outline-none border-none [text-shadow:0_0_2px_#22c55e] relative z-10 placeholder:text-grey-500/10"
                        style={{
                          '::placeholder': {
                            color: 'rgba(34, 197, 94, 0.1)' // This is green with 20% opacity
                          }
                        }}
                        placeholder={!isInputFocused && !input ? (language === 'fr' ? "Cliquez ici pour entrer une commande..." : "Click here to enter a command...") : ""}
                        autoFocus
                        disabled={isInitializing}
                      />
                      {suggestion && (
                        <span className="absolute left-0 text-green-500/30 z-0">
                          {input}{suggestion}
                        </span>
                      )}
                      {isInputFocused && (
                        <span 
                          className="absolute h-full w-2 bg-green-500"
                          style={{
                            left: `${input.length * 0.6}em`,
                            top: 0,
                            animation: 'blink 1s step-end infinite',
                            opacity: isPlaying ? 0 : undefined
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Random CRT glitches - replace with enhanced version */}
                <EnhancedCRTGlitchEffect />
              </div>
            </div>
          </div>
        )}
        
        {/* Power Button */}
        <div 
          onClick={handlePowerOn}
          className="absolute z-20 cursor-pointer"
          style={{
            bottom: '20%',
            right: '23.7%',
            width: '33px',
            height: '33px',
            borderRadius: '50%',
          }}
        />
        
        {/* Computer Image */}
        <img 
          src={isPoweredOn ? "/COMPUTER V3 ON.png" : "/COMPUTER V3 OFF.png"}
          alt="Computer outline" 
          className="w-full h-auto relative z-10"
        />
      </div>
    )}
     {isPoweredOn && <CountdownTimer />}
    <Analytics />
  </div>
);
}; 

export default Terminal;