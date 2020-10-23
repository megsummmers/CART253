/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
"use strict";

// VARIABLES
let patients = [];
let patientNum = 6;
let state = 'title';
let ending = 1;
let sixFeet = 40;
let curedCount = 0;
let difficulty = 'easy';
let play = 'true';
// IMAGE VARIABLES
let imgEasyBG;
let imgHardBG;
let imgTitle;
let imgControls;
let imgDifficulty;
let imgEasyWin;
let imgHardWin;
let imgLose;
// SOUND VARIABLES
let winSound;
let loseSound;
let cureSound;

let enemy = {
  x: 300,
  y: 400,
  size: 40,
  r: 200,
  g: 0,
  b: 0,
  vx: 0,
  vy: 0,
  speed: 1
};

let user = {
  x: 300,
  y: 100,
  size: 40,
  color: 255,
  speed: 3
};

let titleBox = {
  playx: 300, playy: 325, plays: 300, playr: 150,
  contx: 100, conty: 500, conts: 150, contr: 75
};

let trophy = {
  x: 300, y: 450, size: 250
};

function preLoad(){
  //IMAGES
  imgEasyBG = loadImage('assets/images/easyBG.jpg');
  imgHardBG = loadImage('assets/images/hardBG.jpg');
  imgTitle = loadImage('assets/images/titlescreen.jpg');
  imgControls = loadImage('assets/images/controlsScreen.jpg');
  imgDifficulty = loadImage('assets/images/difficultySelect.jpg');
  imgHardWin = loadImage('assets/images/hardWin.jpg');
  imgEasyWin = loadImage('assets/images/easyWin.jpg');
  imgLose = loadImage('assets/images/lose.jpg');
  //SOUNDS
  winSound = loadSound('assets/sounds/winSound.mp3');
  cureSound = loadSound('assets/sounds/ding.mp3');
  loseSound = loadSound('assets/sounds/loseSound.mp3');
}

// setup()
//
// creates canvas and puts infected in array
function setup() {
  createCanvas(600, 600);
  noStroke();
  preLoad();

  for (let i = 0; i < patientNum; i++) {
    patients[i] = createInfected(random(0,width),random(0,height));
  }
}

//----- CREATES INFECTED OBJECTS -----
function createInfected(x, y){
  //creates the object within the array
  let infected = {
    x: x,
    y: y,
    size: 50,
    r: 200, g: 0, b: 0,
    cured: false,
    vx: 0,
    vy: 0,
    speed: 2
  };
  return infected;
}

// draw()
//
// sets background and moves between states
function draw() {
  background(0);

  if (state === 'title'){
    titleScreen();
  } else if (state === 'controls'){
    controlScreen();
  } else if (state === 'difficulty'){
    difficultySelect();
  } else if (state === 'gameplay'){
    if(difficulty === 'add'){
      addPatients(4);
      difficulty = 'hard';
    }
    gameplay();
  } else if (state === 'ending'){
    endScreen(ending);
  }
}

//----- TITLE SCREEN -----
function titleScreen(){
  image(imgTitle, 0, 0, 600, 600);
  push();
  fill(255, 255, 255, 0);
  ellipse(titleBox.contx, titleBox.conty, titleBox.conts);
  ellipse(titleBox.playx, titleBox.playy, titleBox.plays);
  pop();
}

//----- DIFFICULTY SELECT -----
function difficultySelect(){
  image(imgDifficulty, 0, 0, 600, 600);

  if(key === 'e'){
    difficulty = 'easy';
    state = 'gameplay';
  } else if(key === 'h'){
    difficulty = 'add';
    state = 'gameplay';
  }
}

//----- CLICK MECHANIC -----
function mousePressed() {
  //TITLE SCREEN
  let controlsD = dist(mouseX, mouseY, titleBox.contx, titleBox.conty);
  let playD = dist(mouseX, mouseY, titleBox.playx, titleBox.playy);
  if (playD <= titleBox.playr && state === 'title'){
    state = 'difficulty';
  }
  if (controlsD <= titleBox.contr && state === 'title'){
    state = 'controls';
  }
  //END SCREEN
  let trophyD = dist(mouseX, mouseY, trophy.x, trophy.y);
  if (trophyD <= 125 && state === 'ending' && difficulty === 'hard'){
    winSound.play();
  }
}

//----- HOW TO PLAY SCREEN -----
function controlScreen(){
  image(imgControls, 0, 0, 600, 600);
  if(key === 'b'){
    state = 'title';
  }
}

