(function() {
  const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
  window.requestAnimationFrame = requestAnimationFrame;
})();


let flakes = [];
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let flakeCount = 400;
let mX = -100;
let mY = -100;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function snow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < flakeCount; i++) {
    let flake = flakes[i];
    let x = mX;
    let y = mY;
    let minDist = 150;
    let x2 = flake.x;
    let y2 = flake.y;
    let dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));
    let dx = x2 - x;
    let dy = y2 - y;
    if (dist < minDist) {
      let force = minDist / (dist * dist);
      let xcomp = (x - x2) / dist, ycomp = (y - y2) / dist;
      let deltaV = force / 2;
      flake.velX -= deltaV * xcomp;
      flake.velY -= deltaV * ycomp;
      }else{
        flake.velX *= .98;
        if (flake.velY <= flake.speed) {
          flake.velY = flake.speed
        }
        flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
      }
      ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
      flake.y += flake.velY;
      flake.x += flake.velX;
      if (flake.y >= canvas.height || flake.y <= 0) {
        reset(flake);
      }
      if (flake.x >= canvas.width || flake.x <= 0) {
        reset(flake);
      }
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx.fill();
  }
  requestAnimationFrame(snow);
};

function reset(flake) {
  flake.x = Math.floor(Math.random() * canvas.width);
  flake.y = 0;
  flake.size = (Math.random() * 3) + 2;
  flake.speed = (Math.random() * 1) + 0.5;
  flake.velY = flake.speed;
  flake.velX = 0;
  flake.opacity = (Math.random() * 0.5) + 0.3;
}

function init() {
  for (let i = 0; i < flakeCount; i++) {
    let x = Math.floor(Math.random() * canvas.width);
    let y = Math.floor(Math.random() * canvas.height);
    let size = (Math.random() * 3) + 2;
    let speed = (Math.random() * 1) + 0.5;
    let opacity = (Math.random() * 0.5) + 0.3;
    flakes.push({
      speed: speed,
      velY: speed,
      velX: 0,
      x: x,
      y: y,
      size: size,
      stepSize: (Math.random()) / 30,
      step: 0,
      opacity: opacity
    });
  }
  snow();
};

canvas.addEventListener("mousemove", function(e) {
  mX = e.clientX,
  mY = e.clientY
});

window.addEventListener("resize",function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

init();