/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
init();
async function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xf3f3f3);
  document.body.appendChild(renderer.domElement);

  function mapRand(min, max, isInt = false) {
    let rand = Math.random() * (max - min) + min;
    rand = isInt ? Math.round(rand) : rand;
    return rand;
  }
  const meshes = [],
    MESH_NUM = 50,
    POS_RANGE = 100,
    MAX_SCALE = 1.5;

  function randomMesh() {
    const geometries = [
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.PlaneGeometry(20, 20),
      new THREE.TorusGeometry(10, 3, 200, 20),
    ];
    const color = new THREE.Color(
      mapRand(0.7, 1),
      mapRand(0.7, 1),
      mapRand(0.7, 1)
    );
    const pos = {
      x: mapRand(-POS_RANGE, POS_RANGE),
      y: mapRand(-POS_RANGE, POS_RANGE),
      z: mapRand(-POS_RANGE, POS_RANGE),
    };
    const material = new THREE.MeshLambertMaterial({ color });
    const gIndex = mapRand(0, geometries.length - 1, true);
    const mesh = new THREE.Mesh(geometries[gIndex], material);
    mesh.position.set(pos.x, pos.y, pos.z);
    const scale = mapRand(1, MAX_SCALE);
    mesh.geometry.scale(scale, scale, scale);
    return mesh;
  }

  for (let i = 0; i < MESH_NUM; i++) {
    const mesh = randomMesh();
    meshes.push(mesh);
  }

  scene.add(...meshes);

  const axis = new THREE.AxesHelper(20);
  scene.add(axis);

  camera.position.z = 30;

  const control = new OrbitControls(camera, renderer.domElement);

  //light setting
  const malight = new THREE.AmbientLight(0xe4e4e4, 0.01);
  scene.add(malight);

  const light1 = new THREE.PointLight(0xe4e4e4);
  light1.position.set(10, 100, 110);
  const helper1 = new THREE.PointLightHelper(light1);
  scene.add(light1, helper1);

  const light2 = new THREE.PointLight(0xeeeeee, 1, 400);
  light2.position.set(-100, 100, 210);
  const helper2 = new THREE.PointLightHelper(light2);

  scene.add(light2, helper2);

  let i = 0;
  function animate() {
    requestAnimationFrame(animate);

    // ??????
    // mesh1.rotation.x += 0.01;
    // mesh1.rotation.y += 0.01;
    // mesh2.rotation.z += 0.01;
    // mesh3.rotation.y += 0.01;

    // mesh.rotateX(0.01);

    // ????????????
    // mesh.position.x += 0.02;
    // mesh.position.y += 0.02;
    // mesh.position.z += 0.02;
    // mesh.position.set(10, 0, 0);
    // geometry.translate(0.01,0.01,0.01);

    // ????????????
    // mesh.scale.x += 0.002;
    // mesh.scale.y += 0.002;
    // geometry.scale(1.02, 1, 1);
    control.update();

    renderer.render(scene, camera);
  }

  animate();
}
