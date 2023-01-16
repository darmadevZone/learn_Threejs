/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
init();

function mapRand(min, max, isInt = false) {
  let rand = Math.random() * (max - min) + min;
  rand = isInt ? Math.round(rand) : rand;
  return rand;
}

async function init() {
  //scene
  const scene = new THREE.Scene();
  //camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 120;

  //renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // ライト
  const amLight = new THREE.AmbientLight(0x3f3f46);
  scene.add(amLight);

  const pLight = new THREE.PointLight(0xffffff, 1, 200);
  pLight.position.set(-26, 7, 100);
  pLight.castShadow = true;
  pLight.shadow.mapSize.width = 1024;
  pLight.shadow.mapSize.height = 1024;
  scene.add(pLight);

  const dLight = new THREE.DirectionalLight(0xaabbff, 0.5);
  dLight.position.set(0, 0, 3);
  scene.add(dLight);

  // メッシュ
  const X_NUM = 10;
  const y_NUM = 5;
  SCALE = 30;
  COLORS = { MAIN: "#f3f4f6", SUB: "#60a5fa" };
  const BoxGeo = new THREE.BoxGeometry(SCALE, SCALE, SCALE);
  const mainMate = new THREE.MeshLambertMaterial({ color: COLORS.MAIN });
  const subMate = new THREE.MeshLambertMaterial({ color: COLORS.SUB });
  const mesh = new THREE.Mesh(BoxGeo, mainMate);
  scene.add(mesh);

  let Meshes = [];
  for (let y = 0; y <= y_NUM; y++) {
    for (let x = 0; x <= X_NUM; x++) {
      const material = Math.random() < 0.2 ? subMate : mainMate;
      const mesh = new THREE.Mesh(BoxGeo, material);
      mesh.position.x = x * SCALE - (X_NUM * SCALE) / 2;
      mesh.position.y = y * SCALE - (y_NUM * SCALE) / 2;
      mesh.position.z = mapRand(-10, 10);
      mesh.scale.set(0.93, 0.93, 0.93);
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      Meshes.push(mesh);
    }
  }

  scene.add(...Meshes);

  //mouse controll setting
  const control = new OrbitControls(camera, renderer.domElement);

  //asix helper 軸を確認するためのもの
  const axis = new THREE.AxesHelper(500);
  scene.add(axis);

  function animate() {
    requestAnimationFrame(animate);

    control.update();

    renderer.render(scene, camera);
  }

  animate();
}
