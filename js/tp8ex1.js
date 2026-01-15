const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
//On récupère l’élément <canvas> de la page (créé dans ton HTML).
// ctx (le “contexte”) permet de dessiner dessus (images, formes...).
//Ici, on utilise le contexte 2D, adapté pour les jeux simples.

const pelouse = new Image();
pelouse.src = "img/pelouse.png";

const sprites = new Image();
sprites.src = "img/sprites.png";
//On crée deux objets Image().
//On leur indique le chemin du fichier à charger.

const frameWidth = 128;   // largeur d’une case du sprite
const frameHeight = 128;  // hauteur d’une case du sprite
const speed = 4;         // vitesse de déplacement (en pixels)

let x = (canvas.width - frameWidth) / 2; // position X du perso
let y = (canvas.height - frameHeight) / 2; // position Y du perso
// sprites.png contient 16 images (4×4) donc chaque petit carré fait environ 32×32 pixels.
//On définit la taille d’une frame (frameWidth, frameHeight).
//On place le perso au centre du canvas.

// Animation
let frame = 0;
let direction = 0; // 0 = bas, 1 = gauche, 2 = droite, 3 = haut
let frameCounter = 0;

const keys = {};

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function update() {
  let moving = false;

 if (keys["ArrowDown"]) {
  y += speed;
  direction = 0;   // ligne 0 = bas
  moving = true;
}

if (keys["ArrowUp"]) {
  y -= speed;
  direction = 1;   // ligne 1 = haut
  moving = true;
}

if (keys["ArrowLeft"]) {
  x -= speed;
  direction = 2;   // ligne 2 = gauche
  moving = true;
}

if (keys["ArrowRight"]) {
  x += speed;
  direction = 3;   // ligne 3 = droite
  moving = true;
}


  // Limites du canvas
  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x > canvas.width - frameWidth) x = canvas.width - frameWidth;
  if (y > canvas.height - frameHeight) y = canvas.height - frameHeight;

  // Changer d’image seulement quand le perso bouge
  if (moving) {
    frameCounter++;
    if (frameCounter % 10 === 0) { // ralentir l’animation
      frame = (frame + 1) % 4;
    }
  } else {
    frame = 0; // frame de repos
  }
}

function draw() {
  ctx.drawImage(pelouse, 0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    sprites,
    frame * frameWidth, direction * frameHeight, // dans la spritesheet
    frameWidth, frameHeight,                     // taille frame
    x, y, frameWidth, frameHeight                // position sur canvas
  );
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

pelouse.onload = () => {
  sprites.onload = () => {
    loop();
  };
};