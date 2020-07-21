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
var colorOrange = 'rgba(255, 69, 0, 0.4)';

//notes
var note;
var noteTab = [];
var respawn = 86;
var randomSpawn;
var repeted = 8;
var combo = 0;
var posX = 370;
var posY = 0;
var tileSize = 40;
var colorBlue = 'blue';
var indice = 0;
var rythmeTable = [1, 1, 2, 2, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8, 8, 8, 8, 8, 8, 8, 8, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 8, 8, 8, 8, 8, 8, 4, 1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 4, 8, 4, 8, 2, 4, 4, 2, 4, 4, 2, 4, 4, 2, 8, 8, 8, 8, 8, 8, 8, 8, 4, 4, 2, 4, 4, 2, 4, 4, 2, 8, 8, 8, 8, 8, 8, 8, 8, 2, 4, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 4, 4, 4, 4, 4, 4, 2, 2, 4, 4, 4, 4, 2, 2, 4, 4, 4, 4, 2, 2, 4, 4, 4, 4, 2, 2, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 1];

//game
var score = 0;
var life = 10;
var badHaut = 0;
var badBas = 0;
var touch = false;

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

    rightButton = new component(640, 630, colorRed, 100, 40);
    rightMidButton = new component(540, 630, colorRed, 100, 40);
    leftMidButton = new component(440, 630, colorRed, 100, 40);
    leftButton = new component(340, 630, colorRed, 100, 40);
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
    indice = 0;
    video.currentTime = 0;
}

function gameLoop(timeStamp) {

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    console.log(noteTab);

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

    //cordes et délimitations
    context.fillStyle = 'black';
    context.fillRect(338, 0, 4, 720);
    context.fillRect(438, 0, 4, 720);
    context.fillRect(538, 0, 4, 720);
    context.fillRect(638, 0, 4, 720);
    context.fillRect(738, 0, 4, 720);

    context.fillRect(340, 645, 30, 6);
    context.fillRect(410, 645, 60, 6);
    context.fillRect(510, 645, 60, 6);
    context.fillRect(610, 645, 60, 6);
    context.fillRect(710, 645, 30, 6);

    frameController(timeStamp);

    context.font = '25px Arial';
    context.fillStyle = 'red';
    context.fillText("SCORE: " + score, 10, 60);
    context.fillText("LIFE: " + life, 10, 90);
    context.fillText("BADHAUT: " + badHaut, 10, 120);
    context.fillText("BADBAS: " + badBas, 10, 150);
    context.fillText("COMBO: " + combo, 10, 180);
}

function update() {
    if (frame == 0) {
        setTimeout(spawnNote, 1780);
    }

    noteTab.forEach((item, index) => {
        item.y += 10;
    })
    if (noteTab[0] != null) {
        if (noteTab[0].y > 720) {
            life -= 1;
            combo = 0;
            noteTab.splice(0, 1);
        }
    }
}

function keyDownHandler(e) {
    if(e.key == "k" || e.key == "K") {
        if (rightPressed == false) {
            //rightButton.color = colorGreen;
            collision(rightButton);
        }
        rightPressed = true;
    }
    else if(e.key == "j" || e.key == "J") {
        if (rightMidPressed == false) {
            //rightMidButton.color = colorGreen;
            collision(rightMidButton);
        }
        rightMidPressed = true;
    }
    else if(e.key == "f" || e.key == "F") {
        if (leftMidPressed == false) {
            //leftMidButton.color = colorGreen;
            collision(leftMidButton);
        }
        leftMidPressed = true;
    }
    else if(e.key == "d" || e.key == "D") {
        if (leftPressed == false) {
            //leftButton.color = colorGreen;
            collision(leftButton);
        }
        leftPressed = true;
    }
    document.removeEventListener("keydown", keyDownHandler, false);
}

function keyUpHandler(e) {
    if(e.key == "k" || e.key == "K") {
        rightPressed = false;
        rightButton.color = colorRed;
    }
    else if(e.key == "j" || e.key == "J") {
        rightMidPressed = false;
        rightMidButton.color = colorRed;
    }
    else if(e.key == "f" || e.key == "F") {
        leftMidPressed = false;
        leftMidButton.color = colorRed;
    }
    else if(e.key == "d" || e.key == "D") {
        leftPressed = false;
        leftButton.color = colorRed;
    }
    document.removeEventListener("keyup", keyUpHandler, false);
}

function collision(button) {
    
        if ((button.x + 30) == noteTab[0].x) {
            if (noteTab[0].y >= 600 && noteTab[0].y <= 650) {
                touch = true;
                combo += 1;
                score += (300*combo);
                noteTab.splice(0, 1);
                button.color = colorGreen;
            }
            else if (noteTab[0].y >= 570 && noteTab[0].y <= 680) {
                touch = true;
                combo += 1;
                score += (100*combo);
                noteTab.splice(0, 1);
                button.color = colorOrange;
            }
            else if (noteTab[0].y < 650) {
                badHaut += 1;
                touch = true;
                life -= 1;
                combo = 0;
            }
            else if (noteTab[0].y > 650) {
                badBas += 1;
                touch = true;
                life -= 1;
                combo = 0;
                noteTab.splice(0, 1);
            }
        }
        else {
            life -= 1;
            combo = 0;
        }
        if ((combo%5 == 0) && combo != 0) {
            life += 1;
            if (life > 10) {
                life = 10;
            }
        }
}

function spawnNote() {
    if (indice <= rythmeTable.length) {
        randomSpawn = Math.floor(Math.random() * 4);
        note = new component(posX + (randomSpawn*100), -tileSize, colorBlue, tileSize, tileSize);
        noteTab.push(note);
        if (video.currentTime == 0) {
            return;
        }
        indice += 1;
        setTimeout(spawnNote, 2308.6*(1/rythmeTable[indice-1]));
    }
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

    context.font = '25px Arial';
    context.fillStyle = 'red';
    context.fillText("FPS: " + fps, 10, 30);
}