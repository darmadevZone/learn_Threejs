/**
 * Three.js
 * https://threejs.org/
 */
import * as THREE from "three";

//シーン
const scene = new THREE.Scene();
//カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
//body>canvasをさくせい
document.body.appendChild(renderer.domElement);

//ジオメトリー:形を作るもの
// const geometry = new THREE.BoxGeometry();
// const geometry = new THREE.CapsuleGeometry(1, 1, 4, 8);
// const geometry = new THREE.PlaneGeometry();
// const geometry = new THREE.CircleGeometry();
// const geometry = new THREE.SphereGeometry(1.22);
const geometry = new THREE.TorusKnotGeometry();

//material: 色や画像を装飾する
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const material = new THREE.MeshToonMaterial({ color: 0x00ff00 });
const color = new THREE.Color("skyblue"); //red color
const material = new THREE.MeshBasicMaterial({
  color: color,
  transparent: true,
  opacity: 1,
  //   wireframe: true,
});
material.color = new THREE.Color("green");

//geometry+ material -> meshをsceneに追加する。
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

//動かすところ
function animate() {
  requestAnimationFrame(animate);
  // console.log(i++);
  cube.rotation.x = cube.rotation.x + 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
