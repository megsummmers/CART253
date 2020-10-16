/**************************************************
Template p5 project by Pippin Barr
Extra code by Meg Summers

Here is a description of this template p5 project.
**************************************************/

//VARIABLES
let bg = {
  r: 0,
  g: 15,
  b: 0,
  gr: 255,
  gg: 200,
  gb: 60,
  rr: 175,
  rg: 25,
  rb: 25
};

let user = {
  x: 0,
  y: 0,
  r: 25,
  speed: 5,
  size: 50,
  color: 255,
  alphaR: 255,
  alphaL: 0
};

let enemy = {
  x: 0, y: 0, pathTop: 0, pathBottom: 0, alpha: 255,
  x2: 0, y2: 0, pathTop2: 0, pathBottom2: 0, alpha2: 255,
  size: 100,
  speed: 5,
  color: 255,
};

let coin = {
  x: 0, y: 0,
  x2: 0, y2: 0,
  x3: 0, y3: 0,
  x4: 0, y4: 0,
  x5: 0, y5: 0,
  alpha: 0, alpha2: 0, alpha3: 0, alpha4: 0, alpha5: 0,
  size: 50,
  r: 255,
  g: 255,
  b: 255,
};

let door = {
  x: 10, y: 5,
  w: 80, h: 100
};

let walls = {
  x1: 0, y1: 0,
  x2: 0, y2: 0,
  x3: 0, y3: 0,
  x4: 0, y4: 0,
  x5: 0, y5: 0,
  x6: 0, y6: 0,
  w: 0, h: 0,
  w5: 0, h5: 0,
  w6: 0, h6: 0,
  r: 25,
  g: 25,
  b: 25,
  alpha: 200
};

let girlCircle = {
  x: 0, y: 0,
  size: 200,
  alpha: 0,
  color: 255
};

let boyCircle = {
  x: 0, y: 0,
  size: 200,
  alpha: 0,
  color: 255
};
//VARIABLES INITIALIZE
let state = 'title';
let rectSide = 'none';
let ending = 0;
let coinCount = 0;
let coin1 = false;
let coin2 = false;
let coin3 = false;
let coin4 = false;
let coin5 = false;
let userAvatar = 'girl';
let mousePress = false;

// setup()
//
// sets width & height dependant varibales, creates canvas, sets font and stroke and pre-loads images
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont('Helvetica');
  preLoad();

  //----- VARIABLE SETUP -----
  walls.w = width/6 + width/6;
  walls.h = height/6;
  walls.w5 = width/6;
  walls.h5 = height/2;
  walls.w6 = width/6;
  walls.h6 = height/6;
  walls.x1 = 0;
  walls.y1 = height/3;
  walls.x2 = width/6;
  walls.y2 = height - height/6;
  walls.x3 = width/2;
  walls.y3 = height/6;
  walls.x4 = width/2 + width/6;
  walls.y4 = 0;
  walls.x5 = width/2 + width/6;
  walls.y5 = height/2;
  walls.x6 = width/6;
  walls.y6 = 0;
  coin.x = width/12;
  coin.y = height - height/12;
  coin.x2 = width/2 + width/12;
  coin.y2 = height/12;
  coin.x3 = width/2 + width/12;
  coin.y3 = height - height/12;
  coin.x4 = width - width/3;
  coin.y4 = height/2 - height/12;
  coin.x5 = width - width/12;
  coin.y5 = height - height/12;
  enemy.x = width/3 + width/12;
  enemy.y = height/12;
  enemy.pathTop = height/12;
  enemy.pathBottom = height - height/12;
  enemy.x2 = width - width/12;
  enemy.y2 = height/6;
  enemy.pathTop2 = height/6;
  enemy.pathBottom2 = height - height/6;
  girlCircle.x = width/3;
  boyCircle.x = width/3 + width/3;
  girlCircle.y = height/2;
  boyCircle.y = height/2;
  door.x = width/12;
  door.y = height/12;
  user.x = width/12;
  user.y = height/12;
}

