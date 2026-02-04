// Day/Night Cycle logic
const time = Date.now() * 0.0005;
const skyColor = new THREE.Color().setHSL(0.6, 0.5, Math.max(0.1, Math.sin(time) * 0.5 + 0.5));
scene.background = skyColor;

// Move the sun
light.position.x = Math.sin(time) * 10;
light.position.y = Math.cos(time) * 10;
