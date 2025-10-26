const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let w, h, stars = [];
const numStars = 200;
const SPEED = 0.3; // = Vitesse LENTE

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
    stars.push({
      x: Math.random()*w - w/2,
      y: Math.random()*h - h/2,
      z: Math.random()*w,
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
    if (star.z < 1) {
      star.x = Math.random()*w - w/2;
      star.y = Math.random()*h - h/2;
      star.z = w;
    }

    let k = 128.0 / star.z;
    let sx = Math.floor(w/2 + star.x*k);
    let sy = Math.floor(h/2 + star.y*k);

    if(sx >=0 && sx<w && sy>=0 && sy<h) {
      let size = (1 - star.z / w) * 2 + 1;
      ctx.fillStyle = "#fff";
      ctx.fillRect(sx, sy, size, size);
    }
  }
  requestAnimationFrame(draw);
}
draw();
