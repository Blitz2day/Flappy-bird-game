var cvs = document.querySelector('#canvas');
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBot = new Image();

var gap = 90;
var score = 0;

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeUp.src = "images/pipeUp.png";
pipeBot.src = "images/pipeBottom.png";

//Sound files

var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";


//bird Pos
 var xPos = 10;
 var yPos = 150;
 var grav = 1.5;

//Any button click action

document.addEventListener('keydown', moveUp);

function moveUp() {
    yPos -= 30;
    fly.play();
}
//Block creation

var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}

function draw() {
    ctx.drawImage(bg, 0, 0);
    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBot, pipe[i].x, pipe[i].y + pipeUp.height+ gap);

        pipe[i].x--;

        if (pipe[i].x == 100) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random()*pipeUp.height) - pipeUp.height
            });
        }

        //Check the collision with pipe
        if (xPos + bird.height >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width 
            && (yPos <= pipe[i].y + pipeUp.height 
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
                
        location.reload();
        }

        //Score counter 
        if (pipe[i].x == 5) {
            score++;
            score_audio.play();

        }
    }
    
    
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    //creation of score text
    ctx.fillStyle = "#000";
    ctx.font = "25px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height - 20);


    requestAnimationFrame(draw);
}

pipeBot.onload = draw;
