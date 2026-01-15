const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let index = 0;

// Efface le canvas avant chaque dessin
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* ---------------------------------------------
   FIGURE (a) – Cercles concentriques
---------------------------------------------- */
function drawConcentricCircles() {
    clear();
    
    const centerX = 250;
    const centerY = 250;

    // rayon du rond rouge
    const redRadius = 30;

    // épaisseur du trait noir
    const thick = 16;

    // =========== 1) CERCLE ROUGE ===========
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(centerX, centerY, redRadius, 0, Math.PI * 2);
    ctx.fill();

    // =========== 2) PREMIER CERCLE NOIR (qui touche le rouge) ===========
    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = "black";
    ctx.arc(centerX, centerY, redRadius + thick / 2, 0, Math.PI * 2);
    ctx.stroke();

    // =========== 3) AUTRES CERCLES (même principe) ===========
    const radii = [
        redRadius + thick / 2 + 30,
        redRadius + thick / 2 + 60,
        redRadius + thick / 2 + 90,
        redRadius + thick / 2 + 120
    ];

    radii.forEach(r => {
        ctx.beginPath();
        ctx.lineWidth = thick;
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
    });
}


/* ---------------------------------------------
   FIGURE (b) – Poule EXACTE sur grille 10×10
---------------------------------------------- */

function drawChicken() {
    clear();

    const ox = 60;       // origine de la grille (décalage X)
    const oy = 60;       // origine de la grille (décalage Y)
    const step = 35;     // taille d’un carré
    const n = 10;        // grille 10 x 10

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#d0d0d0";

    // ====== GRILLE 10 x 10 ======
    for (let i = 0; i <= n; i++) {
        // verticales
        ctx.beginPath();
        ctx.moveTo(ox + i * step, oy);
        ctx.lineTo(ox + i * step, oy + n * step);
        ctx.stroke();

        // horizontales
        ctx.beginPath();
        ctx.moveTo(ox, oy + i * step);
        ctx.lineTo(ox + n * step, oy + i * step);
        ctx.stroke();
    }

    // conversion (x, y) grille -> pixels
    const gp = (x, y) => [ox + x * step, oy + y * step];

    // ====== SEGMENTS DE LA POULE (ce que tu as donné) ======
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";

    const segments = [
        [2, 2, 4, 2],
        [2, 2, 4, 4],
        [4, 2, 5, 3],
        [5, 3, 7, 3],
        [7, 3, 8, 2],
        [8, 2, 8, 3],
        [8, 3, 9, 3],
        [9, 3, 8, 4],
        [8, 4, 9, 4],
        [9, 4, 7, 6],
        [7, 6, 7, 7.5],
        [7, 6, 5, 6],
        [5, 6, 4, 5],
        [4, 5, 4, 4],
        [3, 3, 3, 1.5],  
        // ====== CRETE (exacte) ======
[3, 2, 3, 1.5],
[3, 1.5, 3.333, 1.7],
[3.333, 1.7, 3.5, 1.5],
[3.5, 1.5, 3.666, 1.7],
[3.666, 1.7, 4, 1.5],
[4, 1.5, 4, 2],
   // crête vers le haut
        [5, 6, 5, 7.5],
        [4, 4, 2, 2],
        [5, 7, 4, 7],        // patte horizontale gauche
    [5, 7, 4.5, 7.5],    // patte diagonale droite
    [5, 7, 5, 6.5],
    [7, 7, 6, 7],
    [7, 7, 6.5, 7.5],
    [7, 7, 7, 7.5]
    ];

    segments.forEach(([x1, y1, x2, y2]) => {
        const [px1, py1] = gp(x1, y1);
        const [px2, py2] = gp(x2, y2);
        ctx.beginPath();
        ctx.moveTo(px1, py1);
        ctx.lineTo(px2, py2);
        ctx.stroke();
    });

    // ====== OEIL (je le place grosso modo comme sur le modèle) ======
    ctx.beginPath();
    const [ex, ey] = gp(3.3, 2.3); // tu pourras ajuster si besoin
    ctx.fillStyle = "black";
    ctx.arc(ex, ey, 4, 0, Math.PI * 2);
    ctx.fill();
}




/* ---------------------------------------------
   FIGURE (c) – Damier
---------------------------------------------- */
function drawCheckerboard() {
    clear();

    const size = 10;        // <<< damier 10 x 10
    const cell = 35;        // taille d'une case (ajustable)
    const total = size * cell;

    // Centrer dans le canvas
    const ox = (canvas.width - total) / 2;
    const oy = (canvas.height - total) / 2;

    // === Cases du damier ===
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {

            ctx.fillStyle = ((row + col) % 2 === 0) ? "black" : "white";

            ctx.fillRect(
                ox + col * cell,
                oy + row * cell,
                cell,
                cell
            );
        }
    }

    // === Contour noir autour ===
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.strokeRect(ox, oy, total, total);
}


/* ---------------------------------------------
   FIGURE (d) – Quadrillage courbe (lentille)
---------------------------------------------- */
function drawCurvePattern() {
    clear();

    const x0 = 80;
    const y0 = 80;
    const size = 340;      // carré 340x340
    const steps = 50;      // nombre de segments
    const step = size / steps;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";

    // contour du carré
    ctx.strokeRect(x0, y0, size, size);

    // famille 1 : gauche -> bas
    for (let i = 0; i <= steps; i++) {
        ctx.beginPath();
        ctx.moveTo(x0, y0 + i * step);
        ctx.lineTo(x0 + i * step, y0 + size);
        ctx.stroke();
    }

    // famille 2 : haut -> droite
    for (let i = 0; i <= steps; i++) {
        ctx.beginPath();
        ctx.moveTo(x0 + i * step, y0);
        ctx.lineTo(x0 + size, y0 + i * step);
        ctx.stroke();
    }
}


/* ---------------------------------------------
   Gestion du bouton + boucle
---------------------------------------------- */

const figures = [
    drawConcentricCircles,
    drawChicken,
    drawCheckerboard,
    drawCurvePattern
];

document.getElementById("next").addEventListener("click", () => {
    index = (index + 1) % figures.length;
    figures[index]();
});

// Affiche la 1ère figure au chargement
figures[0]();