// draw()
//
// Goes through 4 states and their respective functions
function draw() {
  //background
  background(bg.r, bg.g, bg.b);
  //state
  if (state === 'title'){
    titleScreen();
  } else if (state === 'avatar'){
    avatarScreen();
  } else if (state === 'gameplay'){
    gameplay();
  } else if (state === 'ending'){
    endScreen(ending);
  }
}

//----- IMAGE PRELOAD -----
function preLoad(){
  imgCoin = loadImage ('assets/images/gold-coin.gif');
  imgSpider = loadImage ('assets/images/pixel-spider.gif');
  imgDoor = loadImage ('assets/images/pixel-door.jpg');
  imgGuyLeft = loadImage ('assets/images/pixel-guy-left.png');
  imgGuyRight = loadImage ('assets/images/pixel-guy-right.png');
  imgGirlLeft = loadImage ('assets/images/pixel-girl-left.png');
  imgGirlRight = loadImage ('assets/images/pixel-girl-right.png');
}

//----- TITLE SCREEN -----
function titleScreen(){
  fill(bg.gr, bg.gg, bg.gb);
  rectMode(CENTER);
  rect(width/2, height/2, windowWidth, windowHeight);
  textAlign(CENTER);
  fill(255);
  textSize(100);
  text('DUNGEON QUEST', width/2, height/3);
  textSize(60);
  text("For info on how to play, press 'H'", width/2, height/2);
  text("To begin the game, press 'C'", width/2, height/2 +65);

  if(key === 'h'){
    //----- HOW TO PLAY MENU -----
    fill(bg.gr, bg.gg, bg.gb);
    rectMode(CENTER);
    rect(width/2, height/2, windowWidth, windowHeight);
    textAlign(CENTER);
    fill(255);
    textSize(100);
    text('HOW TO PLAY:', width/2, height/5);
    imageMode(CENTER);
    image(imgCoin, width/5, height/3, 100, 100);
    image(imgSpider, width/2, height/3, 150, 150);
    image(imgGuyLeft, width - width/5 +50, height/3, 100, 100);
    image(imgGirlLeft, width - width/5 -50, height/3, 100, 100);
    textSize(30);
    textAlign(CENTER);
    text("Your goal is to find and collect", width/5, height/2);
    text("as many gold coins as possible", width/5, height/2 +50);
    text("then get back to the door.", width/5, height/2 +100);
    text("Watch out for the cave spiders!", width/2, height/2);
    text("Get too close and you'll lose.", width/2, height/2 +50);
    text("Control your character with the", width - width/5, height/2);
    text("arrow keys and pick up ", width - width/5, height/2 +50);
    text("coins by walking over them", width - width/5, height/2 +100);
    textSize(60);
    text("Press return to go back to the main menu.", width/2, height/2 + 250);
  } else if (key === 'c' && state === 'title'){
    state = 'avatar';
  }
}

//----- AVATAR SELECT SCREEN -----
function avatarScreen(){
  //----- TEXT -----
  fill(bg.gr, bg.gg, bg.gb);
  rectMode(CENTER);
  rect(width/2, height/2, windowWidth, windowHeight);
  textAlign(CENTER);
  fill(255);
  textSize(100);
  text('SELECT A CHARACTER: ', width/2, height/3);
  text("OR", width/2, height/2);
  textSize(30);
  textAlign(CENTER);
  text("Click on the avatar you want, then press P to begin", width/2, height - height/4);
  //----- IMAGES + CIRCLES -----
  push();
  stroke(boyCircle.color, boyCircle.color, boyCircle.color, boyCircle.alpha);
  strokeWeight(10);
  fill(boyCircle.color, boyCircle.color, boyCircle.color, boyCircle.alpha);
  ellipse(boyCircle.x, boyCircle.y, boyCircle.size);
  stroke(girlCircle.color, girlCircle.color, girlCircle.color, girlCircle.alpha);
  strokeWeight(10);
  fill(girlCircle.color, girlCircle.color, girlCircle.color, girlCircle.alpha);
  ellipse(girlCircle.x, girlCircle.y, girlCircle.size);
  pop();
  imageMode(CENTER);
  image(imgGuyLeft, boyCircle.x, boyCircle.y, 50, 50);
  image(imgGirlRight, girlCircle.x, girlCircle.y, 50, 50);
  //----- CIRCLE ALPHA CHANGE -----
  let girlD = dist(mouseX, mouseY, girlCircle.x, girlCircle.y);
  let boyD = dist(mouseX, mouseY, boyCircle.x, boyCircle.y);
  if(girlD <= 100 && !mousePress){
    girlCircle.alpha = 100;
    boyCircle.alpha = 0;
  }
  if (boyD <= 100 && !mousePress){
    boyCircle.alpha = 100;
    girlCircle.alpha = 0;
  }
  if(key === 'p'){
    state = 'gameplay';
  }
}

