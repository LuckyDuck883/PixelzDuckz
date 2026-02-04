function createExplosion(position, color) {
    const particleCount = 10;
    const pGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const pMaterial = new THREE.MeshLambertMaterial({ color: color });

    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(pGeometry, pMaterial);
        particle.position.copy(position);
        
        // Give it a random velocity
        particle.userData.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.2,
            Math.random() * 0.2,
            (Math.random() - 0.5) * 0.2
        );

        scene.add(particle);

        // Remove particle after 1 second
        setTimeout(() => {
            scene.remove(particle);
        }, 1000);

        // Add to a global particles array to update in animate()
        particles.push(particle);
    }
}