//----- GAMEPLAY SECTION -----
function gameplay(){
  //----- BACKGROUND IMAGE -----
  imageMode(CORNER);
  if(difficulty === 'easy'){
    image(imgEasyBG, 0, 0, 600, 600);
  } else if (difficulty === 'hard'){
    image(imgHardBG, 0, 0, 600, 600);
    enemy.speed = 1.4;
  }
  //----- PATIENT SETUP -----
  for (let i = 0; i < patients.length; i++) {
    moveInfected(patients[i]);
    displayInfected(patients[i]);
  }

  //----- USER + DOCTOR SETUP -----
  push();
  //user circle
  fill(user.color);
  ellipse(user.x, user.y, user.size);
  //enemy circle
  fill(enemy.r, enemy.g, enemy.b);
  rectMode(CENTER)
  rect(enemy.x, enemy.y, enemy.size);
  pop();

  //----- USER CONTROL -----
  if (keyIsDown(UP_ARROW)){
    user.y = user.y - user.speed;
    user.y = constrain(user.y, 0, height);
  } else if (keyIsDown(DOWN_ARROW)){
    user.y = user.y + user.speed;
    user.y = constrain(user.y, 0, height);
  } else if (keyIsDown(LEFT_ARROW)){
    user.x = user.x - user.speed;
    user.x = constrain(user.x, 0, width);
  } else if (keyIsDown(RIGHT_ARROW)){
    user.x = user.x + user.speed;
    user.x = constrain(user.x, 0, width);
  }

  //----- DISTANCE CHECK FOR PATIENTS -----
  for (let j = 0; j < patients.length; j++) {
    touchInfected(patients[j]);
  }

  //----- ENEMY FOLLOW MECHANIC -----
  let xDistance = enemy.x - user.x;
  let yDistance = enemy.y - user.y;
  //checks which side mouse is
  if (xDistance < 0) {
    enemy.vx = enemy.speed;
  }
  else if (xDistance > 0) {
    enemy.vx = -enemy.speed;
  }
  if (yDistance < 0) {
    enemy.vy = enemy.speed;
  }
  else if (yDistance > 0) {
    enemy.vy = -enemy.speed;
  }
  //moves enemy in that direction
  enemy.x = enemy.x + enemy.vx;
  enemy.y = enemy.y + enemy.vy;

  //----- LOSE END CONDITION -----
  if(dist(user.x, user.y, enemy.x, enemy.y) <= sixFeet) {
    ending = 1;
    state = 'ending';
  }

  //----- WIN END CONDITION -----
  if (curedCount === patients.length) {
    ending = 2;
    state = 'ending';
  }
}

//----- END SCREEN SECTION -----
function endScreen(endNumber){
  if (endNumber === 1) { //lose screen
    imageMode(CORNER);
    image(imgLose, 0, 0, 600, 600);
    if(play){
      loseSound.play();
      play = false;
    }
  } else if (endNumber === 2 && difficulty === 'hard'){ //hard more win
    imageMode(CORNER);
    image(imgHardWin, 0, 0, 600, 600);
    push();
    fill(255, 255, 255, 0);
    ellipse(trophy.x, trophy.y, trophy.size);
    pop();
  } else if (endNumber === 2) { //easy mode win
    imageMode(CORNER);
    image(imgEasyWin, 0, 0, 600, 600);
  }
}

//----- USER + DOCTOR PROXIMITY -----
function touchInfected(infected) {
  let userDistance = dist(user.x, user.y, infected.x, infected.y);
  let enemyDistance = dist(enemy.x, enemy.y, infected.x, infected.y);
  if (userDistance <= sixFeet && !infected.cured) {
    infected.r = random(200, 255);
    infected.g = random(200, 255);
    infected.b = random(200, 255);
    infected.cured = true;
    curedCount = curedCount + 1;
    curedCount = constrain(curedCount, 0, patients.length);
    cureSound.play();
  } else if (enemyDistance <= sixFeet && infected.cured) {
    infected.r = 225;
    infected.g = 0;
    infected.b = 0;
    infected.cured = false;
    curedCount = curedCount - 1;
    curedCount = constrain(curedCount, 0, patients.length);
  }
}

//----- MOVES THE PATIENTS -----
function moveInfected(infected) {
  let change = random(0, 1);
  if (change < 0.05) {
    infected.vx = random(-infected.speed, infected.speed);
    infected.vy = random(-infected.speed, infected.speed);
  }
  infected.x = infected.x + infected.vx;
  infected.y = infected.y + infected.vy;

  infected.x = constrain(infected.x, 0, width);
  infected.y = constrain(infected.y, 0, height);
}

//----- PATIENT DISPLAY CONTROL -----
function displayInfected(infected) {
  push();
  fill(infected.r, infected.g, infected.b);
  noStroke();
  ellipse(infected.x, infected.y, infected.size);
  pop();
}

//----- ADD PATIENTS -----
function addPatients(addNum){
  let newPatient;
  for (let i = 0; i < addNum; i++) {
    newPatient = createInfected(random(0,width),random(0,height));
    patients.push(newPatient);
  }
}