//----- AVATAR SELECT -----
function mousePressed(){
  let girlD = dist(mouseX, mouseY, girlCircle.x, girlCircle.y);
  let boyD = dist(mouseX, mouseY, boyCircle.x, boyCircle.y);
  //----- SETS AVATAR THAT IS CLICKED -----
  if (girlD <= 100 && state === 'avatar'){
    userAvatar = 'girl';
    girlCircle.alpha = 100;
    boyCircle.alpha = 0;
    mousePress = true;
  } else if (boyD <= 100 && state === 'avatar'){
    userAvatar = 'boy';
    boyCircle.alpha = 100;
    girlCircle.alpha = 0;
    mousePress = true;
  }
}

function gameplay(){
  //----- EXIT DOOR SETUP -----
  image(imgDoor, door.x, door.y, door.w, door.h);

  //----- USER SETUP -----
  if(userAvatar === 'boy'){
    push();
    tint(255, 255, 255, user.alphaL);
    image(imgGuyLeft, user.x, user.y, user.size);
    tint(255, 255, 255, user.alphaR);
    image(imgGuyRight, user.x, user.y, user.size);
    pop();
  } else if (userAvatar === 'girl'){
    push();
    tint(255, 255, 255, user.alphaL);
    image(imgGirlLeft, user.x, user.y, user.size);
    tint(255, 255, 255, user.alphaR);
    image(imgGirlRight, user.x, user.y, user.size);
    pop();
  }

  //----- COIN SETUP -----
  push();
  tint(coin.r, coin.g, coin.b, coin.alpha);
  image(imgCoin, coin.x, coin.y, coin.size, coin.size);
  tint(coin.r, coin.g, coin.b, coin.alpha2);
  image(imgCoin, coin.x2, coin.y2, coin.size, coin.size);
  tint(coin.r, coin.g, coin.b, coin.alpha3);
  image(imgCoin, coin.x3, coin.y3, coin.size, coin.size);
  tint(coin.r, coin.g, coin.b, coin.alpha4);
  image(imgCoin, coin.x4, coin.y4, coin.size, coin.size);
  tint(coin.r, coin.g, coin.b, coin.alpha5);
  image(imgCoin, coin.x5, coin.y5, coin.size, coin.size);

  //----- ENEMY SETUP -----
  imageMode(CENTER);
  tint(enemy.color, enemy.color, enemy.color, enemy.alpha);
  image(imgSpider, enemy.x, enemy.y, enemy.size, enemy.size);
  imageMode(CENTER);
  tint(enemy.color, enemy.color, enemy.color, enemy.alpha2);
  image(imgSpider, enemy.x2, enemy.y2, enemy.size, enemy.size);
  pop();

  //----- ENEMY 1 MOVEMENT -----
  enemy.y = enemy.y + enemy.speed;
  if(enemy.y >= enemy.pathBottom ) {
    enemy.speed = -enemy.speed;
  } else if(enemy.y < enemy.pathTop ){
    enemy.speed = -enemy.speed;
  }
  //----- ENEMY 2 MOVEMENT -----
  enemy.y2 = enemy.y2 + enemy.speed;
  if(enemy.y2 >= enemy.pathBottom2 ) {
    enemy.speed = -enemy.speed;
  } else if(enemy.y2 < enemy.pathTop2 ){
    enemy.speed = -enemy.speed;
  }

  //----- COIN PROXIMITY -----
  if(!coin1){
    coin.alpha = proxFadeCoin(user.x, user.y, coin.x, coin.y, coin.alpha);
    if(coin.alpha === -1){
      coinCount = coinCount + 1;
      coin1 = true;
    }
  }
  if (!coin2){
    coin.alpha2 = proxFadeCoin(user.x, user.y, coin.x2, coin.y2, coin.alpha2);
    if(coin.alpha2 === -1){
      coinCount = coinCount + 1;
      coin2 = true;
    }
  }
  if (!coin3){
    coin.alpha3 = proxFadeCoin(user.x, user.y, coin.x3, coin.y3, coin.alpha3);
    if(coin.alpha3 === -1){
      coinCount = coinCount + 1;
      coin3 = true;
    }
  }
  if (!coin4){
    coin.alpha4 = proxFadeCoin(user.x, user.y, coin.x4, coin.y4, coin.alpha4);
    if(coin.alpha4 === -1){
      coinCount = coinCount + 1;
      coin4 = true;
    }
  }
  if (!coin5){
    coin.alpha5 = proxFadeCoin(user.x, user.y, coin.x5, coin.y5, coin.alpha5);
    if(coin.alpha5 === -1){
      coinCount = coinCount + 1;
      coin5 = true;
    }
  }

//----- ENEMY PROXIMITY FADE -----
  enemy.alpha = proxFadeCoin(user.x, user.y, enemy.x, enemy.y, enemy.alpha);
  if(enemy.alpha === -1){
    ending = 6;
    state = 'ending';
  }
  enemy.alpha2 = proxFadeCoin(user.x, user.y, enemy.x2, enemy.y2, enemy.alpha2);
  if(enemy.alpha2 === -1){
    ending = 6;
    state = 'ending';
  }

  //----- DUNGEON WALLS -----
  rectMode(CORNER);
  fill(walls.r, walls.g, walls.b, walls.alpha);
  rect(walls.x1, walls.y1, walls.w, walls.h);
  rect(walls.x2, walls.y2, walls.w, walls.h);
  rect(walls.x3, walls.y3, walls.w, walls.h);
  rect(walls.x4, walls.y4, walls.w, walls.h);
  rect(walls.x5, walls.y5, walls.w5, walls.h5);
  rect(walls.x6, walls.y6, walls.w6, walls.h6);

  //----- WALL COLLISION SETUP -----
  let hit = collisionDetect(user.x, user.y, user.r, walls.x1, walls.y1, walls.w, walls.h);
  let hit2 = collisionDetect(user.x, user.y, user.r, walls.x2, walls.y2, walls.w, walls.h);
  let hit3 = collisionDetect(user.x, user.y, user.r, walls.x3, walls.y3, walls.w, walls.h);
  let hit4 = collisionDetect(user.x, user.y, user.r, walls.x4, walls.y4, walls.w, walls.h);
  let hit5 = collisionDetect(user.x, user.y, user.r, walls.x5, walls.y5, walls.w5, walls.h5);
  let hit6  = collisionDetect(user.x, user.y, user.r, walls.x6, walls.y6, walls.w6, walls.h6);

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
    //----- CHARACTER FLIP -----
    user.alphaL = 255;
    user.alphaR = 0;
  } else if (keyIsDown(RIGHT_ARROW) && hit != 'left' && hit2 != 'left' && hit3 != 'left' && hit4 != 'left' && hit5 != 'left' && hit6 != 'left') {
    user.x = user.x + user.speed;
    user.x = constrain(user.x, 50, width - 50);
    //----- CHARACTER FLIP -----
    user.alphaR = 255;
    user.alphaL = 0;
  }

  //----- GAME END -----
  if (coinCount === 1 && user.x <= width/12 && user.y <= height/12){
    ending = 1;
    state = 'ending';
  } else if (coinCount === 2 && user.x <= width/12 && user.y <= height/12){
    ending = 2;
    state = 'ending';
  } else if (coinCount === 3 && user.x <= width/12 && user.y <= height/12){
    ending = 3;
    state = 'ending';
  } else if (coinCount === 4 && user.x <= width/12 && user.y <= height/12){
    ending = 4;
    state = 'ending';
  } else if (coinCount === 5 && user.x <= width/12 && user.y <= height/12){
    ending = 5;
    state = 'ending';
  }
}


