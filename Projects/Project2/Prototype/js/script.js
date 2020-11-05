/**************************************************
Template p5 project by Pippin Barr
Extra code by Meg Summers

Dungeon Quest:
A dungeon adventure game where you go to explore a Dungeon
full of cave spiders. Grab as many gold coins as you can
and get out with your loot. If you find a bow and arrow
you can kill the spiders by shooting them.

Try to add:
-Boss level, giant spider with more health and/or timer
-Storyline/animation for opening
-Add more dungeon levels
-Go down to the lowest level then have to come back up

Prototype Checklist:
-Transfer to Prototype
-adjust map and spider distance to make it more difficult
**************************************************/
"use strict";

let maze = {
  walls: [],
  numWalls: 9,
  coins: [],
  numCoins: 5,
  spiders: [],
  numSpiders: 3
};

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

// let door = {
//   x: 10, y: 5,
//   w: 80, h: 100
// };
//
// let girlCircle = {
//   x: 0, y: 0,
//   size: 200,
//   alpha: 0,
//   color: 255
// };
//
// let boyCircle = {
//   x: 0, y: 0,
//   size: 200,
//   alpha: 0,
//   color: 255
// };

//variables
let state = "gameplay";
let ending = 0;
let coinCount = 0;
let user;
let walls;
//image VARIABLES
let imgCoin;
let imgSpider;
let imgDoor;
let imageGuyL;
let imageGuyR;
let imageGirlL;
let imageGirlR;

//----- IMAGE PRELOAD -----
function preload(){
  // imgCoin = loadImage ('assets/images/gold-coin.gif');
  // imgSpider = loadImage ('assets/images/pixel-spider.gif');
  // imgDoor = loadImage ('assets/images/pixel-door.jpg');
  imageGuyL = loadImage ('assets/images/pixel-guy-left.png');
  imageGuyR = loadImage ('assets/images/pixel-guy-right.png');
  imageGirlL = loadImage ('assets/images/pixel-girl-left.png');
  imageGirlR = loadImage ('assets/images/pixel-girl-right.png');
}

function setup(){
  createCanvas(1000, 1000);
  noStroke();

  let userSettings = {
    x: 20,
    y: 20,
    w: 50,
    h: 65,
    imageGuyL: imageGuyL,
    imageGuyR: imageGuyR,
    imageGirlL: imageGirlL,
    imageGirlR: imageGirlR
  };
  user = new User(userSettings);

  //Wall Initialization
  let wall1 = new Wall(100, 0, 200, 200);
  maze.walls.push(wall1);
  let wall2 = new Wall(0, 300, 300, 200);
  maze.walls.push(wall2);
  let wall3 = new Wall(100, 600, 100, 300);
  maze.walls.push(wall3);
  let wall4 = new Wall(400, 100, 300, 300);
  maze.walls.push(wall4);
  let wall5 = new Wall(300, 600, 200, 400);
  maze.walls.push(wall5);
  let wall6 = new Wall(600, 500, 200, 200);
  maze.walls.push(wall6);
  let wall7 = new Wall(600, 800, 100, 200);
  maze.walls.push(wall7);
  let wall8 = new Wall(800, 100, 200, 200);
  maze.walls.push(wall8);
  let wall9 = new Wall(800, 400, 200, 500);
  maze.walls.push(wall9);

  //Coin Initialization
  let coin1 = new Coin(50, 850);
  maze.coins.push(coin1);
  let coin2 = new Coin(550, 950);
  maze.coins.push(coin2);
  let coin3 = new Coin(950, 50);
  maze.coins.push(coin3);
  let coin4 = new Coin(950, 350);
  maze.coins.push(coin4);
  let coin5 = new Coin(950, 950);
  maze.coins.push(coin5);

  //Spider Initialization
  let spider1 = new Spider(350, 50, 50, 550);
  maze.spiders.push(spider1);
  let spider2 = new Spider(550, 450, 950, 450);
  maze.spiders.push(spider2);
  let spider3 = new Spider(750, 50, 50, 450);
  maze.spiders.push(spider3);

  //----- VARIABLE SETUP -----
  // coin.x = width/12;
  // coin.y = height - height/12;
  // coin.x2 = width/2 + width/12;
  // coin.y2 = height/12;
  // coin.x3 = width/2 + width/12;
  // coin.y3 = height - height/12;
  // coin.x4 = width - width/3;
  // coin.y4 = height/2 - height/12;
  // coin.x5 = width - width/12;
  // coin.y5 = height - height/12;
  // enemy.x = width/3 + width/12;
  // enemy.y = height/12;
  // enemy.pathTop = height/12;
  // enemy.pathBottom = height - height/12;
  // enemy.x2 = width - width/12;
  // enemy.y2 = height/6;
  // enemy.pathTop2 = height/6;
  // enemy.pathBottom2 = height - height/6;
  // girlCircle.x = width/3;
  // boyCircle.x = width/3 + width/3;
  // girlCircle.y = height/2;
  // boyCircle.y = height/2;
  // door.x = width/12;
  // door.y = height/12;
}

