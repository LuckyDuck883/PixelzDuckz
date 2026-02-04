let verticalVelocity = 0;
let isJumping = false;
const gravity = -0.005;
const jumpStrength = 0.12;
// Jumping logic
if (keys['Space'] && !isJumping) {
    verticalVelocity = jumpStrength;
    isJumping = true;
}

verticalVelocity += gravity;
camera.position.y += verticalVelocity;

// Floor collision (simple check)
if (camera.position.y <= 1.6) {
    camera.position.y = 1.6;
    verticalVelocity = 0;
    isJumping = false;
}
