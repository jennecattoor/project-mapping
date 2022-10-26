//let canvas = <HTMLCanvasElement>document.getElementById("mycanvas");
//let ctx = canvas.getContext("2d");
//const canvas = document.getElementById("c");
//canvas.width = 1920;
//canvas.height = 1080;
import Ball from './classes/Ball.js';
import Utils from './Utils.js';


const canvas = <HTMLCanvasElement>document.getElementById('c');
canvas.width = 1920;
canvas.height = 1080;
let ctx = canvas.getContext("2d");


let speedBlob = 20;

const colors = ['#91a6ff', '#ff88dc', '#faff7f', '#fff']

const blob = {
  x: 500,
  y: 500,
  radius: 50
}

let balls = [];
let timerAnimationFrame;


const init = () => {
  document.addEventListener("keydown", handleMoveBlob);
  createBalls();
  draw();
}

const createBalls = () => {
  balls.push(new Ball(ctx, Utils.random(0, canvas.width), Utils.random(280, 1000), colors[Utils.random(0, (colors.length - 1))]));
  balls.push(new Ball(ctx, Utils.random(0, canvas.width), Utils.random(280, 1000), colors[Utils.random(0, (colors.length - 1))]));
  balls.push(new Ball(ctx, Utils.random(0, canvas.width), Utils.random(280, 1000), colors[Utils.random(0, (colors.length - 1))]));
  balls.push(new Ball(ctx, Utils.random(0, canvas.width), Utils.random(280, 1000), colors[Utils.random(0, (colors.length - 1))]));
}

const handleEatenBall = () => {
  //hier nog een check of er al niet meer dan 10 ballen zijn
  //hier nog een extra check dat als er minder dan 1 bal is omdat hij te rap is opgegeten er 3 ofzo worden toegevoegd?
  balls.push(new Ball(ctx, Utils.random(0, canvas.width), Utils.random(280, 1000), colors[Utils.random(0, (colors.length - 1))]));
}

//start the animation if the blob is big enough
const handleStartAnimation = () => {
  cancelAnimationFrame(timerAnimationFrame);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  document.getElementById("background-design").style.transition = `clip-path 2s`;
  document.getElementById("background-design").style.clipPath = `circle(2000px at ${blob.x}px ${blob.y}px)`;
  setTimeout(() => {
    //  const video = document.getElementById("video-animation");
    const video = document.getElementById('video-animation') as HTMLVideoElement | null;
    video.style.opacity = `1`;
    video.play();
  }, 1000)
}

const draw = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  if (blob.radius < 500) {
    checkEatBlob();
    drawBlob();
    balls.forEach(ball => ball.draw());
    timerAnimationFrame = requestAnimationFrame(draw);
  }
  if (blob.radius >= 500) {
    handleStartAnimation();
  }

  return;
}

const drawBlob = () => {
  //ctx.beginPath();
  //ctx.ellipse(blob.x, blob.y, blob.radius, blob.radius, 0, 0, Math.PI * 2)
  //ctx.fillStyle = "#FFF";
  //ctx.fill();
  // ctx.closePath();
  document.getElementById("background-design").style.clipPath = `circle(${blob.radius}px at ${blob.x}px ${blob.y}px)`;
}

const checkEatBlob = () => {
  const ballsToDelete = []
  balls.forEach((ball, index) => {
    //check of de blob een ball raakt
    if (ball.location.x > blob.x - blob.radius && ball.location.x < blob.x + blob.radius && ball.location.y > blob.y - blob.radius && ball.location.y < blob.y + blob.radius) {
      blob.radius += 50;
      ballsToDelete.push(ball);
      handleEatenBall();
    }
  })
  balls = balls.filter(ball => !ballsToDelete.includes(ball));
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
  if (blob.y < 250) {
    blob.y = 250;
  }
  if (blob.y > 1000) {
    blob.y = 1000;
  }
}

init()
postMessage({ payload: 'removeLoading' }, '*')

