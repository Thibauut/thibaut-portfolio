import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSunlight();
  }

  setSunlight() {
    this.sunlight = new THREE.DirectionalLight("#ffffff", 4.5);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.camera.far = 20;
    this.sunlight.shadow.mapSize.set(4096, 4096);
    this.sunlight.shadow.normalBias = 0.05;
    // const cameraHelper = new THREE.CameraHelper(this.sunlight.shadow.camera);
    // this.scene.add(cameraHelper);
    this.sunlight.position.set(-1, 7, 5.5);

    // Adjust the shadow camera area to make it bigger
    this.sunlight.shadow.radius = 30;
    this.sunlight.penumbra = 0.3;

    this.scene.add(this.sunlight);

    this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientLight);
  }

  resize() {}

  update() {}
}
