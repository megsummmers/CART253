/**************************************************
Template p5 project by Pippin Barr
Extra code by Meg (Margaret) Summers

Make your changes to the simulation with the following requirements:

Add at least one extra function
Not including functions any built-in p5 functions like keyPressed()
Maybe you could add a function that checks if one circle has grown too large (if they grow) or shrunk too small (if they shrink), or faded too much (if their alpha fades)
**************************************************/

//VARIABLES
let user = {
  size: 150,
  x: 500,
  y: 500,
  speed: 10,
  r: 255,
  g: 255,
  b: 255,
  alpha: 150
};

let loveCircle = {
  size: 150,
  x: 0,
  y: 0,
  r: 175,
  g: 175,
  b: 175,
  alpha: 255,
  shrink: 1
};

let bg = {
  r: 0,
  g: 0,
  b: 0
};

let brokenHearts = 0;

//add state
let state = 'title';

// setup()
//
// Creates canvas, sets no stroke and preloads the image
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  preLoad();
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
  fill(255, 133, 177);
  rectMode(CENTER);
  rect(width/2, height/2, windowWidth, windowHeight);
  textAlign(CENTER);
  fill(255);
  textSize(80);
  text('Welcome to looking for Love', width/2, height/3);
  textSize(50);
  text("For info on how to play, press 'H'", width/2, height/2);
  text("To begin the game, press 'P'", width/2, height/2 + 50);
  if(key === 'h'){
    fill(255, 133, 177);
    rectMode(CENTER);
    rect(width/2, height/2, windowWidth, windowHeight);
    textAlign(CENTER);
    fill(255);
    textSize(80);
    text('HOW TO PLAY:', width/2, height/2 - 100);
    textSize(25);
    text('Your goal is to find and touch the other circle before it shrinks away', width/2, height/2);
    text('To control the grey circle; use the arrow keys (up, down, left and right)', width/2, height/2 + 40);
    text('Each time the circle fully shrinks it will change positions and one of your hearts will disappear', width/2, height/2 + 80);
    text("If you can't find the other heart before it shrinks 5 times, you lose.", width/2, height/2 + 120);
    textSize(50);
    text("To begin playing, press 'P'", width/2, height/2 + 160);
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
  fill(loveCircle.r, loveCircle.g, loveCircle.b, loveCircle.alpha);
  ellipse(loveCircle.x, loveCircle.y, loveCircle.size);

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
  if(loveCircle.size >= 1){
    loveCircle.size = loveCircle.size - loveCircle.shrink;
    loveCircle.size = constrain(loveCircle.size, 0, 150);
  } else if(loveCircle.size <= 0){
    loveCircle.size += 150;
    brokenHearts += 1;
    loveCircle.x = random(0, width);
    loveCircle.y = random(0, height);
  }

  //----- OVERLAY CHECK -----
  let d = dist(user.x, user.y, loveCircle.x, loveCircle.y);
  if (d <= 150){
    //----- GAME OVER -----
    state = 'ending';
    //----- PROXIMITY ALPHA -----
  } else if (d > 300) {
    loveCircle.alpha -= 10;
    loveCircle.alpha = constrain(loveCircle.alpha, 0, 175);
  } else if (d < 300) {
    loveCircle.alpha += 10;
    loveCircle.alpha = constrain(loveCircle.alpha, 0, 175);
  }
}

//----- END GAME SECTION -----
function ending(num, r, g, b) {
  //lovecircle
  loveCircle.alpha -= 10;
  loveCircle.alpha = constrain(loveCircle.alpha, 0, 255);
  //user
  user.alpha -= 10;
  user.alpha = constrain(user.alpha, 0, 150);
  //background
  bg.r += 5;
  bg.r = constrain(bg.r, 0, r);
  bg.g += 5;
  bg.g = constrain(bg.g, 0, g);
  bg.b += 5;
  bg.b = constrain(bg.b, 0, b);
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
    image(img, width/2, 50, 100, 100);
    image(img, width/2 -100, 50, 100, 100);
    image(img, width/2 -200, 50, 100, 100);
    image(img, width/2 +100, 50, 100, 100);
    image(img, width/2 +200, 50, 100, 100);
  } else if (brokenHearts === 1){
    //4 hearts on screen
    image(img, width/2, 50, 100, 100);
    image(img, width/2 -100, 50, 100, 100);
    image(img, width/2 -200, 50, 100, 100);
    image(img, width/2 +100, 50, 100, 100);
  } else if (brokenHearts === 2){
    //3 hearts on screen
    image(img, width/2, 50, 100, 100);
    image(img, width/2 -100, 50, 100, 100);
    image(img, width/2 -200, 50, 100, 100);
  } else if (brokenHearts === 3){
    //2 hearts on screen
    image(img, width/2 -100, 50, 100, 100);
    image(img, width/2 -200, 50, 100, 100);
  } else if (brokenHearts === 4){
    //1 hearts on screen
    image(img, width/2 -200, 50, 100, 100);
  } else if (brokenHearts === 5){
    //0 hearts on screen, finishes game
    state = 'ending';
  }
}
