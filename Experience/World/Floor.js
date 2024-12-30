import * as THREE from "three";

import Experience from "../Experience";

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
        this.setCircles();
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: "#fad21e",
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = -Math.PI / 2;
        this.plane.position.y = -0.2;
        this.plane.receiveShadow = true;
    }

    setCircles() {
        this.geometry = new THREE.CircleGeometry(5, 64);

        this.circleMaterial = new THREE.MeshStandardMaterial({ color: "#050d14" });
        this.circle = new THREE.Mesh(this.geometry, this.circleMaterial);
        this.circle.position.y = -0.18;
        this.circle.scale.set(0, 0, 0);
        this.circle.rotation.x = -Math.PI / 2;
        this.circle.receiveShadow = true;
        this.scene.add(this.circle);

        this.circleMaterial2 = new THREE.MeshStandardMaterial({ color: "#2a4607" });
        this.circle2 = new THREE.Mesh(this.geometry, this.circleMaterial2);
        this.circle2.position.y = -0.17;
        this.circle2.position.x = 2.447;
        this.circle2.scale.set(0, 0, 0);
        this.circle2.rotation.x = -Math.PI / 2;
        this.circle2.receiveShadow = true;
        this.scene.add(this.circle2);

        this.circleMaterial3 = new THREE.MeshStandardMaterial({ color: "#2f0405" });
        this.circle3 = new THREE.Mesh(this.geometry, this.circleMaterial3);
        this.circle3.position.y = -0.16;
        this.circle3.position.x = -0.847;
        this.circle3.position.z = 1.717;
        this.circle3.scale.set(0, 0, 0);
        this.circle3.rotation.x = -Math.PI / 2;
        this.circle3.receiveShadow = true;
        this.scene.add(this.circle3);

        this.circleMaterial4 = new THREE.MeshStandardMaterial({ color: "#0b1328" });
        this.circle4 = new THREE.Mesh(this.geometry, this.circleMaterial4);
        this.circle4.position.y = -0.15;
        this.circle4.position.x = -2-.247;
        this.circle4.position.z = 1.017;
        this.circle4.scale.set(0, 0, 0);
        this.circle4.rotation.x = -Math.PI / 2;
        this.circle4.receiveShadow = true;
        this.scene.add(this.circle4);
    }

    resize() {}

    update() {}
}
