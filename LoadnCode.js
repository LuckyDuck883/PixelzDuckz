// --- SAVE SYSTEM ---
function saveWorld() {
    const data = playerBlocks.map(block => ({
        pos: block.position,
        type: block.material.color.getHex()
    }));
    localStorage.setItem('myChaosWorld', JSON.stringify(data));
    alert("World Saved to Browser! 💾");
}

function loadWorld() {
    const savedData = localStorage.getItem('myChaosWorld');
    if (!savedData) return;

    const data = JSON.parse(savedData);
    data.forEach(item => {
        const b = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: item.type }));
        b.position.copy(item.pos);
        scene.add(b);
        playerBlocks.push(b);
    });
    alert("World Loaded! 🏗️");
}

// --- ADD KEYS TO TRIGGER ---
document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyP') saveWorld(); // P for Preserve
    if (e.code === 'KeyL') loadWorld(); // L for Load
});
