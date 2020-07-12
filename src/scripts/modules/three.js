import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

const three = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 0.6;
  camera.position.y = 0.05;

  const settings = {
    displacementScale: 0,
    wireframe: false,
  };

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const texture = new THREE.TextureLoader().load(
    'assets/images/textures/depth-test.jpg',
  );
  const material = new THREE.MeshDepthMaterial({
    wireframe: false,
    displacementMap: texture,
    displacementScale: 0,
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

  const gui = new GUI();
  gui
    .add(settings, 'displacementScale')
    .min(0)
    .max(0.2)
    .onChange(value => {
      material.displacementScale = value;
    });
  gui.add(settings, 'wireframe').onChange(value => {
    material.wireframe = value;
  });
};

export default three;
