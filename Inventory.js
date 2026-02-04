// 1. Create a list to track only the blocks we build (not the floor)
const playerBlocks = [];

// 2. Update the Building Logic to track new blocks
if (e.button === 2) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const intersect = intersects[0];
        const newBlock = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x8B4513 }));
        newBlock.position.copy(intersect.object.position).add(intersect.face.normal);
        
        scene.add(newBlock);
        playerBlocks.push(newBlock); // Add to our "built" list
    }
}

// 3. Add the Reset Key (R)
document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyR') {
        playerBlocks.forEach(block => scene.remove(block));
        playerBlocks.length = 0; // Clear the array
        console.log("World Reset!");
    }
});
