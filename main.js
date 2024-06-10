import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import Timer from "./src/Timer.js";
import getSolarSystem from "./src/SolarSystem.js";

const width = window.innerWidth;
const height = window.innerHeight;
const aspectRation = width / height;
const fieldOfView = 50;
const near = 10;
const far = 16000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  fieldOfView,
  aspectRation,
  near,
  far
);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );

const solarSystem = getSolarSystem(scene);

const celestialObjects = [
  ...solarSystem
];

camera.position.set(0,25,145);
controls.update();

renderer.shadowMap.enabled = true;

document.addEventListener('keydown', function(event) {
  handleKeyDown(event);
});

function handleKeyDown(event) {
  switch (event.key) {
    case 'w':
        controls.object.position.z -= 1;
        break;
    case 's':
        controls.object.position.z += 1;
        break;
    case 'a':
        controls.object.position.x -= 1;
        break;
    case 'd':
        controls.object.position.x += 1;
        break;
    case 'q':  
        controls.object.position.y += 1;
        break;
    case 'e':   
        controls.object.position.y -= 1;
        break;
}
  
}
function main() {
  const timer = new Timer();

  timer.update = function update(deltaTime) {
    celestialObjects.forEach((celestialObject) => {
      celestialObject.update(deltaTime);
    });
    controls.update();
    renderer.render(scene, camera);
  }

  timer.start();
}

main();
