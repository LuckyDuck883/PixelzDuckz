import * as THREE from 'three';

// 1. Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040, 2));

// 3. Setup Block Logic
const geometry = new THREE.BoxGeometry(1, 1, 1);
const grassMat = new THREE.MeshLambertMaterial({ color: 0x567d46 });
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0); // Center of screen

// Initial Floor
for(let x = -10; x < 10; x++) {
    for(let z = -10; z < 10; z++) {
        const cube = new THREE.Mesh(geometry, grassMat);
        cube.position.set(x, -1, z);
        scene.add(cube);
    }
}

// 4. Controls & Movement
const keys = {};
camera.position.set(0, 1.6, 5);

document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

document.body.addEventListener('mousedown', (e) => {
    // Left click to lock mouse
    if (document.pointerLockElement !== document.body) {
        document.body.requestPointerLock();
        return;
    }

    // Right click (button 2) to build
    if (e.button === 2) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
            const intersect = intersects[0];
            const newBlock = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x8B4513 })); // Wood/Dirt color
            
            // Math to place block on the face we hit
            newBlock.position.copy(intersect.object.position).add(intersect.face.normal);
            scene.add(newBlock);
        }
    }
});

// Disable context menu so right-click works for building
window.addEventListener('contextmenu', (e) => e.preventDefault());

document.addEventListener('mousemove', (e) => {
    if (document.pointerLockElement === document.body) {
        camera.rotation.y -= e.movementX * 0.002;
        camera.rotation.x -= e.movementY * 0.002;
        camera.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, camera.rotation.x));
    }
});

// 5. Game Loop
function animate() {
    requestAnimationFrame(animate);

    if (document.pointerLockElement === document.body) {
        const speed = 0.1;
        // Simple WASD movement relative to camera look direction
        const direction = new THREE.Vector3();
        const frontVector = new THREE.Vector3(0, 0, (keys['KeyS'] ? 1 : 0) - (keys['KeyW'] ? 1 : 0));
        const sideVector = new THREE.Vector3((keys['KeyD'] ? 1 : 0) - (keys['KeyA'] ? 1 : 0), 0, 0);
        
        camera.translateZ(frontVector.z * speed);
        camera.
