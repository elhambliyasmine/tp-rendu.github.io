const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Images
const mario = new Image();
const bg = new Image();

mario.src = "img/mario.png";
bg.src = "img/fond.png";

// Taille du sprite (5 colonnes × 5 lignes)
let frameW, frameH;

// Animation
let col = 0;
let row = 0; // Mario court sur toutes les lignes (effet "run loop")
let animSpeed = 0;

// Fond défilant
let bgX = 0;

mario.onload = () => {
    frameW = mario.width / 5;
    frameH = mario.height / 5;
};

function draw() {
    // -------------------
    // 🔵 FOND QUI DÉFILE
    // -------------------
    bgX -= 2;               // vitesse du défilement
    if (bgX <= -canvas.width) bgX = 0;

    ctx.drawImage(bg, bgX, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, bgX + canvas.width, 0, canvas.width, canvas.height);

    // -------------------
    // 🔴 MARIO COURT
    // -------------------

    // ralentir l’animation
    animSpeed++;
    if (animSpeed % 6 === 0) {  // changer 6 → 8 (plus lent), 4 (plus rapide)
        col++;
        if (col >= 5) col = 0;
    }

    // afficher Mario (plus haut dans le décor)
    ctx.drawImage(
        mario,
        col * frameW, row * frameH, frameW, frameH,
        50, 270,                // ← position (on a remonté Mario)
        frameW * 1.2, frameH * 1.2
    );

    requestAnimationFrame(draw);
}

bg.onload = () => draw();
