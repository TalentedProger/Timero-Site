export const playSound = (type: string, volume: number) => {
  // Web Audio API context setup
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();

  const gainNode = ctx.createGain();
  // Map volume 0-100 to 0-1
  gainNode.gain.value = volume / 100;
  gainNode.connect(ctx.destination);

  switch (type) {
    case 'bell': {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      
      const env = ctx.createGain();
      env.gain.setValueAtTime(1, ctx.currentTime);
      env.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      
      osc.connect(env);
      env.connect(gainNode);
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
      break;
    }
    case 'chime': {
      const freqs = [880, 1320, 1760];
      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        // Slight detuning
        osc.frequency.setValueAtTime(freq + (Math.random() * 5 - 2.5), ctx.currentTime);
        
        const env = ctx.createGain();
        env.gain.setValueAtTime(1 / freqs.length, ctx.currentTime);
        env.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
        
        osc.connect(env);
        env.connect(gainNode);
        osc.start();
        osc.stop(ctx.currentTime + 2);
      });
      break;
    }
    case 'gong': {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(60, ctx.currentTime);
      
      const env = ctx.createGain();
      env.gain.setValueAtTime(1, ctx.currentTime);
      env.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);
      
      // Add harmonics
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(120, ctx.currentTime);
      const env2 = ctx.createGain();
      env2.gain.setValueAtTime(0.5, ctx.currentTime);
      env2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
      
      osc.connect(env);
      osc2.connect(env2);
      env.connect(gainNode);
      env2.connect(gainNode);
      
      osc.start();
      osc2.start();
      osc.stop(ctx.currentTime + 3);
      osc2.stop(ctx.currentTime + 3);
      break;
    }
    case 'rain': {
      const bufferSize = ctx.sampleRate * 2; // 2 seconds
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
      env.gain.setValueAtTime(0, ctx.currentTime);
      env.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.5);
      env.gain.setValueAtTime(0.5, ctx.currentTime + 1.5);
      env.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
      
      noise.connect(filter);
      filter.connect(env);
      env.connect(gainNode);
      
      noise.start();
      noise.stop(ctx.currentTime + 2);
      break;
    }
    case 'birds': {
      // FM synthesis for bird chirp
      const carrier = ctx.createOscillator();
      const modulator = ctx.createOscillator();
      
      carrier.type = 'sine';
      modulator.type = 'sine';
      
      // Sweep carrier frequency up
      carrier.frequency.setValueAtTime(2000, ctx.currentTime);
      carrier.frequency.exponentialRampToValueAtTime(4000, ctx.currentTime + 0.2);
      
      modulator.frequency.value = 10;
      
      const modGain = ctx.createGain();
      modGain.gain.value = 500;
      
      const env = ctx.createGain();
      env.gain.setValueAtTime(0, ctx.currentTime);
      env.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
      env.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      
      modulator.connect(modGain);
      modGain.connect(carrier.frequency);
      
      carrier.connect(env);
      env.connect(gainNode);
      
      modulator.start();
      carrier.start();
      modulator.stop(ctx.currentTime + 0.3);
      carrier.stop(ctx.currentTime + 0.3);
      break;
    }
    case 'sine': {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      
      const env = ctx.createGain();
      env.gain.setValueAtTime(0, ctx.currentTime);
      env.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.1);
      env.gain.setValueAtTime(1, ctx.currentTime + 0.4);
      env.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      
      osc.connect(env);
      env.connect(gainNode);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
      break;
    }
    default:
      break;
  }
};
