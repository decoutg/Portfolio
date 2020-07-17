var canvas;
var context;

var player;
var posX = 0;
var posY = 0;

var tileSize = 40;

/*var secondsPassed;
var oldTimeStamp;
var fps;*/

window.onload = startGame;

function startGame() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    update();
    draw();
    //frameController(timeStamp);
    window.requestAnimationFrame(gameLoop);
}

function draw(){
    context.fillStyle = 'red';
    context.fillRect(posX, posY, tileSize, tileSize);
}

function update() {
    posX += 1;
    posY += 1;
}

/*function frameController(timeStamp) {
    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);

    // Draw number to the screen
    context.fillStyle = 'white';
    context.fillRect(0, 0, 200, 100);
    context.font = '25px Arial';
    context.fillStyle = 'black';
    context.fillText("FPS: " + fps, 10, 30);
}*/