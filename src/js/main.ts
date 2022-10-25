//let canvas = <HTMLCanvasElement>document.getElementById("mycanvas");
//let ctx = canvas.getContext("2d");
//const canvas = document.getElementById("c");
//canvas.width = 1920;
//canvas.height = 1080;


const canvas = <HTMLCanvasElement>document.getElementById('c');
canvas.width = 1920;
canvas.height = 1080;
let ctx = canvas.getContext("2d");

let timerAnimationFrame;
let speedBlob = 20;

let minY = 250;
//let maxXR = 250;
//let maxXL = 250;

const blob = {
  x: 1920,
  y: 1080,
  radius: 100
}

const init = () => {
  document.addEventListener("keydown", handleMoveBlob);
  draw();
}

const draw = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  drawBlob();
  timerAnimationFrame = requestAnimationFrame(draw);
  return;
}

const drawBlob = () => {
  ctx.beginPath();
  ctx.ellipse(blob.x, blob.y, blob.radius, blob.radius, 0, 0, Math.PI * 2)
  ctx.fillStyle = "#FFF";
  ctx.fill();
  ctx.closePath();
}

const handleMoveBlob = (e) => {
  if (e.key === 'a') {
    blob.y -= speedBlob;
    blob.x -= speedBlob;
  }
  if (e.key === 'b') {
    blob.y -= speedBlob;
  }
  if (e.key === 'c') {
    blob.y -= speedBlob;
    blob.x += speedBlob;
  }
  if (e.key === 'd') {
    blob.x += speedBlob;
  }
  if (e.key === 'e') {
    blob.x += speedBlob;
    blob.y += speedBlob;
  }
  if (e.key === 'f') {
    blob.y += speedBlob;
  }
  if (e.key === 'g') {
    blob.y += speedBlob;
    blob.x -= speedBlob;
  }
  if (e.key === 'h') {
    blob.x -= speedBlob;
  }
  if (blob.x < 0) {
    blob.x = 0;
  }
  if (blob.x > canvas.width) {
    blob.x = canvas.width;
  }
  if (blob.y < minY) {
    blob.y = minY;
  }
  if (blob.y > canvas.height) {
    blob.y = canvas.height;
  }
}



init()
postMessage({ payload: 'removeLoading' }, '*')

