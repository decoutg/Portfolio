var canvas;
var context;
var image;
var video;
var playingVideo = true;
var frame = 0;

// player Button
var posX1 = 340;
var posX2 = 440;
var posX3 = 540;
var posX4 = 640;
var posY1 = 645;
var rightButton;
var rightMidButton;
var leftMidButton;
var leftButton;
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
var repeted = 8;
var posX = 370;
var posY = 0;
var tileSize = 40;
var colorBlue = 'blue';

//control
var rightPressed = false;
var rightMidPressed = false;
var leftMidPressed = false;
var leftPressed = false;

var secondsPassed;
var oldTimeStamp;
var fps;

window.onload = startGame;

function startGame() {
    video = document.getElementById("video");
    image = document.getElementById("image");
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    rightButton = new component(640, 650, colorRed, 100, 75);
    rightMidButton = new component(540, 650, colorRed, 100, 75);
    leftMidButton = new component(440, 650, colorRed, 100, 75);
    leftButton = new component(340, 650, colorRed, 100, 75);
    window.requestAnimationFrame(gameLoop);
}

function playVideo() {
    playingVideo = true;
    video.play();
}

function playSong() {
    playingVideo = false;
    video.play();
}

function pauseVideo() {
    video.pause();
}

function resetVideo() {
    video.pause();
    video.currentTime = 0;
}

function gameLoop(timeStamp) {

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    if (video.currentTime != 0) {
        update();
        draw(timeStamp);
        frame++;
    }
    else {
        frame = 0;
        noteTab = [];
    }
    window.requestAnimationFrame(gameLoop);
}

function draw(timeStamp){
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (playingVideo) {
        context.drawImage(video, 0, 0, 1080, 720);
    } else {
        context.drawImage(image, 0, 0, 1080, 720);
    }

    //background
    context.fillStyle = colorGrey;
    context.fillRect(340, 0, 400, 720);

    //touches du jeu
    context.fillStyle = rightButton.color;
    context.fillRect(rightButton.x, rightButton.y, rightButton.width, rightButton.height);
    context.fillStyle = rightMidButton.color;
    context.fillRect(rightMidButton.x, rightMidButton.y, rightMidButton.width, rightMidButton.height);
    context.fillStyle = leftMidButton.color;
    context.fillRect(leftMidButton.x, leftMidButton.y, leftMidButton.width, leftMidButton.height);
    context.fillStyle = leftButton.color;
    context.fillRect(leftButton.x, leftButton.y, leftButton.width, leftButton.height);

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

    frameController(timeStamp);
}

function update() {
    if (frame == 0) {
        setTimeout(spawnNote, 1850);
    }

    noteTab.forEach((item, index) => {
        item.y += 10;
        if (item.y > 720) {
            noteTab.splice(index, 1);
        }
    })
}

function keyDownHandler(e) {
    if(e.key == "m" || e.key == "M") {
        rightPressed = true;
        rightButton.color = colorGreen;
    }
    else if(e.key == "l" || e.key == "L") {
        rightMidPressed = true;
        rightMidButton.color = colorGreen;
    }
    else if(e.key == "s" || e.key == "S") {
        leftMidPressed = true;
        leftMidButton.color = colorGreen;
    }
    else if(e.key == "q" || e.key == "Q") {
        leftPressed = true;
        leftButton.color = colorGreen;
    }
}

function keyUpHandler(e) {
    if(e.key == "m" || e.key == "M") {
        rightPressed = false;
        rightButton.color = colorRed;
    }
    else if(e.key == "l" || e.key == "L") {
        rightMidPressed = false;
        rightMidButton.color = colorRed;
    }
    else if(e.key == "s" || e.key == "S") {
        leftMidPressed = false;
        leftMidButton.color = colorRed;
    }
    else if(e.key == "q" || e.key == "Q") {
        leftPressed = false;
        leftButton.color = colorRed;
    }
}

function spawnNote() {
    randomSpawn = Math.floor(Math.random() * 4);
    note = new component(posX + (randomSpawn*100), -tileSize, colorBlue, tileSize, tileSize);
    noteTab.push(note);
    if (video.currentTime == 0) {
        return;
    }
    setTimeout(spawnNote, 2310*(1/repeted));
}

function component(x, y, color, width, height) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
}

function frameController(timeStamp) {
    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);

    // Draw number to the screen
    context.font = '25px Arial';
    context.fillStyle = 'red';
    context.fillText("FPS: " + fps, 10, 30);
}