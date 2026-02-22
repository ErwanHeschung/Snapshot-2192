import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { AudioManager } from "./engine/AudioManager";
import { GamePhase, GameState } from "./engine/GameState";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { AppendSceneAsync, Color3, HemisphericLight, ImportMeshAsync } from "@babylonjs/core";
import { setupMenu } from "./scenes/MenuScene";
import { Minimap } from "./engine/MiniMap";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);
const scene = new Scene(engine);
let minimap: Minimap;

var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 1, Vector3.Zero(), scene);
camera.attachControl(canvas, true);
scene.activeCameras = [camera];

const audioManager = AudioManager.getInstance(scene);
const state = GameState.Instance;

let alpha = 0;

engine.runRenderLoop(() => {
    if (state.currentPhase === GamePhase.MENU) {
        alpha += 0.005;
        camera.alpha = (Math.PI / 2) + (Math.sin(alpha) * 0.2);
    }
    else if (state.currentPhase === GamePhase.PLAYING) {
        if (minimap) {
            minimap.update();
        }
    }
    scene.render();
});

state.onPhaseChange.add(async (phase) => {
    clearScene();
    switch (phase) {
        case GamePhase.MENU:
            console.log("Setting up MENU...");
            audioManager.playMusic("menu_theme");
            setupMenu(scene, camera);
            break;

        case GamePhase.PLAYING:
            console.log("Setting up GAME...");
            audioManager.playMusic("game_theme");
            minimap = new Minimap(scene);
            break;
    }
});

(async () => {
    await audioManager.initialize();
})();

state.setPhase(GamePhase.MENU);

function clearScene() {
    while (scene.meshes.length > 0) {
        scene.meshes[0].dispose();
    }
    while (scene.lights.length > 0) {
        scene.lights[0].dispose();
    }
}
