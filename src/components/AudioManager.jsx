// AudioManager.js
class AudioManager {
    constructor() {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
      
      // Separate gain nodes for different audio types
      this.gains = {
        ambient: this.context.createGain(),
        typing: this.context.createGain(),
        ui: this.context.createGain(),
        music: this.context.createGain()
      };
  
      // Connect all gains to master
      Object.values(this.gains).forEach(gain => gain.connect(this.masterGain));
      
      // Set initial volumes
      this.gains.ambient.gain.value = 0.1;
      this.gains.typing.gain.value = 0.2;
      this.gains.ui.gain.value = 0.3;
      this.gains.music.gain.value = 0.8;
  
      // Buffer storage
      this.buffers = new Map();
      this.typingSounds = [];
      this.lastTypingSoundTime = 0;
      
      // Track current playback
      this.currentMusic = null;
      this.ambientLoop = null;
    }
  
    async init() {
      // Load all audio buffers
      const filesToLoad = {
        ambient: '/OLD COMPUTER.mp3',
        buttonClick: '/BUTTON CLICK.mp3',
        typing1: '/KEYBOARD 1.mp3',
        typing2: '/KEYBOARD 2.mp3',
        typing3: '/KEYBOARD 3.mp3',
        completion: '/BEEP COMPLETION.mp3'
      };
  
      const loadPromises = Object.entries(filesToLoad).map(async ([key, path]) => {
        const response = await fetch(path);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
        this.buffers.set(key, audioBuffer);
      });
  
      await Promise.all(loadPromises);
      
      // Pre-create typing sound sources
      for (let i = 0; i < 10; i++) {
        this.typingSounds.push({
          source: null,
          isPlaying: false,
          buffer: null
        });
      }
    }
  
    startAmbient() {
      if (this.ambientLoop) {
        this.ambientLoop.stop();
      }
  
      const playLoop = () => {
        const source = this.context.createBufferSource();
        source.buffer = this.buffers.get('ambient');
        source.connect(this.gains.ambient);
        source.loop = true;
        source.loopStart = 30;
        source.loopEnd = source.buffer.duration;
        source.start(0);
        this.ambientLoop = source;
      };
  
      if (this.context.state === 'suspended') {
        this.context.resume().then(playLoop);
      } else {
        playLoop();
      }
    }
  
    playTypingSound() {
      const now = this.context.currentTime;
      if (now - this.lastTypingSoundTime < 0.05) return; // Prevent too rapid triggering
  
      // Find available typing sound slot
      const availableSlot = this.typingSounds.find(slot => !slot.isPlaying);
      if (!availableSlot) return;
  
      // Randomly select a typing sound buffer
      const bufferIndex = Math.floor(Math.random() * 3) + 1;
      const buffer = this.buffers.get(`typing${bufferIndex}`);
  
      const source = this.context.createBufferSource();
      source.buffer = buffer;
      source.connect(this.gains.typing);
      
      availableSlot.source = source;
      availableSlot.isPlaying = true;
      
      source.onended = () => {
        availableSlot.isPlaying = false;
        availableSlot.source = null;
      };
  
      source.start();
      this.lastTypingSoundTime = now;
    }
  
    playButtonClick() {
      const source = this.context.createBufferSource();
      source.buffer = this.buffers.get('buttonClick');
      source.connect(this.gains.ui);
      source.start();
    }
  
    async playMusic(trackPath) {
        if (this.currentMusic) {
            this.currentMusic.stop();
        }
    
        const response = await fetch(trackPath);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
    
        const source = this.context.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.gains.music);
        source.start();
        
        this.currentMusic = source;
        
        // Attendre que la lecture soit terminée
        return new Promise((resolve) => {
            source.onended = () => {
                resolve();
            };
        });
    }
  
    async playSound(soundPath) {
      try {
          if (this.context.state === 'suspended') {
              await this.context.resume();
          }
          
          const source = this.context.createBufferSource();
          source.buffer = this.buffers.get('completion');  // Utiliser le buffer préchargé
          source.connect(this.gains.ui);
          source.start();
      } catch (err) {
          console.error('Error playing sound:', err);
      }
  }

    stopMusic() {
      if (this.currentMusic) {
        this.currentMusic.stop();
        this.currentMusic = null;
      }
    }
  
    cleanup() {
      if (this.ambientLoop) {
        this.ambientLoop.stop();
      }
      if (this.currentMusic) {
        this.currentMusic.stop();
      }
      this.context.close();
    }
  }
  
  export default AudioManager;