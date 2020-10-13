/**************************************************
Template p5 project by Pippin Barr
Extra code by Meg Summers

Here is a description of this template p5 project.
**************************************************/

//VARIABLES
let bg = {
  r: 0,
  g: 0,
  b: 0,
  er: 255,
  eg: 200,
  eb: 60
};

let user = {
  x: 50,
  y: 50,
  r: 25,
  speed: 5,
  size: 50,
  color: 255,
  alpha: 255
};

let walls = {
  x1: 0,
  x2: 0,
  x3: 0,
  x4: 0,
  x5: 0,
  x6: 0,
  y1: 0,
  y2: 0,
  y3: 0,
  y4: 0,
  y5: 0,
  y6: 0,
  r: 70,
  g: 60,
  b: 60,
  w: 350,
  h: 250,
  alpha: 100
};

let trophy = {
  x: 0,
  y: 0,
  size: 40,
  alpha: 0,
  r: 255,
  g: 200,
  b: 60,
}

let state = 'gameplay';
let rectSide = 'none';
let trophyCount = false;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont('Helvetica');

  //----- VARIABLE SETUP -----
  walls.x1 = width/8 - 100;
  walls.y1 = height/8;
  walls.x2 = width/8 - 100;
  walls.y2 = height/2;
  walls.x3 = width/3 + 100;
  walls.y3 = height/8;
  walls.x4 = width/3 + 100;
  walls.y4 = height/2;
  walls.x5 = width/2 + 400;
  walls.y5 = height/8;
  walls.x6 = width/2 + 400;
  walls.y6 = height/2;
  trophy.x = width - 100;
  trophy.y = height -100
}

// draw()
//
// Description of draw() goes here.
function draw() {
  //background
  background(bg.r, bg.g, bg.b);
  //state
  if (state === 'title'){
    titleScreen();
  } else if (state === 'gameplay'){
    gameplay();
  } else if (state === 'ending'){
    endScreen();
  }
}

function titleScreen(){

}

function gameplay(){
  //----- USER SETUP -----
  fill(user.color, user.color, user.color, user.alpha);
  ellipse(user.x, user.y, user.size);

  //----- TROPHY SETUP -----
  fill(trophy.r, trophy.g, trophy.b, trophy.alpha);
  ellipse(trophy.x, trophy.y, trophy.size);

  //----- EXIT SETUP -----
  push();
  fill(0, 0, 0);
  textSize(5);
  text('EXIT', 50, 50);
  fill(140, 90, 75);
  ellipse(50, 50, 100);
  pop();

  //----- TROPHY PROXIMITY -----
  let d = dist(user.x, user.y, trophy.x, trophy.y);
  if (d <= 50){
    trophy.alpha = 0;
    trophyCount = true;
  } else if (d > 300 && !trophyCount) {
    trophy.alpha -= 20;
    trophy.alpha = constrain(trophy.alpha, 0, 255);
  } else if (d < 300 && !trophyCount) {
    trophy.alpha += 20;
    trophy.alpha = constrain(trophy.alpha, 0, 255);
  }

  //----- DUNGEON WALLS -----
  rectMode(CORNER);
  fill(walls.r, walls.g, walls.b, walls.alpha);
  rect(walls.x1, walls.y1, walls.w, walls.h);
  rect(walls.x2, walls.y2, walls.w, walls.h);
  rect(walls.x3, walls.y3, walls.w, walls.h);
  rect(walls.x4, walls.y4, walls.w, walls.h);
  rect(walls.x5, walls.y5, walls.w, walls.h);
  rect(walls.x6, walls.y6, walls.w, walls.h);

  //----- WALL COLLISION SETUP -----
  let hit = collisionDetect(user.x, user.y, user.r, walls.x1, walls.y1, walls.w, walls.h);
  let hit2 = collisionDetect(user.x, user.y, user.r, walls.x2, walls.y2, walls.w, walls.h);
  let hit3 = collisionDetect(user.x, user.y, user.r, walls.x3, walls.y3, walls.w, walls.h);
  let hit4 = collisionDetect(user.x, user.y, user.r, walls.x4, walls.y4, walls.w, walls.h);
  let hit5 = collisionDetect(user.x, user.y, user.r, walls.x5, walls.y5, walls.w, walls.h);
  let hit6  = collisionDetect(user.x, user.y, user.r, walls.x6, walls.y6, walls.w, walls.h);

  //----- USER MOVEMENT CONTROL -----
  if (keyIsDown(UP_ARROW) && hit != 'bottom' && hit2 != 'bottom' && hit3 != 'bottom' && hit4 != 'bottom' && hit5 != 'bottom' && hit6 != 'bottom') {
    user.y = user.y - user.speed;
    user.y = constrain(user.y, 50, height - 50);
  } else if (keyIsDown(DOWN_ARROW) && hit != 'top' && hit2 != 'top' && hit3 != 'top' && hit4 != 'top' && hit5 != 'top' && hit6 != 'top') {
    user.y = user.y + user.speed;
    user.y = constrain(user.y, 50, height - 50);
  } else if (keyIsDown(LEFT_ARROW) && hit != 'right' && hit2 != 'right' && hit3 != 'right' && hit4 != 'right' && hit5 != 'right' && hit6 != 'right') {
    user.x = user.x - user.speed;
    user.x = constrain(user.x, 50, width - 50);
  } else if (keyIsDown(RIGHT_ARROW) && hit != 'left' && hit2 != 'left' && hit3 != 'left' && hit4 != 'left' && hit5 != 'left' && hit6 != 'left') {
    user.x = user.x + user.speed;
    user.x = constrain(user.x, 50, width - 50);
  }

  //----- GAME END -----
  if (trophyCount && user.x === 50 && user.y === 50){
    state = 'ending';
  }
}

function endScreen(){
  background(bg.er, bg.eg, bg.eb);
  fill(0, 0, 0);
  textSize(75);
  text('You win', width/2, height/2);
}

function collisionDetect(cx, cy, radius, rx, ry, rw, rh){
  //test variables
  let testX = cx;
  let testY = cy;

  if (cx < rx){ //test for left side of rect
    testX = rx;
    rectSide = 'left';
  } else if (cx > rx+rw){ //else it's right side of rect
    testX = rx + rw;
    rectSide = 'right';
  } if (cy < ry){ //test for the top side of the rect
    testY = ry;
    rectSide = 'top';
  } else if (cy > ry+rh){ //else it's the bottom
    testY = ry + rh;
    rectSide = 'bottom';
  }

  let distX = cx-testX;
  let distY = cy-testY;
  let distance = sqrt( (distX*distX) + (distY*distY) );

  if (distance <= radius) {
    return rectSide;
  }
  rectSide = 'none';
  return rectSide;
}
