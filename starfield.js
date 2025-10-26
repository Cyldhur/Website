const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let w, h, stars = [];
const numStars = 200;
const SPEED = 0.3;
const MIN_DIST = 16;

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
    let angle = Math.random() * 2 * Math.PI;
    let radius = Math.sqrt(Math.random()) * w/2; // évite la surdensité au centre
    stars.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      z: Math.random() * (w - MIN_DIST) + MIN_DIST,
    });
  }
}
createStars();

function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0,w,h);

  for (let i=0; i<numStars; i++) {
    let star = stars[i];

    star.z -= SPEED;
    if (star.z < MIN_DIST) { // Respawn loin derrière
      let angle = Math.random() * 2 * Math.PI;
      let radius = Math.sqrt(Math.random()) * w/2;
      star.x = Math.cos(angle) * radius;
      star.y = Math.sin(angle) * radius;
      star.z = w;
    }

    let k = 128.0 / star.z;
    let sx = Math.floor(w/2 + star.x*k);
    let sy = Math.floor(h/2 + star.y*k);

    // Ne dessine QUE si étoile "lointaine"
    if(star.z > MIN_DIST && sx >=0 && sx<w && sy>=0 && sy<h) {
      let size = Math.max((1 - star.z / w) * 2 + 1, 1);
      ctx.fillStyle = "#fff";
      ctx.fillRect(sx, sy, size, size);
    }
  }
  requestAnimationFrame(draw);
}
draw();
