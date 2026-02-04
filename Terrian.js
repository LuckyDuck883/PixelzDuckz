// 1. Terrain Settings
const worldSize = 20; // 20x20 blocks
const heightScale = 2; // How tall the hills are

for(let x = -worldSize; x < worldSize; x++) {
    for(let z = -worldSize; z < worldSize; z++) {
        // Use Math.sin and Math.cos to create "waves" of land
        const y = Math.floor(
            Math.sin(x * 0.2) * heightScale + 
            Math.cos(z * 0.2) * heightScale
        );

        const cube = new THREE.Mesh(geometry, grassMat);
        cube.position.set(x, y, z);
        scene.add(cube);
        
        // Add "Dirt" underneath so the world isn't hollow
        if (y > -2) {
            const dirt = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x8B4513 }));
            dirt.position.set(x, y - 1, z);
            scene.add(dirt);
        }
    }
}
