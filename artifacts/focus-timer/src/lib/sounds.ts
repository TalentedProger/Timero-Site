export const playSound = (type: string, volume: number, repeatCount: number = 1, playDuration: number = 2) => {
  // Web Audio API context setup
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;
  
  const playSingleSound = (delayTime: number = 0) => {
    const ctx = new AudioContext();
    const gainNode = ctx.createGain();
    // Map volume 0-100 to 0-1
    gainNode.gain.value = volume / 100;
    gainNode.connect(ctx.destination);

    const startTime = ctx.currentTime + delayTime;
    const duration = Math.min(playDuration, 3); // Cap at 3 seconds per sound

    switch (type) {
      case 'bell': {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, startTime);
        
        const env = ctx.createGain();
        env.gain.setValueAtTime(1, startTime);
        env.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        osc.connect(env);
        env.connect(gainNode);
        osc.start(startTime);
        osc.stop(startTime + duration);
        break;
      }
      case 'chime': {
        const freqs = [880, 1320, 1760];
        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          // Slight detuning
          osc.frequency.setValueAtTime(freq + (Math.random() * 5 - 2.5), startTime);
          
          const env = ctx.createGain();
          env.gain.setValueAtTime(1 / freqs.length, startTime);
          env.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
          
          osc.connect(env);
          env.connect(gainNode);
          osc.start(startTime);
          osc.stop(startTime + duration);
        });
        break;
      }
      case 'gong': {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(60, startTime);
        
        const env = ctx.createGain();
        env.gain.setValueAtTime(1, startTime);
        env.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        // Add harmonics
        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(120, startTime);
        const env2 = ctx.createGain();
        env2.gain.setValueAtTime(0.5, startTime);
        env2.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        osc.connect(env);
        osc2.connect(env2);
        env.connect(gainNode);
        env2.connect(gainNode);
        
        osc.start(startTime);
        osc2.start(startTime);
        osc.stop(startTime + duration);
        osc2.stop(startTime + duration);
        break;
      }
      case 'rain': {
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        // Filter the white noise to sound more like rain (pink/brown noise approximation)
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1000;
        
        const env = ctx.createGain();
        env.gain.setValueAtTime(0, startTime);
        env.gain.linearRampToValueAtTime(0.5, startTime + duration * 0.25);
        env.gain.setValueAtTime(0.5, startTime + duration * 0.75);
        env.gain.linearRampToValueAtTime(0, startTime + duration);
        
        noise.connect(filter);
        filter.connect(env);
        env.connect(gainNode);
        
        noise.start(startTime);
        noise.stop(startTime + duration);
        break;
      }
      case 'birds': {
        // FM synthesis for bird chirp
        const carrier = ctx.createOscillator();
        const modulator = ctx.createOscillator();
        
        carrier.type = 'sine';
        modulator.type = 'sine';
        
        // Sweep carrier frequency up
        carrier.frequency.setValueAtTime(2000, startTime);
        carrier.frequency.exponentialRampToValueAtTime(4000, startTime + Math.min(duration * 0.67, 0.2));
        
        modulator.frequency.value = 10;
        
        const modGain = ctx.createGain();
        modGain.gain.value = 500;
        
        const env = ctx.createGain();
        env.gain.setValueAtTime(0, startTime);
        env.gain.linearRampToValueAtTime(0.3, startTime + duration * 0.17);
        env.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        modulator.connect(modGain);
        modGain.connect(carrier.frequency);
        
        carrier.connect(env);
        env.connect(gainNode);
        
        modulator.start(startTime);
        carrier.start(startTime);
        modulator.stop(startTime + duration);
        carrier.stop(startTime + duration);
        break;
      }
      case 'sine': {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, startTime);
        
        const env = ctx.createGain();
        env.gain.setValueAtTime(0, startTime);
        env.gain.linearRampToValueAtTime(1, startTime + duration * 0.2);
        env.gain.setValueAtTime(1, startTime + duration * 0.8);
        env.gain.linearRampToValueAtTime(0, startTime + duration);
        
        osc.connect(env);
        env.connect(gainNode);
        osc.start(startTime);
        osc.stop(startTime + duration);
        break;
      }
      default:
        break;
    }
  };

  // Play sound multiple times with delay between repeats
  for (let i = 0; i < repeatCount; i++) {
    const delay = i * (playDuration + 0.3); // 0.3s gap between repeats
    playSingleSound(delay);
  }
};
