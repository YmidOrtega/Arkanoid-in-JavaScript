const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 512;

let counter = 0;

// Propiedades de la pelota
const ballRadius = 7;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 1.5;
let dy = -1.5;

//Propiedades de la paleta
const paddleHeight = 12;
const paddleWidth = 54;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight - 10;
let rightPressed = false;
let leftPressed = false;
const paddleSensibility = 8;

// Propiedades de los ladrillos
const brickRowCount = 6;
const brickColumnCount = 13;
const brickWidth = 56;
const brickHeight = 16;
const brickPadding = 2;
const brickOffsetTop = 80;
const brickOffsetLeft =
 (canvas.width - brickColumnCount * (brickWidth + brickPadding) + brickPadding) / 2;
const brickColor = "#e33";
const BRICK_STATUS = {
 ACTIVE: 1,
 DESTROYED: 0,
};

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
 bricks[c] = [];
 for (let r = 0; r < brickRowCount; r++) {
  bricks[c][r] = {
   x: brickOffsetLeft + c * (brickWidth + brickPadding),
   y: brickOffsetTop + r * (brickHeight + brickPadding),
   status: BRICK_STATUS.ACTIVE,
  };
 }
}
const totalBricks = brickRowCount * brickColumnCount;
let gameOver = false;

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

function drawBricks() {
 ctx.fillStyle = brickColor;
 for (let c = 0; c < brickColumnCount; c++) {
  for (let r = 0; r < brickRowCount; r++) {
   const brick = bricks[c][r];
   if (brick.status === BRICK_STATUS.DESTROYED) continue;
   ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight);
  }
 }
}

function drawScore() {
 ctx.fillStyle = "#fff";
 ctx.font = "16px monospace";
 ctx.textAlign = "left";
 ctx.fillText(`Puntos: ${counter}`, 12, 24);
}

function collisionDetention() {
 const nextX = x + dx;
 const nextY = y + dy;

 for (let c = 0; c < brickColumnCount; c++) {
  for (let r = 0; r < brickRowCount; r++) {
   const brick = bricks[c][r];
   if (brick.status === BRICK_STATUS.DESTROYED) continue;

   // Punto del ladrillo más cercano al centro de la pelota
   const closestX = Math.max(brick.x, Math.min(nextX, brick.x + brickWidth));
   const closestY = Math.max(brick.y, Math.min(nextY, brick.y + brickHeight));
   const distX = nextX - closestX;
   const distY = nextY - closestY;
   if (distX * distX + distY * distY > ballRadius * ballRadius) continue;

   // Si la pelota ya estaba a la altura del ladrillo, el golpe es lateral
   const wasBesideBrick = y > brick.y && y < brick.y + brickHeight;
   if (wasBesideBrick) {
    dx = -dx;
   } else {
    dy = -dy;
   }

   brick.status = BRICK_STATUS.DESTROYED;
   counter++;
   if (counter === totalBricks) endGame("¡Ganaste!");
   return; // Un ladrillo por fotograma evita rebotes dobles
  }
 }
}

function endGame(message) {
 gameOver = true;
 ctx.fillStyle = "#fff";
 ctx.font = "32px monospace";
 ctx.textAlign = "center";
 ctx.fillText(message, canvas.width / 2, canvas.height / 2);
 setTimeout(() => document.location.reload(), 2000);
}

function ballMovement() {
 if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
  dx = -dx;
 }

 if (y + dy < ballRadius) {
  dy = -dy;
 }

 const isBallSameXAsPaddle =
  x + ballRadius > paddleX && x - ballRadius < paddleX + paddleWidth;
 const isBallTouchingPaddle =
  dy > 0 && y + dy > paddleY - ballRadius && y <= paddleY;
 if (isBallSameXAsPaddle && isBallTouchingPaddle) {
  // El ángulo de rebote depende de dónde golpea la pelota en la paleta
  const hitPoint = (x - (paddleX + paddleWidth / 2)) / (paddleWidth / 2);
  const angle = Math.max(-1, Math.min(1, hitPoint)) * (Math.PI / 3);
  const speed = Math.hypot(dx, dy);
  dx = speed * Math.sin(angle);
  dy = -speed * Math.cos(angle);
 } else if (y + dy > canvas.height - ballRadius) {
  endGame("Fin del juego");
  return;
 }

 x += dx;
 y += dy;
}

function paddleMovement() {
 if (rightPressed) {
  paddleX = Math.min(paddleX + paddleSensibility, canvas.width - paddleWidth);
 } else if (leftPressed) {
  paddleX = Math.max(paddleX - paddleSensibility, 0);
 }
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
 drawScore();
 //Colisiones y movimiento
 collisionDetention();
 if (!gameOver) ballMovement();
 paddleMovement();
 if (!gameOver) window.requestAnimationFrame(draw);
}

draw();
initEvents();
