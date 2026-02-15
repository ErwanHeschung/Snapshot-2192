import { Observable } from "@babylonjs/core";

export enum GamePhase {
    MENU,
    PLAYING,
    PAUSED,
}

export class GameState {
    private static _instance: GameState;
    public static get Instance() {
        return this._instance || (this._instance = new GameState());
    }

    public currentPhase: GamePhase = GamePhase.MENU;
    public isMusicEnabled: boolean = true;

    public onPhaseChange = new Observable<GamePhase>();

    public setPhase(newPhase: GamePhase) {
        this.currentPhase = newPhase;
        this.onPhaseChange.notifyObservers(this.currentPhase);
    }
}