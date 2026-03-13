class RadioService {
  private listeners: ((playing: boolean) => void)[] = [];
  private isPlaying = false;
  private audio: HTMLAudioElement | null = null;
  private audioUrl = "https://stm39.srvstm.com:8758/stream"; //trocar stream 
  private isGlobalPlayerActive = false;

  private getAudio(): HTMLAudioElement {
    if (!this.audio) {
      this.audio = new Audio(this.audioUrl);
    }
    return this.audio;
  }

  getPlayingState() {
    return this.isPlaying;
  }

  subscribe(callback: (playing: boolean) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((fn) => fn !== callback);
    };
  }

  play() {
    this.getAudio().play();
    this.isPlaying = true;
    this.emit();

    // 🔹 Ativa o PlayerGlobal (fica salvo mesmo após mudar de rota)
    this.activateGlobalPlayer();
  }

  pause() {
    this.getAudio().pause();
    this.isPlaying = false;
    this.emit();
  }

  toggle() {
    this.isPlaying ? this.pause() : this.play();
  }

  setVolume(vol: number) {
    this.getAudio().volume = vol;
  }

  private emit() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  // 🔹 Controle global do PlayerGlobal
  activateGlobalPlayer() {
    this.isGlobalPlayerActive = true;
    localStorage.setItem("playerGlobalActive", "true");
  }

  getGlobalPlayerActive() {
    return (
      this.isGlobalPlayerActive ||
      localStorage.getItem("playerGlobalActive") === "true"
    );
  }

  resetGlobalPlayer() {
    this.isGlobalPlayerActive = false;
    localStorage.removeItem("playerGlobalActive");
  }
}

export const radioService = new RadioService();
