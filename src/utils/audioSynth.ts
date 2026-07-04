// Ambient Romantic Wedding Synthesizer using Web Audio API
class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: any = null;
  private gainNode: GainNode | null = null;

  // Pentatonic romantic chord frequencies (C Major / A Minor romantic arpeggios)
  private notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99];

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);

      this.isPlaying = true;
      this.scheduleNextChime();
    } catch (err) {
      console.warn('Audio Context start blocked or unsupported', err);
    }
  }

  private scheduleNextChime = () => {
    if (!this.isPlaying || !this.ctx || !this.gainNode) return;

    // Play a gentle romantic harp note
    const note = this.notes[Math.floor(Math.random() * this.notes.length)];
    this.playChime(note);

    // Occasionally play a harmonizing lower bass note
    if (Math.random() > 0.6) {
      this.playChime(note / 2, 0.08, 4.0);
    }

    const nextInterval = 1200 + Math.random() * 2000;
    this.timerId = setTimeout(this.scheduleNextChime, nextInterval);
  };

  private playChime(freq: number, volume = 0.12, duration = 3.5) {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(volume, now + 0.3);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + duration);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioPlayer();
