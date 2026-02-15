import { Sound, Scene, CreateAudioEngineAsync, CreateSoundAsync, StaticSound, AudioParameterRampShape } from "@babylonjs/core";

export class AudioManager {
    private static instance: AudioManager;
    private currentMusic: StaticSound | null = null;

    private constructor() {
    }

    public async initialize() {
        const audioEngine = await CreateAudioEngineAsync();
        await audioEngine.unlockAsync();
    }

    public static getInstance(scene?: Scene): AudioManager {
        if (!AudioManager.instance && scene) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    public async playMusic(key: string) {
        if (this.currentMusic && this.currentMusic.name === key) return;

        if (this.currentMusic) {
            this.currentMusic.setVolume(0, { duration: 2000, shape: AudioParameterRampShape.Logarithmic });
        }
        console.log(`Playing music: ${key}`);
        const music = await CreateSoundAsync(key, `/sounds/${key}.mp3`, {
            loop: true,
            autoplay: true,
            volume: 0
        });

        music.setVolume(1, { duration: 2000, shape: AudioParameterRampShape.Logarithmic });
        this.currentMusic = music;
    }

    public toggleMute(muted: boolean) {
        if (this.currentMusic) {
            if (muted) this.currentMusic.setVolume(0);
            else this.currentMusic.setVolume(1);
        }
    }
}