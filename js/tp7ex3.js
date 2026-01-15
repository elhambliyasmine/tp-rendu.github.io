const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

// === Propriétés du rectangle ===
let x = 50;
let y = 50;
let w = 50;
let h = 50;

let couleurs = ["yellow", "red", "blue", "green"];
let indexCouleur = 0;

let stylePlein = true;
let visible = true;

// === Fonction d'affichage ===
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!visible) return; // si invisible, ne rien dessiner

    ctx.beginPath();

    if (stylePlein) {
        ctx.fillStyle = couleurs[indexCouleur];
        ctx.fillRect(x, y, w, h);
    } else {
        ctx.lineWidth = 4;
        ctx.strokeStyle = couleurs[indexCouleur];
        ctx.strokeRect(x, y, w, h);
    }
}

// === Bouton Largeur ===
document.getElementById("btnLargeur").onclick = () => {
    w += 10;
    if (w > 200) w = 10;
    draw();
};

// === Bouton Hauteur ===
document.getElementById("btnHauteur").onclick = () => {
    h += 10;
    if (h > 200) h = 10;
    draw();
};

// === Bouton Couleur ===
document.getElementById("btnCouleur").onclick = () => {
    indexCouleur = (indexCouleur + 1) % couleurs.length;
    draw();
};

// === Bouton Style (plein / contour) ===
document.getElementById("btnStyle").onclick = () => {
    stylePlein = !stylePlein;
    draw();
};

// === Bouton Visibilité ===
document.getElementById("btnVisibilite").onclick = () => {
    visible = !visible;
    draw();
};

// affichage initial
draw();
