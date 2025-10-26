const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let w, h, stars = [];
const numStars = 200;
const SPEED = 0.3;
// Paramètres pour mieux répartir les étoiles
const Z_MIN = window.innerWidth; // Distance minimale d'affichage
const Z_MAX = 0.1 * window.innerWidth;       // Distance maximale

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
}
window.addEventListener('resize', resize);
resize();

function randomStar() {
  // Répartition circulaire plus homogène
  const theta = Math.random() * 2 * Math.PI;
  const radius = Math.sqrt(Math.random()) * w / 2;
  return {
    x: Math.cos(theta) * radius,
    y: Math.sin(theta) * radius,
    z: Math.random() * (Z_MAX - Z_MIN) + Z_MIN,
  };
}

function createStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(randomStar());
  }
}
createStars();

function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < numStars; i++) {
    let star = stars[i];

    // Déplacer l'étoile
    star.z -= SPEED;
    // Quand trop près, on la replace loin (évite l'amas au centre)
    if (star.z < Z_MIN) {
      stars[i] = randomStar();
      stars[i].z = Z_MAX;
      continue;
    }

    // Projection perspective
    let k = 128.0 / star.z;
    let sx = Math.floor(w / 2 + star.x * k);
    let sy = Math.floor(h / 2 + star.y * k);

    // Dessiner si à l'écran
    if (sx >= 0 && sx < w && sy >= 0 && sy < h) {
      let size = (1 - star.z / Z_MAX) * 2 + 1;
      ctx.fillStyle = "#fff";
      ctx.fillRect(sx, sy, size, size);
    }
  }
  requestAnimationFrame(draw);
}
draw();
