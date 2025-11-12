// ✅ Use absolute CDN URLs for browser-friendly module imports
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js";

// === Typewriter effect ===
const typeText = "hi! i'm anshul";
const typeTarget = document.querySelector("header");
let i = 0;
function typeWriter() {
  if (i < typeText.length) {
    typeTarget.textContent += typeText.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  } else {
    setTimeout(() => {
      typeTarget.textContent = "";
      i = 0;
      typeWriter();
    }, 2500);
  }
}
typeWriter();

// === Scene setup ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2.2;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("model"),
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;

// === Orbit Controls for click and drag ===
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = false;
controls.minDistance = 1.5;
controls.maxDistance = 4;

// === Lighting ===
scene.add(new THREE.AmbientLight(0xffffff, 1.2));
const pointLight = new THREE.PointLight(0xa05eff, 6, 10);
pointLight.position.set(0, 2, 2);
scene.add(pointLight);

// === Load GLB model ===
const loader = new GLTFLoader();
let loadedModel = null;
let brainOrb, handOrb, heartOrb;
let orbData = [];

// Create glowing orb
function createGlowingOrb(color = 0xa05eff, size = 0.08) {
  // Main orb sphere
  const geometry = new THREE.SphereGeometry(size, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.8
  });
  const orb = new THREE.Mesh(geometry, material);
  
  // Outer glow
  const glowGeometry = new THREE.SphereGeometry(size * 1.5, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.3,
    side: THREE.BackSide
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  orb.add(glow);
  
  // Add point light for extra glow
  const light = new THREE.PointLight(color, 2, 2);
  orb.add(light);
  
  return orb;
}

loader.load(
  "./model.glb",
  (gltf) => {
    console.log("✅ Model file loaded successfully!", gltf);
    
    // Load as regular GLTF/GLB
    loadedModel = gltf.scene;
    loadedModel.position.set(0, -0.9, 0);
    loadedModel.scale.set(1, 1, 1);
    
    // Apply purple glow effect to materials
    loadedModel.traverse((child) => {
      if (child.isMesh) {
        if (child.material) {
          // Enable emissive glow
          if (child.material.emissive) {
            child.material.emissive = new THREE.Color(0xa05eff);
            child.material.emissiveIntensity = 0.25;
          }
        }
      }
    });
    
    scene.add(loadedModel);
    
    // Create glowing orbs near body parts
    // Note: Model is at Y: -0.9, so positions are relative to model center
    
    // Brain orb - right side of head (top of model)
    brainOrb = createGlowingOrb(0xa05eff, 0.06);
    brainOrb.position.set(0.25, 1.1, 0.25);
    brainOrb.userData = { 
      name: 'my projects',
      url: 'projects.html',
      basePosition: new THREE.Vector3(0.25, 1.1, 0.25),
      orbitRadius: 0.05,
      orbitSpeed: 0.8,
      angle: 0
    };
    loadedModel.add(brainOrb);
    
    // Hand orb - left hand area (shoulder/arm level)
    handOrb = createGlowingOrb(0xa05eff, 0.06);
    handOrb.position.set(-0.4, 0.5, 0.25);
    handOrb.userData = { 
      name: 'my work experience',
      url: 'work.html',
      basePosition: new THREE.Vector3(-0.4, 0.5, 0.25),
      orbitRadius: 0.05,
      orbitSpeed: 1.0,
      angle: Math.PI / 3
    };
    loadedModel.add(handOrb);
    
    // Waist orb - waist/hip area (middle of body)
    heartOrb = createGlowingOrb(0xa05eff, 0.06);
    heartOrb.position.set(0.2, 0.2, 0.25);
    heartOrb.userData = { 
      name: 'my learnings',
      url: 'learnings.html',
      basePosition: new THREE.Vector3(0.2, 0.2, 0.25),
      orbitRadius: 0.05,
      orbitSpeed: 0.9,
      angle: Math.PI * 2 / 3
    };
    loadedModel.add(heartOrb);
    
    orbData = [brainOrb, handOrb, heartOrb];
    
    console.log("✅ Model added to scene with glowing orbs");
  },
  (progress) => {
    if (progress.total > 0) {
      console.log(`Loading progress: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
    }
  },
  (error) => {
    console.error("❌ Model load error:", error);
    console.log("Please ensure model.glb file exists in the same directory");
    console.log("Current URL:", window.location.href);
    console.log("Trying to load from:", new URL("./model.glb", window.location.href).href);
  }
);

// === Particles ===
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500; // Increased from 250
const posArray = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}
particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.035, // Increased from 0.02
  color: 0xa05eff,
  transparent: true,
  opacity: 0.85, // Increased from 0.6
  blending: THREE.AdditiveBlending, // Add glow effect
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// === Animate orbs ===
function animateOrbs(time) {
  orbData.forEach(orb => {
    if (!orb.userData) return;
    
    const data = orb.userData;
    data.angle += 0.01 * data.orbitSpeed;
    
    // Circular orbit animation
    const offsetX = Math.cos(data.angle) * data.orbitRadius;
    const offsetY = Math.sin(data.angle) * data.orbitRadius * 0.5; // Elliptical
    const offsetZ = Math.sin(data.angle) * data.orbitRadius * 0.3;
    
    orb.position.x = data.basePosition.x + offsetX;
    orb.position.y = data.basePosition.y + offsetY;
    orb.position.z = data.basePosition.z + offsetZ;
    
    // Pulse effect
    const scale = 1 + Math.sin(time * 0.003) * 0.1;
    orb.scale.set(scale, scale, scale);
  });
}

// === Raycaster for orb interaction ===
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredOrb = null;

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(orbData, true);
  
  const orbLabel = document.getElementById('orb-label');
  
  if (intersects.length > 0) {
    let orb = intersects[0].object;
    // Find the parent orb (in case we hit the glow)
    while (orb.parent && !orb.userData.name) {
      orb = orb.parent;
    }
    
    if (orb.userData.name) {
      hoveredOrb = orb;
      document.body.style.cursor = 'pointer';
      
      // Show label
      orbLabel.textContent = orb.userData.name;
      orbLabel.style.left = event.clientX + 15 + 'px';
      orbLabel.style.top = event.clientY + 15 + 'px';
      orbLabel.classList.add('visible');
      
      // Scale up orb
      orb.scale.set(1.3, 1.3, 1.3);
    }
  } else {
    if (hoveredOrb) {
      hoveredOrb.scale.set(1, 1, 1);
      hoveredOrb = null;
    }
    document.body.style.cursor = 'default';
    orbLabel.classList.remove('visible');
  }
}

function onMouseClick(event) {
  if (hoveredOrb && hoveredOrb.userData.url) {
    window.location.href = hoveredOrb.userData.url;
  }
}

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('click', onMouseClick);

// === Animation loop ===
function animate(time) {
  requestAnimationFrame(animate);
  
  // Rotate particles
  particlesMesh.rotation.y += 0.0005;
  
  // Auto-rotate the model slowly
  if (loadedModel) {
    loadedModel.rotation.y += 0.002;
  }
  
  // Animate orbs
  animateOrbs(time);
  
  // Update orbit controls
  controls.update();
  
  renderer.render(scene, camera);
}
animate();

// === Handle resize ===
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateConnectorLines();
});
