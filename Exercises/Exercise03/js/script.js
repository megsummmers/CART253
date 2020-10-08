/**************************************************
Template p5 project by Pippin Barr
Extra code by Meg (Margaret) Summers

A quick game where 2 circle try to reunite before
one shrinks away and loses all their hearts.
Includes a title and end screen, with optional
instruction screen.
**************************************************/

//VARIABLES
let user = {
  size: 150,
  x: 500,
  y: 500,
  speed: 10,
  r: 200,
  g: 200,
  b: 255,
  alpha: 150,
};

let lover = {
  size: 150,
  x: 0,
  y: 0,
  r: 255,
  g: 150,
  b: 185,
  alpha: 255,
  shrink: 1,
};

let bg = {
  r: 0,
  g: 0,
  b: 0,
  pr: 255,
  pg: 135,
  pb: 175,
  growth: 5
};

let imgCoord = {
  x: 500,
  y: 50,
  size: 100,
  size2: 100
}

let brokenHearts = 0;

//add state
let state = 'title';

// setup()
//
// Creates canvas, sets no stroke and preloads the image
function setup() {
  createCanvas(windowWidth, windowHeight);
  //noStroke();
  preLoad();
  textFont('Helvetica');

  //----- VARIABLES SETUP -----
  imgCoord.x = width/2;
  user.x = width/2;
  user.y = height/2;
  lover.x = random(0, width);
  lover.y = random(0, height);
}

// draw()
//
// sets and moves the two circles
// controls the pixel heart lives
function draw() {
  //----- BACKGROUND SETUP -----
  background(bg.r, bg.g, bg.b);

  //----- STATE SETUP -----
  if(state === 'title'){
    titleScreen();
  }
  else if (state === 'gameplay'){
    gameplay();
  }
  else if (state === 'ending'){
    //----- NUM OF LIVES CHECK -----
      if(brokenHearts <= 2){
        ending(brokenHearts, 255, 115, 171);
      } else if (brokenHearts === 3 || brokenHearts === 4){
        ending(brokenHearts, 155, 100, 120);
      } else if (brokenHearts === 5){
        ending(brokenHearts, 70, 50, 60);
      }
  }
}

//----- IMAGE PRELOAD -----
function preLoad(){
  img = loadImage ('assets/images/pixel-heart.PNG');
}

//----- TITLE SCREEN -----
function titleScreen(){
  fill(bg.pr, bg.pg, bg.pb);
  rectMode(CENTER);
  rect(width/2, height/2, windowWidth, windowHeight);
  textAlign(CENTER);
  fill(255);
  textSize(100);
  text('Welcome to looking for Love', width/2, height/3);
  textSize(60);
  text("For info on how to play, press 'H'", width/2, height/2 -60);
  text("To begin the game, press 'P'", width/2, height/2);
  if(key === 'h'){
    fill(bg.pr, bg.pg, bg.pb);
    rectMode(CENTER);
    rect(width/2, height/2, windowWidth, windowHeight);
    textAlign(CENTER);
    fill(255);
    textSize(100);
    text('HOW TO PLAY:', width/2, height/2 - 120);
    textSize(40);
    text('Your goal is to find and touch the other circle before it shrinks away', width/2, height/2);
    text('To control the grey circle; use the arrow keys (up, down, left and right)', width/2, height/2 + 50);
    text('Each time the circle fully shrinks it will change positions and one of your hearts will disappear', width/2, height/2 + 100);
    text("If you can't find the other heart before it shrinks 5 times, you lose.", width/2, height/2 + 150);
    textSize(60);
    text("To begin playing, press 'P'", width/2, height/2 + 250);
  } else if (key === 'p' && state === 'title'){
    state = 'gameplay';
  }
}

