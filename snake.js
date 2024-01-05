var blockSize = 25;
var rows = 20;
var columns = 20;
var canvas;
var context;

// Snake
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// Food
var foodX;
var foodY;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var gameOver = false;

window.onload = function () {
  canvas = document.getElementById("canvas");
  canvas.width = columns * blockSize;
  canvas.height = rows * blockSize;
  context = canvas.getContext("2d");

  document.addEventListener("keyup", changeSnakeDirection);

  placeFood();
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    return;
  }

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (
    snakeX < 0 ||
    snakeX > columns * blockSize - 1 ||
    snakeY < 0.5 ||
    snakeY > rows * blockSize - 1
  ) {
    gameOver = true;
    alert("Game Over!");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over!");
    }
  }

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * blockSize;
      const y = j * blockSize;
      context.strokeStyle = "blue";
      context.strokeRect(x, y, blockSize, blockSize);
    }
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * columns) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeSnakeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}
