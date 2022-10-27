import Ball from './classes/Ball.js';
import Utils from './Utils.js';


const canvas = <HTMLCanvasElement>document.getElementById('c');
canvas.width = 1920;
canvas.height = 1080;
let ctx = canvas.getContext("2d");


let speedBlob = 20;
let maxSizeBlob = 650;
const margin = 20;

const colors = ['#91a6ff', '#ff88dc', '#faff7f', '#fff']

const blob = {
  x: 960,
  y: 700,
  radius: 50
}

let balls = [];
let timerAnimationFrame;
const video = document.getElementById('video-animation') as HTMLVideoElement | null;
let clap = new Audio("assets/clap.mp3");
clap.volume = 0.5;


const init = () => {
  document.addEventListener("keydown", handleMoveBlob);
  createBalls();
  draw();
  video.addEventListener('ended', handleRestart);
}




const createBalls = () => {
  balls.push(new Ball(ctx, Utils.random(0, canvas.width), Utils.random(280, 1000), colors[Utils.random(0, (colors.length - 1))]));
  balls.push(new Ball(ctx, Utils.random(0, canvas.width), Utils.random(280, 1000), colors[Utils.random(0, (colors.length - 1))]));
  balls.push(new Ball(ctx, Utils.random(0, canvas.width), Utils.random(280, 1000), colors[Utils.random(0, (colors.length - 1))]));
}

const handleNewBall = () => {
  if (balls.length <= 6) {
    balls.push(new Ball(ctx, Utils.random(0, canvas.width), Utils.random(280, 1000), colors[Utils.random(0, (colors.length - 1))]));
  }
  else {
    return;
  }
  //hier nog een check of er al niet meer dan 10 ballen zijn
  //hier nog een extra check dat als er minder dan 1 bal is omdat hij te rap is opgegeten er 3 ofzo worden toegevoegd?

}

//start the animation if the blob is big enough
const handleStartAnimation = () => {
  cancelAnimationFrame(timerAnimationFrame);
  balls = [];
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  video.style.transition = `clip-path 1s`;
  video.style.clipPath = `circle(2000px at ${blob.x}px ${blob.y}px)`;
  video.currentTime = 0;
  video.play();
}

//de rand van het raam kleurt als de ball ertegen botst
const checkTouchWindow = () => {
  const windowBorders = [[82, 184], [282, 384], [480, 582], [702, 804], [912, 1014], [1122, 1224], [1338, 1440], [1542, 1644], [1742, 1844]]
  balls.forEach(ball => {
    windowBorders.forEach(border => {
      if (ball.location.x >= border[0] - margin && ball.location.x <= border[1] + margin && ball.location.y >= 400 - margin && ball.location.y <= 607 + margin) {
        console.log('tikke');
        ctx.beginPath();
        ctx.lineWidth = 15;
        ctx.strokeStyle = ball.color;
        ctx.rect(border[0], 400, 102, 207);
        ctx.stroke();
      }
    })
  })
}

const draw = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  if (blob.radius < maxSizeBlob) {
    checkEatBlob();
    drawBlob();
    balls.forEach(ball => ball.draw());
    const window = checkTouchWindow();
    timerAnimationFrame = requestAnimationFrame(draw);
  }
  if (blob.radius >= maxSizeBlob) {
    handleStartAnimation();
  }

  return;
}

const drawBlob = () => {
  //ctx.ellipse(blob.x, blob.y, blob.radius, blob.radius, 0, 0, Math.PI * 2)
  video.style.clipPath = `circle(${blob.radius}px at ${blob.x}px ${blob.y}px)`;
}

const checkEatBlob = () => {
  const ballsToDelete = []
  balls.forEach((ball, index) => {
    //check of de blob een ball raakt
    if (ball.location.x > blob.x - blob.radius && ball.location.x < blob.x + blob.radius && ball.location.y > blob.y - blob.radius && ball.location.y < blob.y + blob.radius) {
      blob.radius += 50;
      clap.play();
      ballsToDelete.push(ball);

      handleNewBall();
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

const handleRestart = () => {
  console.log('tijd om opnieuw te beginnen');
  video.style.transition = `clip-path 0s`;
  blob.radius = 0;
  blob.x = 960;
  blob.y = 700;
  drawBlob();

  setTimeout(() => {
    console.log("Delayed for 2 second.");
    video.style.transition = `clip-path 1s`;
    blob.radius = 50;
    blob.x = 960;
    blob.y = 700;
    drawBlob();
    video.currentTime = 0;

  }, 2000);
  setTimeout(() => {
    console.log("Delayed for 3 second.");
    video.style.transition = `clip-path 0s`;
    createBalls();
    draw();
  }, 3000);
}

init()
postMessage({ payload: 'removeLoading' }, '*')

