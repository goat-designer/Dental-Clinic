import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/controls/OrbitControls.js';

// Initialize the tooth model when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if the container exists
  const container = document.getElementById('tooth-model-container');
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f9ff); // Light blue background matching the site

  // Camera setup
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Controls setup
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1;

  // Lighting setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Create a basic tooth model
  function createTooth() {
    // Create the main body of the tooth
    const toothGeometry = new THREE.CylinderGeometry(1, 0.8, 2, 32);
    const toothMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      shininess: 100
    });
    const tooth = new THREE.Mesh(toothGeometry, toothMaterial);
    
    // Create the top part of the tooth (crown)
    const crownGeometry = new THREE.SphereGeometry(1, 32, 32);
    const crownMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xf5f5f5,
      shininess: 100
    });
    const crown = new THREE.Mesh(crownGeometry, crownMaterial);
    crown.position.y = 1;
    crown.scale.set(1, 0.5, 1);
    
    // Create the root
    const rootGeometry = new THREE.ConeGeometry(0.8, 1.5, 32);
    const rootMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xf0f0f0,
      shininess: 50
    });
    const root = new THREE.Mesh(rootGeometry, rootMaterial);
    root.position.y = -1.5;
    root.rotation.x = Math.PI;
    
    // Group all parts together
    const toothGroup = new THREE.Group();
    toothGroup.add(tooth);
    toothGroup.add(crown);
    toothGroup.add(root);
    
    // Add slight rotation for better initial view
    toothGroup.rotation.x = -0.2;
    
    return toothGroup;
  }

  const tooth = createTooth();
  scene.add(tooth);

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  
  animate();
}); 