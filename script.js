var canvas;
var context;
var video;
var frame = 0;

// player Button
var posX1 = 340;
var posX2 = 440;
var posX3 = 540;
var posX4 = 640;
var posY1 = 645;
var widthButton = 100;
var heightButton = 75;
var colorRed = 'rgba(255, 0, 0, 0.4)';
var colorGreen = 'rgba(0, 255, 0, 0.4)';
var colorGrey = 'rgba(43, 43, 43, 0.3)';

//notes
var note;
var noteTab = [];
var respawn = 86;
var randomSpawn;
var posX = 370;
var posY = 0;
var tileSize = 40;
var colorBlue = 'blue';

/*var secondsPassed;
var oldTimeStamp;
var fps;*/

window.onload = startGame;

function startGame() {
    video = document.getElementById("video");
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    /*video.addEventListener('play', function() {
    
    });*/
    printMoovie();
    window.requestAnimationFrame(gameLoop);
}

function playVideo() {
    video.play();
}

function pauseVideo() {
    video.pause();
}

function resetVideo() {
    video.pause();
    video.currentTime = 0;
}

function printMoovie() {
    context.drawImage(video, 0, 0, 1080, 720);
    setTimeout(printMoovie, 0);
}

function gameLoop(timeStamp) {
    if (video.currentTime != 0) {
        update();
        draw(timeStamp);
        frame++;
    }
    window.requestAnimationFrame(gameLoop);
}

function draw(timeStamp){
    //context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //frameController(timeStamp);

    //background
    context.fillStyle = colorGrey;
    context.fillRect(340, 0, 400, 720);

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
    context.fillRect(338, 0, 4, 720);
    context.fillRect(438, 0, 4, 720);
    context.fillRect(538, 0, 4, 720);
    context.fillRect(638, 0, 4, 720);
    context.fillRect(738, 0, 4, 720);
    context.fillRect(340, 645, 400, 4);
}

function update() {
    if (frame == 0) {
        setTimeout(spawnNote, 450);
    }

    noteTab.forEach((item, index) => {
        item.y += 4;
        if (item.y > 720) {
            noteTab.splice(index, 1);
        }
    })
}

function spawnNote() {
    randomSpawn = Math.floor(Math.random() * 4);
    note = new component(posX + (randomSpawn*100), -tileSize, colorBlue, tileSize, tileSize);
    noteTab.push(note);
    setTimeout(spawnNote, 2298);
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