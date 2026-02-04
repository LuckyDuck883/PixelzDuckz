function spawnTree(x, z, surfaceY) {
    const logHeight = 3;
    const logMat = new THREE.MeshLambertMaterial({ color: 0x5C4033 });
    const leafMat = new THREE.MeshLambertMaterial({ color: 0x228B22 });

    // Build the Trunk
    for (let i = 1; i <= logHeight; i++) {
        const log = new THREE.Mesh(geometry, logMat);
        log.position.set(x, surfaceY + i, z);
        scene.add(log);
        playerBlocks.push(log); // So we can "Reset" or "Explode" them!
    }

    // Build the Leaves
    const leaves = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 3), leafMat);
    leaves.position.set(x, surfaceY + logHeight + 1, z);
    scene.add(leaves);
    playerBlocks.push(leaves);
}

// Randomly call it during world generation
if (Math.random() > 0.95) { // 5% chance per coordinate
    spawnTree(x, y, z);
}
