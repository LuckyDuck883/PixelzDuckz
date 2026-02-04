// Party Mode: Change the color of the block directly beneath the player
raycaster.set(camera.position, new THREE.Vector3(0, -1, 0));
const checkFloor = raycaster.intersectObjects(scene.children);

if (checkFloor.length > 0) {
    const blockBelow = checkFloor[0].object;
    // Shift color based on time
    blockBelow.material.color.setHSL(Math.sin(Date.now() * 0.001), 0.5, 0.5);
}
