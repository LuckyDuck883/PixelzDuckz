import * as THREE from 'three';

// 1. Scene & Camera Setup
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

// 3. Create the World (Grid of Grass)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const grassMat = new THREE.MeshLambertMaterial({ color: 0x567d46 });

for(let x = -10; x < 10; x++) {
    for(let z = -10; z < 10; z++) {
        const cube = new THREE.Mesh(geometry, grassMat);
        cube.position.set(x, -1, z);
        scene.add(cube);
    }
}

// 4. Movement Variables
const keys = {};
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
camera.position.y = 1.6; // Human eye level

// 5. Controls Logic
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

// Click to lock mouse (Required for FPS controls)
document.body.addEventListener('click', () => {
    document.body.requestPointerLock();
});

// Look around with mouse
document.addEventListener('mousemove', (e) => {
    if (document.pointerLockElement === document.body) {
        camera.rotation.y -= e.movementX * 0.002;
        camera.rotation.x -= e.movementY * 0.002;
        camera.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, camera.rotation.x));
    }
});

// 6. Game Loop (Movement Update)
function animate() {
    requestAnimationFrame(animate);

    if (document.pointerLockElement === document.body) {
        const speed = 0.1;
        if (keys['KeyW']) camera.translateZ(-speed);
        if (keys['KeyS']) camera.translateZ(speed);
        if (keys['KeyA']) camera.translateX(-speed);
        if (keys['KeyD']) camera.translateX(speed);
        
        // Keep player on the ground (Optional: Remove to "Fly")
        camera.position.y = 1.6; 
    }

    renderer.render(scene, camera);
}

// Fix screen resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
