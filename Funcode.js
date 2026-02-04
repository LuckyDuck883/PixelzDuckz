import * as THREE from 'three';

// --- INITIALIZATION ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(5, 10, 7.5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040, 0.8));

// --- GAME STATE ---
const geometry = new THREE.BoxGeometry(1, 1, 1);
const grassMat = new THREE.MeshLambertMaterial({ color: 0x567d46 });
const playerBlocks = [];
const keys = {};
let verticalVelocity = 0;
let isJumping = false;

// --- PROCEDURAL WORLD GEN ---
function generateWorld() {
    const size = 15;
    for(let x = -size; x < size; x++) {
        for(let z = -size; z < size; z++) {
            const y = Math.floor(Math.sin(x * 0.3) * 2 + Math.cos(z * 0.3) * 2);
            const cube = new THREE.Mesh(geometry, grassMat);
            cube.position.set(x, y, z);
            scene.add(cube);
            
            // Random Trees
            if (Math.random() > 0.96) spawnTree(x, y, z);
        }
    }
}

function spawnTree(x, y, z) {
    const logMat = new THREE.MeshLambertMaterial({ color: 0x5C4033 });
    const leafMat = new THREE.MeshLambertMaterial({ color: 0x228B22 });
    for (let i = 1; i <= 3; i++) {
        const log = new THREE.Mesh(geometry, logMat);
        log.position.set(x, y + i, z);
        scene.add(log);
        playerBlocks.push(log);
    }
    const leaves = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 3), leafMat);
    leaves.position.set(x, y + 5, z);
    scene.add(leaves);
    playerBlocks.push(leaves);
}

// --- CONTROLS ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0);

document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if (e.code === 'KeyR') location.reload();
    if (e.code === 'KeyG') explode();
});
document.addEventListener('keyup', (e) => keys[e.code] = false);

document.body.addEventListener('mousedown', (e) => {
    if (document.pointerLockElement !== document.body) {
        document.body.requestPointerLock();
    } else if (e.button === 2) {
        buildBlock();
    }
});

function buildBlock() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        const i = intersects[0];
        const b = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x8B4513 }));
        b.position.copy(i.object.position).add(i.face.normal);
        scene.add(b);
        playerBlocks.push(b);
    }
}

function explode() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        const center = intersects[0].object.position;
        for (let i = playerBlocks.length - 1; i >= 0; i--) {
            if (playerBlocks[i].position.distanceTo(center) < 4) {
                scene.remove(playerBlocks[i]);
                playerBlocks.splice(i, 1);
            }
        }
    }
}

document.addEventListener('mousemove', (e) => {
    if (document.pointerLockElement === document.body) {
        camera.rotation.y -= e.movementX * 0.002;
        camera.rotation.x -= e.movementY * 0.002;
        camera.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, camera.rotation.x));
    }
});

// --- MAIN LOOP ---
function animate() {
    requestAnimationFrame(animate);
    
    // Physics & Movement
    if (document.pointerLockElement === document.body) {
        const speed = 0.12;
        if (keys['KeyW']) camera.translateZ(-speed);
        if (keys['KeyS']) camera.translateZ(speed);
        if (keys['KeyA']) camera.translateX(-speed);
        if (keys['KeyD']) camera.translateX(speed);

        if (keys['Space'] && !isJumping) {
            verticalVelocity = 0.15;
            isJumping = true;
        }
        verticalVelocity -= 0.008; // Gravity
        camera.position.y += verticalVelocity;

        if (camera.position.y < 2) {
            camera.position.y = 2;
            verticalVelocity = 0;
            isJumping = false;
        }
    }

    // Day/Night Cycle
    const t = Date.now() * 0.0005;
    scene.background = new THREE.Color().setHSL(0.6, 0.5, Math.max(0.1, Math.sin(t) * 0.5 + 0.5));
    
    renderer.render(scene, camera);
}

generateWorld();
animate();
