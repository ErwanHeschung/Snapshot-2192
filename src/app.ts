import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { AudioManager } from "./engine/AudioManager";
import { GamePhase, GameState } from "./engine/GameState";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";

// 1. Setup Engine & Scene
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);
const scene = new Scene(engine);

var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
camera.attachControl(canvas, true);

const audioManager = AudioManager.getInstance(scene);
const state = GameState.Instance;

engine.runRenderLoop(() => {
    scene.render();
});

state.onPhaseChange.add((phase) => {
    switch (phase) {
        case GamePhase.MENU:
            console.log("State Changed: MENU");
            (async () => {
                audioManager.playMusic("menu_theme");
            })();
            break;
        case GamePhase.PLAYING:
            console.log("State Changed: PLAYING");
            (async () => {
                audioManager.playMusic("game_theme");
            })();
            break;
    }
});

(async () => {
    await audioManager.initialize();
    state.setPhase(GamePhase.MENU);
})();