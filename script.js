var canvas;
var context;
var frame = 0;

// player Button
var posX1 = 0;
var posX2 = 100;
var posX3 = 200;
var posX4 = 300;
var posY1 = 525;
var widthButton = 100;
var heightButton = 75;
var colorRed = 'red';
var colorGreen = 'green';

//notes
var note;
var noteTab = [];
var respawn = 50;
var randomSpawn;
var posX = 30;
var posY = 0;
var tileSize = 40;
var colorBlue = 'blue';

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
    frame++;
    update();
    draw(timeStamp);
    window.requestAnimationFrame(gameLoop);
}

function draw(timeStamp){
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //frameController(timeStamp);

    //touches du jeu
    context.fillStyle = colorRed;
    context.fillRect(posX1, posY1, widthButton, heightButton);
    context.fillRect(posX2, posY1, widthButton, heightButton);
    context.fillRect(posX3, posY1, widthButton, heightButton);
    context.fillRect(posX4, posY1, widthButton, heightButton);

    noteTab.forEach((item, index) => {
        context.fillStyle = colorBlue;
        context.fillRect(item.x, item.y, item.width, item.height);
    })
    if (noteTab.length > 0) {
        console.log(noteTab[0].height);
    }

    //cordes et délimitations
    context.fillStyle = 'black';
    context.fillRect(0, 0, 2, 600);
    context.fillRect(98, 0, 4, 600);
    context.fillRect(198, 0, 4, 600);
    context.fillRect(298, 0, 4, 600);
    context.fillRect(398, 0, 2, 600);
    context.fillRect(0, 525, 400, 4);
}

function update() {
    if (frame % respawn == 0) {
        randomSpawn = Math.floor(Math.random() * 4);
        note = new component(30 + (randomSpawn*100), -tileSize, colorBlue, tileSize, tileSize);
        noteTab.push(note);
    }

    noteTab.forEach((item, index) => {
        item.y += 4;
        if (item.y > 600) {
            noteTab.splice(index, 1);
        }
    })
}

function component(x, y, color, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
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