const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let w, h, stars = [];
const numStars = 200;
const SPEED = 0.3;

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
}
window.addEventListener('resize', resize);
resize();

function createStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    // Distribution polaire : angle et distance par rapport au centre
    let angle = Math.random() * 2 * Math.PI;
    let radius = Math.sqrt(Math.random()) * Math.max(w, h) / 2; // √ pour une vraie répartition uniforme
    stars.push({
      // position initiale sur un disque (autour du centre)
      baseX: Math.cos(angle) * radius,
      baseY: Math.sin(angle) * radius,
      z: Math.random() * w
    });
  }
}
createStars();

function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0,w,h);

  for (let i = 0; i < numStars; i++) {
    let star = stars[i];

    star.z -= SPEED;
    if (star.z < 1) {
      // On recycle l'étoile loin derrière, sur un cercle
      let angle = Math.random() * 2 * Math.PI;
      let radius = Math.sqrt(Math.random()) * Math.max(w, h) / 2;
      star.baseX = Math.cos(angle) * radius;
      star.baseY = Math.sin(angle) * radius;
      star.z = w;
    }

    // Perspective centrée
    let k = 128.0 / star.z;
    let sx = Math.floor(w/2 + star.baseX * k);
    let sy = Math.floor(h/2 + star.baseY * k);

    // On ne dessine que dans le canvas
    if(sx >=0 && sx<w && sy>=0 && sy<h) {
      // Moins de taille max :
      let size = Math.min(2, (1 - star.z / w) * 2 + 1);
      ctx.fillStyle = "#fff";
      ctx.fillRect(sx, sy, size, size);
    }
  }
  requestAnimationFrame(draw);
}
draw();
