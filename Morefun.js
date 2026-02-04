if (e.code === 'KeyG') {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const hitPoint = intersects[0].object.position;
        
        // Loop through all blocks and remove those nearby
        for (let i = playerBlocks.length - 1; i >= 0; i--) {
            const dist = playerBlocks[i].position.distanceTo(hitPoint);
            if (dist < 3) { // Explosion radius
                scene.remove(playerBlocks[i]);
                playerBlocks.splice(i, 1);
            }
        }
    }
}
