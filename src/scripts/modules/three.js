import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const three = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 0.4;
  camera.position.y = 0.05;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const material = new THREE.MeshDepthMaterial({
    wireframe: false,
  });

  const loader = new GLTFLoader();
  loader.load('assets/images/scene.gltf', gltf => {
    const model = gltf.scene;
    model.rotation.z = 0.3;
    model.scale.set(0.01, 0.01, 0.01);
    model.traverse(child => {
      child.material = material; // eslint-disable-line no-param-reassign
    });
    scene.add(model);

    const animate = function animate() {
      requestAnimationFrame(animate);
      model.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  });

  window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
};

export default three;
