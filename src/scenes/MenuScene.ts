import { Scene, Vector3, HemisphericLight, SceneLoader, Color3, ArcRotateCamera, ImportMeshAsync, Color4 } from "@babylonjs/core";

export async function setupMenu(scene: Scene, camera: ArcRotateCamera) {
    let alpha = 0;
    const result = await ImportMeshAsync("/menu/spawn.glb", scene);

    const rootMesh = result.meshes[0];

    rootMesh.position = new Vector3(3, -3, -6);
    rootMesh.rotation = new Vector3(0, -Math.PI/2, 0);

    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);


    light.intensity = 0.05;

    light.diffuse = new Color3(0.3, 0, 1);
    light.specular = new Color3(1, 0, 1);
    light.groundColor = new Color3(0.2, 0.2, 0.2); 

    camera.alpha = (Math.PI / 2) + (Math.sin(alpha) * 0.2);
        
    scene.clearColor = new Color4(0.2, 0, 0.3, 0.9);
    return { rootMesh: rootMesh };
}