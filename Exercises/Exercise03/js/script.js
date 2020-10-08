/**************************************************
Template p5 project by Pippin Barr
Extra code by Meg (Margaret) Summers

Make your changes to the simulation with the following requirements:

Add at least one extra function
Not including functions any built-in p5 functions like keyPressed()
Maybe you could add a function that checks if one circle has grown too large (if they grow) or shrunk too small (if they shrink), or faded too much (if their alpha fades)
Add at least one extra ending
Maybe it could be an “easter egg” and hard to discover? (Moving the mouse to a really specific location?)
Maybe it offers a different dimension of thinking about love and loss?
Maybe it’s connected to the new function in the previous step?
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
}

let endScreen = 0;

let brokenHearts = 0;

// setup()
//
//
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  preLoad();
}
// draw()
//
//
function draw() {
  background(bg.r, bg.g, bg.b);
  //----- RANDOM LOVECIRCLE SET-----

  //----- USER SETUP -----
  fill(user.r, user.g, user.b, user.alpha);
  ellipse(user.x, user.y, user.size);

  //----- LOVECIRCLE SETUP -----
  fill(loveCircle.r, loveCircle.g, loveCircle.b, loveCircle.alpha);
  ellipse(loveCircle.x, loveCircle.y, loveCircle.size);

  //----- LIVES SETUP -----
  if (endScreen === 0){
    endScreen = livesCounter(brokenHearts);
  }

  //----- USER MOVEMENT CONTROL -----
  if (keyIsDown(UP_ARROW) && endScreen === 0) {
    user.y = user.y - user.speed;
    user.y = constrain(user.y, 0, height);
  } else if (keyIsDown(DOWN_ARROW) && endScreen === 0) {
    user.y = user.y + user.speed;
    user.y = constrain(user.y, 0, height);
  } else if (keyIsDown(LEFT_ARROW) && endScreen === 0) {
    user.x = user.x - user.speed;
    user.x = constrain(user.x, 0, width);
  } else if (keyIsDown(RIGHT_ARROW) && endScreen === 0) {
    user.x = user.x + user.speed;
    user.x = constrain(user.x, 0, width);
  }

  //----- LOVECIRCLE SHRINK -----
  if(loveCircle.size >= 1 && endScreen === 0){
    loveCircle.size = loveCircle.size - loveCircle.shrink;
    loveCircle.size = constrain(loveCircle.size, 0, 150);
  } else if(loveCircle.size <= 0 && endScreen === 0){
    loveCircle.size += 150;
    brokenHearts += 1;
    loveCircle.x = random(0, width);
    loveCircle.y = random(0, height);
  }

  //----- OVERLAY CHECK -----
  let d = dist(user.x, user.y, loveCircle.x, loveCircle.y);
  if (d <= 150){
    //----- GAME OVER -----
    endScreen = 1;
    //----- PROXIMITY ALPHA -----
  } else if (d > 300 && endScreen === 0) {
    loveCircle.alpha -= 10;
    loveCircle.alpha = constrain(loveCircle.alpha, 0, 175);
  } else if (d < 300 && endScreen === 0) {
    loveCircle.alpha += 10;
    loveCircle.alpha = constrain(loveCircle.alpha, 0, 175);
  }

  //----- ENDSCREEN CHECK -----
  if(endScreen === 1){
    if(brokenHearts <= 2){
      endGameScreen(brokenHearts, 255, 115, 171);
    } else if (brokenHearts === 3 || brokenHearts === 4){
      endGameScreen(brokenHearts, 155, 100, 120);
    } else if (brokenHearts === 5){
      endGameScreen(brokenHearts, 70, 50, 60);
    }
  }
}

function preLoad(){
  img = loadImage ('assets/images/pixel-heart.PNG');
}

function endGameScreen(num, r, g, b) {
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
  if (num <= 2){
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text('Congratulations! You are loved <3', width/2, height/2);
  } else if (num === 3 || num === 4){
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text('Congratulations! You managed to find love.', width/2, height/2);
  } else if (num === 5){
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text('You lost your chance at love...', width/2, height/2);
  }
}

//----- PIXEL HEART LIVES COUNTER -----
function livesCounter(brokenHearts){
  if(brokenHearts === 0){
    image(img, width/2, 50, 100, 100);
    image(img, width/2 -100, 50, 100, 100);
    image(img, width/2 -200, 50, 100, 100);
    image(img, width/2 +100, 50, 100, 100);
    image(img, width/2 +200, 50, 100, 100);
    return 0;
  } else if (brokenHearts === 1){
    image(img, width/2, 50, 100, 100);
    image(img, width/2 -100, 50, 100, 100);
    image(img, width/2 -200, 50, 100, 100);
    image(img, width/2 +100, 50, 100, 100);
    return 0;
  } else if (brokenHearts === 2){
    image(img, width/2, 50, 100, 100);
    image(img, width/2 -100, 50, 100, 100);
    image(img, width/2 -200, 50, 100, 100);
    return 0;
  } else if (brokenHearts === 3){
    image(img, width/2 -100, 50, 100, 100);
    image(img, width/2 -200, 50, 100, 100);
    return 0;
  } else if (brokenHearts === 4){
    image(img, width/2 -100, 50, 100, 100);
    return 0;
  } else if (brokenHearts === 5){
    return 1;
  }

}
