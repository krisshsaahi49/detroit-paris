<template>
  <div ref="stage" class="three-stage" aria-label="Interactive Detroit visual system"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import * as THREE from "three";

const stage = ref(null);
let renderer;
let scene;
let camera;
let frameId;
let heroGroup;
let particleSystem;
let baseCameraZ = 7.8;
let scrollProgress = 0;
const pointer = new THREE.Vector2();
const targetPointer = new THREE.Vector2();

const makePlane = (texture, x, y, z, width, height, rotation = 0) => {
  const geometry = new THREE.PlaneGeometry(width, height, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.94,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.rotation.set(0, 0, rotation);
  heroGroup.add(mesh);
  return mesh;
};

const updateSize = () => {
  if (!stage.value || !renderer || !camera) return;
  const { width, height } = stage.value.getBoundingClientRect();
  renderer.setSize(width, height, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  baseCameraZ = width < 620 ? 10.8 : 8.15;
  const scale = width < 620 ? 0.68 : width < 980 ? 0.84 : 1;
  heroGroup?.scale.set(scale, scale, scale);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

const updateScroll = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
};

const onPointerMove = (event) => {
  targetPointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
  targetPointer.y = (event.clientY / window.innerHeight - 0.5) * -2;
};

const animate = (time = 0) => {
  pointer.lerp(targetPointer, 0.06);

  heroGroup.rotation.y = pointer.x * 0.12 + Math.sin(time * 0.00018) * 0.08;
  heroGroup.rotation.x = pointer.y * 0.08 + Math.cos(time * 0.00015) * 0.04;
  heroGroup.position.z = scrollProgress * 2.2;

  particleSystem.rotation.y += 0.0014;
  particleSystem.rotation.x = pointer.y * 0.08;
  camera.position.z = baseCameraZ - scrollProgress * 1.4;
  camera.position.x += (pointer.x * 0.28 - camera.position.x) * 0.05;
  camera.position.y += (pointer.y * 0.18 - camera.position.y) * 0.05;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
  frameId = requestAnimationFrame(animate);
};

onMounted(() => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 7.8);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.value.appendChild(renderer.domElement);

  heroGroup = new THREE.Group();
  scene.add(heroGroup);

  const loader = new THREE.TextureLoader();
  const textures = [
    "/assets/ojai.webp",
    "/assets/marly.webp",
    "/assets/lamer.webp",
    "/assets/alice.webp",
    "/assets/noah.jpg",
  ].map((src) => {
    const texture = loader.load(src);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  makePlane(textures[0], -2.45, 0.95, -0.5, 1.55, 2.05, -0.08);
  makePlane(textures[1], 1.9, 1.15, -0.1, 1.8, 2.15, 0.09);
  makePlane(textures[2], 2.85, -0.75, -0.65, 1.18, 1.5, -0.14);
  makePlane(textures[3], -0.6, -1.15, 0.18, 1.35, 1.75, 0.1);
  makePlane(textures[4], 0.72, 0.05, 0.52, 1.75, 2.35, -0.03);

  const ring = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.5, 0.035, 220, 12, 2, 5),
    new THREE.MeshBasicMaterial({ color: 0x090909, wireframe: true, transparent: true, opacity: 0.36 }),
  );
  ring.scale.set(1.35, 1.35, 1.35);
  heroGroup.add(ring);

  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 900;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    const radius = 2.7 + Math.random() * 2.2;
    const angle = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 4.8;
    positions[i * 3 + 2] = Math.sin(angle) * radius - 1.8;
  }
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particleSystem = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({ color: 0x7a3038, size: 0.018, transparent: true, opacity: 0.62 }),
  );
  scene.add(particleSystem);

  updateSize();
  updateScroll();
  animate();
  window.addEventListener("resize", updateSize);
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });
});

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId);
  window.removeEventListener("resize", updateSize);
  window.removeEventListener("scroll", updateScroll);
  window.removeEventListener("pointermove", onPointerMove);
  renderer?.dispose();
});
</script>
