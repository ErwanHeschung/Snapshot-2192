import {
    Scene,
    FreeCamera,
    Vector3,
    Mesh,
    MeshBuilder,
    Camera,
    Viewport,
    float
} from "@babylonjs/core";

export class Minimap {

    private scene: Scene;
    private camera: FreeCamera;
    private player: Mesh;
    private frame: HTMLDivElement;
    private marker: HTMLImageElement;
    private camera_X: float = 0.80;
    private camera_Y: float = 0.80;
    private camera_W: float = 0.18;
    private camera_H: float = 0.18;

    constructor(scene: Scene, player?: Mesh) {
        console.log("Initializing Minimap");
        this.scene = scene;
        this.player = player || this.createFakePlayer(scene);
        this.camera = new FreeCamera(
            "minimapCamera",
            new Vector3(0, 50, 0),
            scene
        );

        this.camera.setTarget(this.player.position);
        this.camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        const orthoSize = 20;
        this.camera.orthoLeft   = -orthoSize;
        this.camera.orthoRight  =  orthoSize;
        this.camera.orthoTop    =  orthoSize;
        this.camera.orthoBottom = -orthoSize;

        this.camera.viewport = new Viewport(this.camera_X, this.camera_Y, this.camera_W, this.camera_H);

        if (!scene.activeCameras) {
            scene.activeCameras = [];
        }
        scene.activeCameras.push(this.camera);

        this.frame = this.createFrame();
        this.marker = this.createMarker();
    }

    private createFrame(): HTMLDivElement {
        const frame = document.createElement("div");
        const paddingTop  = (1 - this.camera_Y - this.camera_H) * 100;
        const paddingLeft = this.camera_X * 100;

        Object.assign(frame.style, {
            position:        "absolute",
            top:             `${paddingTop}%`,
            left:            `${paddingLeft}%`,
            width:           `${this.camera_W * 100}%`,
            height:          `${this.camera_H * 100}%`,
            border:          "2px solid #3d0be4",
            borderRadius:    "4px",
            boxShadow:       "0 0 8px #2518e3, inset 0 0 4px rgba(32, 63, 239, 0.15)",
            boxSizing:       "border-box",
            zIndex:          "10",
        });

        document.body.appendChild(frame);
        return frame;
    }

    private createMarker(): HTMLImageElement {
        const img = document.createElement("img");
        img.src = "/playerPointer.png";

        Object.assign(img.style, {
            position:        "absolute",
            top:             "50%",
            left:            "50%",
            width:           "20px",
            height:          "20px",
            transform:       "translate(-50%, -50%) rotate(0deg)",
            transformOrigin: "center center",
            pointerEvents:   "none",
            imageRendering:  "pixelated",
        });

        this.frame.appendChild(img);
        return img;
    }

    createFakePlayer(scene: Scene): Mesh {
        const player = MeshBuilder.CreateBox("player", { size: 1 }, scene);
        player.position = new Vector3(0, 1, 0);
        return player;
    }

    update() {
        if (this.player) {
            this.camera.setTarget(this.player.position);
            const angleDeg = (this.player.rotation.y * 180) / Math.PI;
            this.marker.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg)`;
        }
    }

    dispose() {
        this.marker.remove();
        this.frame.remove();
        this.camera.dispose();
    }
}