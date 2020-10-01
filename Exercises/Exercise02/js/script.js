/**************************************************
Template p5 project by Pippin Barr
Rest of the code by Meg Summers


**************************************************/

//VARIABLES
let bg = {
  r: 0,
  g: 0,
  b: 0,
};
let spaceship = {
  alpha: 255,
  x: 660,
  y: 660
};
let meteor = {
  alpha: 0,
  x: 0,
  y: 500,
  size: 250,
  speed: 14,
  r: 97,
  g: 69,
  b: 63,
  growthRate: 10
};
let craters = {
  alpha: 0,
  r: 48,
  g: 39,
  b: 37,
  size1: 100,
  size2: 40,
  size3: 75,
  size4: 80,
  x1: -50,
  y1: 550,
  x2: 60,
  y2: 425,
  x3: 75,
  y3: 520,
  x4: -45,
  y4: 425
};
let bgMeteor = {
  alpha: 125,
  x: 0,
  y: 200,
  x2: 0,
  y2: 800,
  size: 100,
  size2: 175,
  speed: 10,
  speed2: 5,
  r: 67,
  g: 39,
  b: 33
};
let gameOver = false;
let starAmount = 250;

// setup()
//
// sets canvas size, noStroke and noCursor
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  noCursor();
}

// draw()
//
// creates and moves spaceship and meteor
// contains if/else statements
// -Game over -Overlap -Random start for meteor
// -Colour change
function draw() {
  //-------- BACKGROUND SETUP --------
  background(bg.r, bg.g, bg.b);

  //-------- BG METOR SETUP --------
  fill(bgMeteor.r, bgMeteor.g, bgMeteor.b, bgMeteor.alpha);
  ellipse(bgMeteor.x, bgMeteor.y, bgMeteor.size);
  ellipse(bgMeteor.x2, bgMeteor.y2, bgMeteor.size2);

  //-------- Stars/Static --------
  for(let i = 0; i <= starAmount; i++){
    push();
    stroke(255);
    strokeWeight(2)
    let x = random(0, width);
    let y = random(0, height);
    point(x, y);
    pop();
  }

  //-------- SPACESHIP SETUP --------
  image(img, spaceship.x, spaceship.y, spaceship.alpha);

  //-------- METOR SETUP --------
  push();
  strokeWeight(5);
  stroke(craters.r, craters.g, craters.b, craters.alpha);
  fill(meteor.r, meteor.g, meteor.b, meteor.alpha);
  ellipse(meteor.x, meteor.y, meteor.size);
  pop();
  //-------- CRATER SETUP --------
  fill(craters.r, craters.g, craters.b, craters.alpha);
  ellipse(craters.x1, craters.y1, craters.size1);
  ellipse(craters.x2, craters.y2, craters.size2);
  ellipse(craters.x3, craters.y3, craters.size3);
  ellipse(craters.x4, craters.y4, craters.size4);

  //-------- METOR MOVEMENT --------
  if(!gameOver){
    meteor.x = meteor.x + meteor.speed;
    craters.x1 = craters.x1 + meteor.speed;
    craters.x2 = craters.x2 + meteor.speed;
    craters.x3 = craters.x3 + meteor.speed;
    craters.x4 = craters.x4 + meteor.speed;
    //-------- BG METOR MOVEMENT --------
    bgMeteor.x = bgMeteor.x + bgMeteor.speed;
    bgMeteor.x2 = bgMeteor.x2 + bgMeteor.speed2;

  } else if(gameOver){ //GAMEOVER SECTION
    //-------- METOR GAMEOVER --------
    meteor.size = meteor.size + meteor.growthRate;
    meteor.size = constrain(meteor.size, 200, width);
    meteor.r = meteor.r +3
    meteor.g = meteor.g +3
    meteor.b = meteor.b +3

    //-------- BG METOR GAMEOVER --------
    bgMeteor.alpha = bgMeteor.alpha - 150;

    //-------- CRATER GAMEOVER --------
    craters.size1 = craters.size1 + meteor.growthRate;
    craters.size2 = craters.size2 + meteor.growthRate;
    craters.size3 = craters.size3 + meteor.growthRate;
    craters.size4 = craters.size4 + meteor.growthRate;
    craters.alpha = craters.alpha - 15;

    //-------- SPACESHIP GAMEOVER --------
    spaceship.alpha = spaceship.alpha - 255;

    //-------- BACKGROUND GAMEOVER --------
    bg.r = bg.r + 3;
    bg.g = bg.g + 3;
    bg.b = bg.b + 3;

    //-------- GAMEOVER TEXT --------
    fill(0);
    textAlign(CENTER);
    textSize(250);
    textFont('Helvetica');
    text('Game Over.', width/2, height/2);
  }

  //-------- METOR RESET/RANDOM --------
  if(meteor.x >= width +150){
    let meteorY = random(0, height);
    meteor.x = meteor.x - width -200;
    craters.x1 = craters.x1 - width -200;
    craters.x2 = craters.x2 - width -200;
    craters.x3 = craters.x3 - width -200;
    craters.x4 = craters.x4 - width -200;
    meteor.y = meteorY;
    craters.y1 = meteorY +50;
    craters.y2 = meteorY -75;
    craters.y3 = meteorY +20;
    craters.y4 = meteorY -75;
  }

  //-------- BG METOR RESET/RANDOM --------
  if(bgMeteor.x >= width + 100){
    let bgMeteorY = random(0, height);
    bgMeteor.y = bgMeteorY;
    bgMeteor.x = bgMeteor.x - width -100;
  }
  if(bgMeteor.x2 >= width +100){
    let bgMeteorY2 = random(0, height);
    bgMeteor.y2 = bgMeteorY2;
    bgMeteor.x2 = bgMeteor.x2 - width -100;
  }

  //-------- OVERLAP CHECK --------
  //change to spaceship coordinate
  let d = dist(spaceship.x, spaceship.y, meteor.x, meteor.y);
  if(d <= 175){
    gameOver = true;
  }

  //-------- PROXIMITY METEOR COLOUR CHANGE --------
  if(!gameOver){
    if(d > 700){
      meteor.alpha = meteor.alpha - 15;
      meteor.alpha = constrain (meteor.alpha, 0, 255);
      craters.alpha = craters.alpha - 15;
      craters.alpha = constrain (craters.alpha, 0, 255);
    } else if (d < 700){
      meteor.alpha = meteor.alpha + 15;
      meteor.alpha = constrain (meteor.alpha, 0, 255);
      craters.alpha = craters.alpha + 15;
      craters.alpha = constrain (craters.alpha, 0, 255);
    }
  }
}

//-------- IMAGE FUNCTION --------
function preload(){
  img = loadImage('assets/images/8-bit-spaceship.PNG');
}
//-------- MOUSE DRAG FUNCTION --------
function mouseDragged(){
  //allows spaceship to move while mouse is dragged
  spaceship.x += movedX;
  spaceship.y += movedY;
}
