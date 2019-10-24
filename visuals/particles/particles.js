const PARTICLES_NUM = 5000;
const BANG_SCALE = Math.pow( 50, 3 );

const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');

const cW = window.innerWidth;
const cH = window.innerHeight;

let particles = [];
let isMouseDown = false;
let mouseX, mouseY;
let dx, dy, d, t, f;

cvs.width = cW;
cvs.height = cH;

let requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function Particle(){
  this.x = Math.random()*cW;
  this.y = Math.random()*cH;

  this.w = Math.random();
  this.h = Math.random();

  //some velocity for the particles
  this.vx = -1 + Math.random() * 2;
  this.vy = -1 + Math.random() * 2;
}
Particle.prototype.draw = function(){
  ctx.fillStyle = '#ccc';
  ctx.fillRect(this.x, this.y, this.w, this.h);
}

init()
function init(){
  for (let i = 0; i < PARTICLES_NUM; i++) {
    particles.push(new Particle());
  }
  cvs.onmousedown = onMouseDown;
}

function draw() {
  //re-draw in each next frame
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0,cW,cH);

  for (let i = 0; i < PARTICLES_NUM; i++) {
    let p = particles[i];
    p.draw();
  }
  update();
  requestAnimFrame(draw);
}

function update() {
  // Update every particle's position according to their velocities
  for (let i = 0; i < PARTICLES_NUM; i++) {
    let p = particles[i];

    if(isMouseDown){
      d = ( dx = mouseX - p.x ) * dx + ( dy = mouseY - p.y ) * dy;
      f = -BANG_SCALE / d;
      if ( d < BANG_SCALE ) {
        t = Math.atan2( dy, dx );
        p.vx = f * Math.cos(t);
        p.vy = f * Math.sin(t);
      }
    }
    p.x += p.vx;
    p.y += p.vy;

    // Change particle position when out of bounds
    if(p.x > cW){p.x = 0;}
    else if(p.x < 0) {p.x = cW;}

    if(p.y > cH){p.y = 0;}
    else if(p.y < 0) {p.y = cH;}

    // Check the distance between particles and compare
    // them to the minDist
    for(let j = i + 1; j < PARTICLES_NUM; j++) {
      let p2 = particles[j];
      checkDistance(p, p2);
    }
  }
}

function checkDistance(p1, p2) {
  let dist;
  let minDist = 70;
  let dx = p1.x - p2.x;
  let dy = p1.y - p2.y;

  dist = Math.sqrt(dx*dx + dy*dy);

  if(dist <= minDist) {
    // particles acceleration depending on their distance
    let ax = dx/2000,
        ay = dy/2000;

    // Apply the acceleration on the particles
    p1.vx -= ax;
    p1.vy -= ay;
    p2.vx += ax;
    p2.vy += ay;
  }
}

draw();

window.onresize = function(){
  cW = window.innerWidth;
  cH = window.innerHeight;
  ctx.canvas.width  = cW;
  ctx.canvas.height = cH;
}
function onMouseDown(e) {
  let rect = e.target.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
  isMouseDown = true;
}