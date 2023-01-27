
//board
var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snakehead
var snakeX = blocksize * 5;
var snakeY = blocksize * 5

var snakebody = [];

//food
var foodX;
var foodY;

var velocityX = 0;
var velocityY = 0;

var gameover = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", cangeDirections);
    // update();
    setInterval(update, 1000 / 10);
}

function cangeDirections(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;

    }

    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }

    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;

    }

    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;

    }
}

function update() {
    if (gameover) {
        return;
    }
    
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);


    context.fillStyle = "red"
    context.fillRect(foodX, foodY, blocksize, blocksize)

    if (snakeX == foodX && snakeY == foodY) {
        snakebody.push([foodX, foodY])
        placeFood();
    }

    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1];
    }

    if (snakebody.length) {
        snakebody[0] = [snakeX, snakeY]
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    for (let i = 0; i < snakebody.length; i++) {
        context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize);
    }
    if (snakeX > cols*blocksize)

}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;


}