//----- END SCREEN -----
function endScreen(endingNum){
  if(endingNum === 1){
    //1 COIN COLLECTED
    fill(bg.gr, bg.gg, bg.gb);
    rectMode(CENTER);
    rect(width/2, height/2, width, height);
    fill(0, 0, 0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got 1/5 coins', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2, height/3 + height/3);
  } else if ( endingNum === 2){
    //2 COINS COLLECTED
    fill(bg.gr, bg.gg, bg.gb);
    rectMode(CENTER);
    rect(width/2, height/2, width, height);
    fill(0, 0, 0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got 2/5 coins', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2 - 60, height/3 + height/3);
    image(imgCoin, width/2 + 60, height/3 + height/3);
  } else if ( endingNum === 3){
    //3 COINS COLLECTED
    fill(bg.gr, bg.gg, bg.gb);
    rectMode(CENTER);
    rect(width/2, height/2, width, height);
    fill(0, 0, 0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got 3/5 coins', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2, height/3 + height/3);
    image(imgCoin, width/2 - 120, height/3 + height/3);
    image(imgCoin, width/2 + 120, height/3 + height/3);
  } else if ( endingNum === 4){
    //4 COINS COLLECTED
    fill(bg.gr, bg.gg, bg.gb);
    rectMode(CENTER);
    rect(width/2, height/2, width, height);
    fill(0, 0, 0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got 4/5 coins', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2 - 180, height/3 + height/3);
    image(imgCoin, width/2 - 60, height/3 + height/3);
    image(imgCoin, width/2 + 60, height/3 + height/3);
    image(imgCoin, width/2 + 180, height/3 + height/3);
  } else if ( endingNum === 5){
    //ALL 5 COINS COLLECTED
    fill(bg.gr, bg.gg, bg.gb);
    rectMode(CENTER);
    rect(width/2, height/2, width, height);
    fill(0, 0, 0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got all the coins', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2 + 240, height/3 + height/3);
    image(imgCoin, width/2 + 120, height/3 + height/3);
    image(imgCoin, width/2, height/3 + height/3);
    image(imgCoin, width/2 - 120, height/3 + height/3);
    image(imgCoin, width/2 - 240, height/3 + height/3);
    image(imgCoin, width/2 - 120, height/3 + height/3);
    image(imgCoin, width/2 + 120, height/3 + height/3);
  } else if ( endingNum === 6){
    //SPIDER DEATH
    fill(bg.rr, bg.rg, bg.rb);
    rectMode(CENTER);
    rect(width/2, height/2, width, height);
    fill(0, 0, 0);
    textSize(75);
    textAlign(CENTER);
    text('You lose!', width/2, height/3);
    text('Curse those nasty cave spiders', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgSpider, width/2, height/3 + height/3);
    image(imgSpider, width/2 - 200, height/3 + height/3);
    image(imgSpider, width/2 + 200, height/3 + height/3);
  }
}


//----- WALL COLLISION DETECTION -----
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
//----- COIN FADE FUNCTION -----
function proxFadeCoin (userX, userY, coinX, coinY, alpha){
  let d = dist(userX, userY, coinX, coinY);
  if (d <= 50){
    alpha = -1;
  } else if (d > 300) {
    alpha -= 20;
    alpha = constrain(alpha, 0, 255);
  } else if (d < 300) {
    alpha += 20;
    alpha = constrain(alpha, 0, 255);
  }
  return alpha;
}
//----- ENEMY FADE FUNCTION -----
function proxFadeEnemy (userX, userY, enemyX, enemyY, alpha){
  let d = dist(userX, userY, enemyX, enemyY);
  if (d <= 50){
    heartCounter = heartCounter - 1;
    alpha = -1;
  } else if (d > 300) {
    alpha -= 20;
    alpha = constrain(alpha, 0, 255);
  } else if (d < 300) {
    alpha += 20;
    alpha = constrain(alpha, 0, 255);
  }
  return alpha;
}
