// --- BLOCK TYPES ---
const blockTypes = {
    1: { name: 'Grass', color: 0x567d46 },
    2: { name: 'Dirt',  color: 0x8B4513 },
    3: { name: 'Stone', color: 0x808080 },
    4: { name: 'Glass', color: 0xADD8E6, opacity: 0.6 }
};

let currentBlockID = 1;

// --- UPDATE KEY LISTENER ---
document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    
    // Switch blocks with 1, 2, 3, 4
    if (['Digit1', 'Digit2', 'Digit3', 'Digit4'].includes(e.code)) {
        currentBlockID = e.code.replace('Digit', '');
        console.log("Selected:", blockTypes[currentBlockID].name);
        // Visual feedback
        document.getElementById('ui').innerHTML = `Selected: <b>${blockTypes[currentBlockID].name}</b>`;
    }
    
    if (e.code === 'KeyR') location.reload();
    if (e.code === 'KeyG') explode();
});

// --- UPDATE BUILD FUNCTION ---
function buildBlock() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        const i = intersects[0];
        const type = blockTypes[currentBlockID];
        
        // Create material based on selection
        const material = new THREE.MeshLambertMaterial({ 
            color: type.color,
            transparent: !!type.opacity,
            opacity: type.opacity || 1.0
        });

        const b = new THREE.Mesh(geometry, material);
        b.position.copy(i.object.position).add(i.face.normal);
        scene.add(b);
        playerBlocks.push(b);
    }
}