function draw(){
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

//----- TITLE SCREEN -----
// function titleScreen(){
//   fill(bg.gr, bg.gg, bg.gb);
//   rectMode(CENTER);
//   rect(width/2, height/2, windowWidth, windowHeight);
//   textAlign(CENTER);
//   fill(255);
//   textSize(100);
//   text('DUNGEON QUEST', width/2, height/3);
//   textSize(60);
//   text("For info on how to play, press 'H'", width/2, height/2);
//   text("To begin the game, press 'C'", width/2, height/2 +65);
//
//   if(key === 'h'){
//     //----- HOW TO PLAY MENU -----
//     fill(bg.gr, bg.gg, bg.gb);
//     rectMode(CENTER);
//     rect(width/2, height/2, windowWidth, windowHeight);
//     textAlign(CENTER);
//     fill(255);
//     textSize(100);
//     text('HOW TO PLAY:', width/2, height/5);
//     imageMode(CENTER);
//     image(imgCoin, width/5, height/3, 100, 100);
//     image(imgSpider, width/2, height/3, 150, 150);
//     image(imgGuyLeft, width - width/5 +50, height/3, 100, 100);
//     image(imgGirlLeft, width - width/5 -50, height/3, 100, 100);
//     textSize(30);
//     textAlign(CENTER);
//     text("Your goal is to find and collect", width/5, height/2);
//     text("as many gold coins as possible", width/5, height/2 +50);
//     text("then get back to the door.", width/5, height/2 +100);
//     text("Watch out for the cave spiders!", width/2, height/2);
//     text("Get too close and you'll lose.", width/2, height/2 +50);
//     text("Control your character with the", width - width/5, height/2);
//     text("arrow keys and pick up ", width - width/5, height/2 +50);
//     text("coins by walking over them", width - width/5, height/2 +100);
//     textSize(60);
//     text("Press return to go back to the main menu.", width/2, height/2 + 250);
//   } else if (key === 'c' && state === 'title'){
//     state = 'avatar';
//   }
// }
//
// //----- AVATAR SELECT SCREEN -----
// function avatarScreen(){
//   //----- TEXT -----
//   fill(bg.gr, bg.gg, bg.gb);
//   rectMode(CENTER);
//   rect(width/2, height/2, windowWidth, windowHeight);
//   textAlign(CENTER);
//   fill(255);
//   textSize(100);
//   text('SELECT A CHARACTER: ', width/2, height/3);
//   text("OR", width/2, height/2);
//   textSize(30);
//   textAlign(CENTER);
//   text("Click on the avatar you want, then press P to begin", width/2, height - height/4);
//   //----- IMAGES + CIRCLES -----
//   push();
//   stroke(boyCircle.color, boyCircle.color, boyCircle.color, boyCircle.alpha);
//   strokeWeight(10);
//   fill(boyCircle.color, boyCircle.color, boyCircle.color, boyCircle.alpha);
//   ellipse(boyCircle.x, boyCircle.y, boyCircle.size);
//   stroke(girlCircle.color, girlCircle.color, girlCircle.color, girlCircle.alpha);
//   strokeWeight(10);
//   fill(girlCircle.color, girlCircle.color, girlCircle.color, girlCircle.alpha);
//   ellipse(girlCircle.x, girlCircle.y, girlCircle.size);
//   pop();
//   imageMode(CENTER);
//   image(imgGuyLeft, boyCircle.x, boyCircle.y, 50, 50);
//   image(imgGirlRight, girlCircle.x, girlCircle.y, 50, 50);
//   //----- CIRCLE ALPHA CHANGE -----
//   let girlD = dist(mouseX, mouseY, girlCircle.x, girlCircle.y);
//   let boyD = dist(mouseX, mouseY, boyCircle.x, boyCircle.y);
//   if(girlD <= 100 && !mousePress){
//     girlCircle.alpha = 100;
//     boyCircle.alpha = 0;
//   }
//   if (boyD <= 100 && !mousePress){
//     boyCircle.alpha = 100;
//     girlCircle.alpha = 0;
//   }
//   if(key === 'p'){
//     state = 'gameplay';
//   }
// }
//
// //----- AVATAR SELECT -----
// function mousePressed(){
//   let girlD = dist(mouseX, mouseY, girlCircle.x, girlCircle.y);
//   let boyD = dist(mouseX, mouseY, boyCircle.x, boyCircle.y);
//   //----- SETS AVATAR THAT IS CLICKED -----
//   if (girlD <= 100 && state === 'avatar'){
//     userAvatar = 'girl';
//     girlCircle.alpha = 100;
//     boyCircle.alpha = 0;
//     mousePress = true;
//   } else if (boyD <= 100 && state === 'avatar'){
//     userAvatar = 'boy';
//     boyCircle.alpha = 100;
//     girlCircle.alpha = 0;
//     mousePress = true;
//   }
// }

function gameplay(){
  //----- EXIT DOOR SETUP -----
  //image(imgDoor, door.x, door.y, door.w, door.h);

  //----- WALL COLLISION SETUP -----
  user.hitLeft = false;
  user.hitRight = false;
  user.hitTop = false;
  user.hitBottom = false;
  for(let i = 0; i < maze.walls.length; i++){
    let wall = maze.walls[i];
    user.collisionDetect(wall);
    wall.display();
  }

  //----- USER SETUP ----
  user.display();
  user.move();

  //----- GAME END -----
//   if (coinCount === 1 && user.x <= width/9 && user.y <= height/9){
//     ending = 1;
//     state = 'ending';
//   } else if (coinCount === 2 && user.x <= width/9 && user.y <= height/9){
//     ending = 2;
//     state = 'ending';
//   } else if (coinCount === 3 && user.x <= width/9 && user.y <= height/9){
//     ending = 3;
//     state = 'ending';
//   } else if (coinCount === 4 && user.x <= width/9 && user.y <= height/9){
//     ending = 4;
//     state = 'ending';
//   } else if (coinCount === 5 && user.x <= width/9 && user.y <= height/9){
//     ending = 5;
//     state = 'ending';
//   }
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
