const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 512;

let counter = 0;

// Propiedades de la pelota
const ballRadius = 7;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

//Propiedades de la paleta
const paddleHeight = 12;
const paddleWidth = 54;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;
let rightPressed = false;
let leftPressed = false;
const paddleSensibility = 8;

function drawBall() {
 ctx.beginPath();
 ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
 ctx.fillStyle = "#fff";
 ctx.fill();
 ctx.closePath();
}

function drawPaddle() {
 ctx.fillStyle = "#09f";
 ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

function drawBricks() {}

function collisionDetention() {}

function ballMovement() {
 if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
  dx = -dx;
 }

 if (y + dy < ballRadius) {
  dy = -dy;
 }

 const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddleWidth;
 const isBallTouchingPaddle = y + dy > paddleY - ballRadius;
 if (isBallSameXAsPaddle && isBallTouchingPaddle) {
  dy = -dy;
 } else if (y + dy > canvas.height - ballRadius) {
  document.location.reload();
 }

 x += dx;
 y += dy;
}

function paddleMovement() {
 if (rightPressed && canvas.width - paddleWidth > paddleX) {
  paddleX += paddleSensibility;
 } else if (leftPressed && paddleX > 0) paddleX -= paddleSensibility;
}

function cleanCanvas() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initEvents() {
 document.addEventListener("keydown", keyDownHandler);
 document.addEventListener("keyup", keyUpHandler);

 function keyDownHandler(event) {
  const { key } = event;
  if (key === "Right" || key === "ArrowRight") {
   rightPressed = true;
  } else if (key === "Left" || key === "ArrowLeft") {
   leftPressed = true;
  }
 }

 function keyUpHandler(event) {
  const { key } = event;
  if (key === "Right" || key === "ArrowRight") {
   rightPressed = false;
  } else if (key === "Left" || key === "ArrowLeft") {
   leftPressed = false;
  }
 }
}

function draw() {
 cleanCanvas();
 //Dibujos de los elementos
 drawBall();
 drawPaddle();
 drawBricks();
 //Colisiones y movimiento
 collisionDetention();
 ballMovement();
 paddleMovement();
 window.requestAnimationFrame(draw);
}

draw();
initEvents();
