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

let enemy = {
  x: 0,
  y: 0,
  pathTop: 0,
  pathBottom: 0,
  alpha: 255,
  x2: 0,
  y2: 0,
  pathTop2: 0,
  pathBottom2: 0,
  alpha2: 255,
  size: 100,
  speed: 5,
  color: 255,
};

let coin = {
  x: 0,
  y: 0,
  x2: 0,
  y2: 0,
  alpha: 0,
  alpha2: 0,
  size: 50,
  r: 255,
  g: 255,
  b: 255,
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

let state = 'gameplay';
let rectSide = 'none';
let coinCount = false;
let ending = 0;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont('Helvetica');
  preLoad();

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
  coin.x = width - 100;
  coin.y = height -100;
  coin.x2 = width/2;
  coin.y2 = height/2;
  enemy.x = width/3 -100;
  enemy.y = height/3 -200;
  enemy.pathTop = height/3 -200;
  enemy.pathBottom = height - height/3;
  enemy.x2 = width/3 + width/3 -100;
  enemy.y2 = height/3 -200;
  enemy.pathTop2 = height/3 -200;
  enemy.pathBottom2 = height - height/3;
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

//----- IMAGE PRELOAD -----
function preLoad(){
  imgC = loadImage ('assets/images/gold-coin.gif');
  imgS = loadImage ('assets/images/pixel-spider.gif');
}

function titleScreen(){

}

function gameplay(){
  //----- EXIT SETUP -----
  push();
  fill(140, 90, 75);
  ellipse(50, 50, 100);
  fill(0, 0, 0);
  textSize(25);
  textAlign(CENTER);
  text('EXIT', 50, 60);
  pop();

  //----- USER SETUP -----
  fill(user.color, user.color, user.color, user.alpha);
  ellipse(user.x, user.y, user.size);

  //----- COIN SETUP -----
  tint(coin.r, coin.g, coin.b, coin.alpha);
  image(imgC, coin.x, coin.y, coin.size, coin.size);
  tint(coin.r, coin.g, coin.b, coin.alpha2);
  image(imgC, coin.x2, coin.y2, coin.size, coin.size);

  //----- ENEMY SETUP -----
  tint(enemy.color, enemy.color, enemy.color, enemy.alpha);
  image(imgS, enemy.x, enemy.y, enemy.size, enemy.size);
  tint(enemy.color, enemy.color, enemy.color, enemy.alpha2);
  image(imgS, enemy.x2, enemy.y2, enemy.size, enemy.size);

  //----- ENEMY 1 -----
  enemy.y = enemy.y + enemy.speed;
  if(enemy.y >= enemy.pathBottom ) {
    enemy.speed = -enemy.speed;
  } else if(enemy.y < enemy.pathTop ){
    enemy.speed = -enemy.speed;
  }
  //----- ENEMY 2 -----
  enemy.y2 = enemy.y2 + enemy.speed;
  if(enemy.y2 >= enemy.pathBottom2 ) {
    enemy.speed = -enemy.speed;
  } else if(enemy.y2 < enemy.pathTop2 ){
    enemy.speed = -enemy.speed;
  }

  //----- TROPHY PROXIMITY -----
  let dT = dist(user.x, user.y, coin.x, coin.y);
  if (dT <= 50){
    coin.alpha = 0;
    coinCount = true;
  } else if (dT > 300 && !coinCount) {
    coin.alpha -= 20;
    coin.alpha = constrain(coin.alpha, 0, 255);
  } else if (dT < 300 && !coinCount) {
    coin.alpha += 20;
    coin.alpha = constrain(coin.alpha, 0, 255);
  }
  //----- ENEMY PROXIMITY -----
  let dE = dist(user.x, user.y, enemy.x, enemy.y);
  if (dE <= 75){
    ending = 2;
    state = 'ending';
  } else if (dE > 300) {
    enemy.alpha -= 20;
    enemy.alpha = constrain(enemy.alpha, 0, 255);
  } else if (dE < 300) {
    enemy.alpha += 20;
    enemy.alpha = constrain(enemy.alpha, 0, 255);
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
  if (coinCount && user.x === 50 && user.y === 50){
    ending = 1;
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