//----- GAMEPLAY SECTION -----
function gameplay(){
  //----- USER SETUP -----
  fill(user.r, user.g, user.b, user.alpha);
  ellipse(user.x, user.y, user.size);

  //----- LOVECIRCLE SETUP -----
  fill(lover.r, lover.g, lover.b, lover.alpha);
  ellipse(lover.x, lover.y, lover.size);

  //----- LIVES SETUP -----
  livesCounter(brokenHearts);

  //----- USER MOVEMENT CONTROL -----
  if (keyIsDown(UP_ARROW)) {
    user.y = user.y - user.speed;
    user.y = constrain(user.y, 0, height);
  } else if (keyIsDown(DOWN_ARROW)) {
    user.y = user.y + user.speed;
    user.y = constrain(user.y, 0, height);
  } else if (keyIsDown(LEFT_ARROW)) {
    user.x = user.x - user.speed;
    user.x = constrain(user.x, 0, width);
  } else if (keyIsDown(RIGHT_ARROW)) {
    user.x = user.x + user.speed;
    user.x = constrain(user.x, 0, width);
  }

  //----- LOVECIRCLE SHRINK -----
  if(lover.size >= 1){
    lover.size = lover.size - lover.shrink;
    lover.size = constrain(lover.size, 0, 150);
  } else if(lover.size <= 0){
    lover.size += 150;
    brokenHearts += 1;
    lover.x = random(0, width);
    lover.y = random(0, height);
  }

  //----- OVERLAP CHECK + POXIMITY FADE -----
  let d = dist(user.x, user.y, lover.x, lover.y);
  if (d <= 100){
    //----- GAME OVER -----
    state = 'ending';
  } else if (d > 400) {
    lover.alpha -= 10;
    lover.alpha = constrain(lover.alpha, 0, 175);
  } else if (d < 400) {
    lover.alpha += 10;
    lover.alpha = constrain(lover.alpha, 0, 175);
  }
}

//----- END GAME SECTION -----
function ending(num, r, g, b) {
  //background
  bg.r += bg.growth;
  bg.r = constrain(bg.r, 0, r);
  bg.g += bg.growth;
  bg.g = constrain(bg.g, 0, g);
  bg.b += bg.growth;
  bg.b = constrain(bg.b, 0, b);
  //lovecircle
  lover.alpha -= 10;
  lover.alpha = constrain(lover.alpha, 0, 255);
  //user
  user.alpha -= 10;
  user.alpha = constrain(user.alpha, 0, 150);
  //text
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  if (num <= 2){
    text('Congratulations! You are loved <3', width/2, height/2);
  } else if (num === 3 || num === 4){
    text('Congratulations! You managed to find love.', width/2, height/2);
  } else if (num === 5){
    text('You lost your chance at love...', width/2, height/2);
  }
}

//----- PIXEL HEART LIVES COUNTER -----
function livesCounter(brokenHearts){
  if(brokenHearts === 0){
    //5 hearts on screen
    image(img, imgCoord.x -200, imgCoord.y, imgCoord.size, imgCoord.size2);
    image(img, imgCoord.x -100, imgCoord.y, imgCoord.size, imgCoord.size2);
    image(img, imgCoord.x, imgCoord.y, imgCoord.size, imgCoord.size2);
    image(img, imgCoord.x +100, imgCoord.y, imgCoord.size, imgCoord.size2);
    image(img, imgCoord.x +200, imgCoord.y, imgCoord.size, imgCoord.size2);
  } else if (brokenHearts === 1){
    //4 hearts on screen
    image(img, imgCoord.x -200, imgCoord.y, imgCoord.size, imgCoord.size2);
    image(img, imgCoord.x -100, imgCoord.y, imgCoord.size, imgCoord.size2);
    image(img, imgCoord.x, imgCoord.y, imgCoord.size, imgCoord.size2);
    image(img, imgCoord.x +100, imgCoord.y, imgCoord.size, imgCoord.size2);
  } else if (brokenHearts === 2){
    //3 hearts on screen
    image(img, imgCoord.x -200, imgCoord.y, imgCoord.size, imgCoord.size2);
    image(img, imgCoord.x -100, imgCoord.y, imgCoord.size, imgCoord.size2);
    image(img, imgCoord.x, imgCoord.y, imgCoord.size, imgCoord.size2);
  } else if (brokenHearts === 3){
    //2 hearts on screen
    image(img, imgCoord.x -200, imgCoord.y, imgCoord.size, imgCoord.size2);
    image(img, imgCoord.x -100, imgCoord.y, imgCoord.size, imgCoord.size2);
  } else if (brokenHearts === 4){
    //1 hearts on screen
    image(img, imgCoord.x -200, imgCoord.y, imgCoord.size, imgCoord.size2);
  } else if (brokenHearts === 5){
    //0 hearts on screen, finishes game
    state = 'ending';
  }
}
