/**************************************************
Template p5 project by Pippin Barr
Extra code by Meg Summers

Dungeon Quest:
A dungeon adventure game where you go to explore a Dungeon
full of cave spiders. Grab as many gold coins as you can
and get out with your loot. If you find a bow and arrow
you can kill the spiders by shooting them.

Things to add later on:
-Boss level, giant spider with more health and/or timer
-Storyline/animation for opening and/or ending
-Add more dungeon levels (2-3 more?)
-Go down to the lowest level then have to come back up
**************************************************/
"use strict";

let maze1 = {
  walls: [],
  numWalls: 9,
  coins: [],
  numCoins: 5,
  spiders: [],
  numSpiders: 3,
  doors: [],
  weapon: []
};

let maze2 = {
  walls: [],
  numWalls: 22,
  coins: [],
  numCoins: 5,
  spiders: [],
  numSpiders: 3,
  doors: [],
  weapon: []
};

let maze3 = {
  walls: [],
  numWalls: 25,
  coins: [],
  numCoins: 5,
  spiders: [],
  numSpiders: 3,
  doors:[],
  weapon: []
};

let bg = {
  r: 0,
  g: 15,
  b: 0,
  rr: 175,
  rg: 25,
  rb: 25
};

let girlCircle = {
  x: 700, y: 500,
  size: 300,
  alpha: 0,
  color: 255
};

let boyCircle = {
  x: 300, y: 500,
  size: 300,
  alpha: 0,
  color: 255
};

let spiderSettings = {
  fastSpeed: 5, medSpeed: 4, slowSpeed: 3,
  movementH: "horizontal", movementV: "vertical",
  killCount: 0
};

//variables
let state = "title";
let ending = 0;
let coinCount = 0;
let user;
let walls;
let particle;
let weapon1;
let weapon2;
let weapon3;
let startdoor1;
let startdoor2;
let startdoor3;
let goaldoor1;
let goaldoor2;
let goaldoor3;
let arrowHit = true;
let page = 1; //For title screen
let mousePress;
let winSoundPlay = false;
let loseSoundPlay = false;
let bowPlay = false;
let level = 1;
//timer variables
let frameCounter = 0;
let gameplayTimer = 0;
//image Variables
let imgCoin;
let imgSpider;
let imgDoor;
let imageGuyL;
let imageGuyR;
let imageGirlL;
let imageGirlR;
let imgWeapon;
let imgArrowL;
let imgArrowR;
let imgbgDay;
//sound variables
let winSound;
let loseSound;
let bowPickup;
let coinPickup;

//----- IMAGE PRELOAD -----
function preload(){
  imgCoin = loadImage ('assets/images/gold-coin.gif');
  imgSpider = loadImage ('assets/images/pixel-spider.gif');
  imgDoor = loadImage ('assets/images/pixel-door.jpeg');
  imageGuyL = loadImage ('assets/images/pixel-guy-left.png');
  imageGuyR = loadImage ('assets/images/pixel-guy-right.png');
  imageGirlL = loadImage ('assets/images/pixel-girl-left.png');
  imageGirlR = loadImage ('assets/images/pixel-girl-right.png');
  imgWeapon = loadImage ('assets/images/bow&arrow.png');
  imgArrowL = loadImage ('assets/images/arrowL.png');
  imgArrowR = loadImage ('assets/images/arrowR.png');
  imgbgDay = loadImage ('assets/images/pixel-bg.jpg');
  //SOUNDS
  winSound = loadSound('assets/sounds/winSound.mp3');
  loseSound = loadSound('assets/sounds/loseSound.mp3');
  bowPickup = loadSound('assets/sounds/bowgrab.mp3');
  coinPickup = loadSound('assets/sounds/coingrab.mp3');
}

function setup(){
  createCanvas(1000, 1000);
  noStroke();

  let userSettings = {
    x: 30,
    y: 30,
    w: 50, h: 60,
    imageGuyL: imageGuyL,
    imageGuyR: imageGuyR,
    imageGirlL: imageGirlL,
    imageGirlR: imageGirlR
  };
  user = new User(userSettings);

  //level 1 bow weapon1
  maze1.weapon.push(new Bow(650, 50, 50, imgWeapon, imgArrowL, imgArrowR));
  weapon1 = maze1.weapon[0];
  //level 2 bow
  maze2.weapon.push(new Bow(925, 275, 35, imgWeapon, imgArrowL, imgArrowR));
  weapon2 = maze2.weapon[0];
  //level 3 bow
  maze3.weapon.push(new Bow(725, 975, 35, imgWeapon, imgArrowL, imgArrowR));
  weapon3 = maze3.weapon[0];

  //raycasting
  particle = new Particle();

  //Wall Initialization level 1
  maze1.walls.push(new Wall(100, 0, 200, 200));
  maze1.walls.push(new Wall(0, 300, 300, 200));
  maze1.walls.push(new Wall(100, 600, 100, 300));
  maze1.walls.push(new Wall(400, 100, 300, 300));
  maze1.walls.push(new Wall(300, 600, 200, 400));
  maze1.walls.push(new Wall(600, 500, 200, 200));
  maze1.walls.push(new Wall(600, 800, 100, 200));
  maze1.walls.push(new Wall(800, 100, 200, 200));
  maze1.walls.push(new Wall(800, 400, 200, 500));
  //outer boundaries for raycasting
  maze1.walls.push(new Wall(0, 0, width, 0));
  maze1.walls.push(new Wall(width, 0, width, height));
  maze1.walls.push(new Wall(0, height, width, height));
  maze1.walls.push(new Wall(0, 0, 0, height));

  //Wall Initialization level 2
  maze2.walls.push(new Wall(0, 150, 50, 350));
  maze2.walls.push(new Wall(100, 350, 150, 350));
  maze2.walls.push(new Wall(50, 550, 150, 200));
  maze2.walls.push(new Wall(150, 700, 100, 100));
  maze2.walls.push(new Wall(50, 800, 150, 150));
  maze2.walls.push(new Wall(100, 0, 700, 50));
  maze2.walls.push(new Wall(100, 100, 400, 200));
  maze2.walls.push(new Wall(300, 350, 200, 450));
  maze2.walls.push(new Wall(250, 850, 100, 150));
  maze2.walls.push(new Wall(350, 850, 50, 50));
  maze2.walls.push(new Wall(400, 850, 300, 100));
  maze2.walls.push(new Wall(550, 50, 150, 200));
  maze2.walls.push(new Wall(550, 300, 200, 150));
  maze2.walls.push(new Wall(500, 700, 50, 100));
  maze2.walls.push(new Wall(550, 500, 150, 300));
  maze2.walls.push(new Wall(750, 100, 150, 150));
  maze2.walls.push(new Wall(850, 50, 100, 200));
  maze2.walls.push(new Wall(800, 250, 100, 300));
  maze2.walls.push(new Wall(900, 300, 100, 350));
  maze2.walls.push(new Wall(750, 600, 100, 300));
  maze2.walls.push(new Wall(850, 700, 100, 200));
  maze2.walls.push(new Wall(750, 950, 150, 50));
  maze2.walls.push(new Wall(850, 900, 50, 100));
  //outer boundaries for raycasting
  maze2.walls.push(new Wall(0, 0, width, 0));
  maze2.walls.push(new Wall(width, 0, width, height));
  maze2.walls.push(new Wall(0, height, width, height));
  maze2.walls.push(new Wall(0, 0, 0, height));

  //Wall Initialization level 3
  maze3.walls.push(new Wall(0, 100, 300, 50));
  maze3.walls.push(new Wall(50, 200, 150, 250));
  maze3.walls.push(new Wall(0, 300, 50, 250));
  maze3.walls.push(new Wall(100, 400, 100, 200));
  maze3.walls.push(new Wall(50, 600, 200, 250));
  maze3.walls.push(new Wall(0, 900, 350, 100));
  maze3.walls.push(new Wall(350, 0, 150, 350));
  maze3.walls.push(new Wall(250, 400, 350, 150));
  maze3.walls.push(new Wall(300, 600, 50, 100));
  maze3.walls.push(new Wall(300, 700, 450, 150));
  maze3.walls.push(new Wall(400, 600, 100, 400));
  maze3.walls.push(new Wall(550, 0, 100, 150));
  maze3.walls.push(new Wall(500, 200, 350, 50));
  maze3.walls.push(new Wall(550, 200, 50, 150));
  maze3.walls.push(new Wall(550, 600, 200, 50));
  maze3.walls.push(new Wall(600, 900, 100, 100));
  maze3.walls.push(new Wall(700, 0, 150, 50));
  maze3.walls.push(new Wall(650, 100, 150, 50));
  maze3.walls.push(new Wall(800, 100, 100, 200));
  maze3.walls.push(new Wall(650, 300, 300, 250));
  maze3.walls.push(new Wall(800, 500, 100, 200));
  maze3.walls.push(new Wall(750, 750, 100, 200));
  maze3.walls.push(new Wall(900, 600, 50, 350));
  maze3.walls.push(new Wall(900, 50, 50, 100));
  maze3.walls.push(new Wall(950, 200, 50, 200));
  //outer boundaries for raycasting
  maze3.walls.push(new Wall(0, 0, width, 0));
  maze3.walls.push(new Wall(width, 0, width, height));
  maze3.walls.push(new Wall(0, height, width, height));
  maze3.walls.push(new Wall(0, 0, 0, height));

  //Level 1 Coin Initialization
  maze1.coins.push(new Coin(25, 825, 50, imgCoin, coinPickup));
  maze1.coins.push(new Coin(525, 925, 50, imgCoin, coinPickup));
  maze1.coins.push(new Coin(925, 25, 50, imgCoin, coinPickup));
  maze1.coins.push(new Coin(925, 325, 50, imgCoin, coinPickup));
  maze1.coins.push(new Coin(925, 925, 50, imgCoin, coinPickup));

  //Level 2 Coin Initialization
  maze2.coins.push(new Coin(60, 760, 35, imgCoin, coinPickup));
  maze2.coins.push(new Coin(360, 910, 35, imgCoin, coinPickup));
  maze2.coins.push(new Coin(510, 660, 35, imgCoin, coinPickup));
  maze2.coins.push(new Coin(860, 10, 35, imgCoin, coinPickup));
  maze2.coins.push(new Coin(810, 910, 35, imgCoin, coinPickup));

  //Level 3 Coin Initialization
  maze3.coins.push(new Coin(10, 785, 35, imgCoin, coinPickup));
  maze3.coins.push(new Coin(360, 950, 35, imgCoin, coinPickup));
  maze3.coins.push(new Coin(660, 10, 35, imgCoin, coinPickup));
  maze3.coins.push(new Coin(910, 260, 35, imgCoin, coinPickup));
  maze3.coins.push(new Coin(910, 560, 35, imgCoin, coinPickup));

  //Level 1 Spider Initialization
  maze1.spiders.push(new Spider(325, 25, 75, 25, 525, spiderSettings.movementV, spiderSettings.fastSpeed, imgSpider));
  maze1.spiders.push(new Spider(525, 425, 75, 425, 925, spiderSettings.movementV, spiderSettings.slowSpeed, imgSpider));
  maze1.spiders.push(new Spider(725, 25, 75, 25, 425, spiderSettings.movementV, spiderSettings.fastSpeed, imgSpider));

  //Level 2 Spider Initialization
  maze2.spiders.push(new Spider(500, 100, 50, 100, 550, spiderSettings.movementV, spiderSettings.fastSpeed, imgSpider));
  maze2.spiders.push(new Spider(50, 300, 50, 50, 500, spiderSettings.movementH, spiderSettings.fastSpeed, imgSpider));
  maze2.spiders.push(new Spider(700, 450, 50, 450, 950, spiderSettings.movementV, spiderSettings.medSpeed, imgSpider));

  //Level 3 Spider Initialization
  maze3.spiders.push(new Spider(0, 850, 50, 0, 350, spiderSettings.movementH, spiderSettings.fastSpeed, imgSpider));
  maze3.spiders.push(new Spider(200, 550, 50, 200, 750, spiderSettings.movementH, spiderSettings.medSpeed, imgSpider));
  maze3.spiders.push(new Spider(500, 250, 50, 250, 350, spiderSettings.movementV, spiderSettings.medSpeed, imgSpider));

  //level 1 door
  maze1.doors.push(new Door(25, 25, 51, 80, imgDoor));
  maze1.doors.push(new Door(25, 900, 51, 80, imgDoor));

  //level 2 door
  maze2.doors.push(new Door(25, 25, 38, 60, imgDoor));
  maze2.doors.push(new Door(925, 925, 38, 60, imgDoor));

  //level 3 door
  maze3.doors.push(new Door(25, 25, 38, 60, imgDoor));
  maze3.doors.push(new Door(550, 950, 38, 60, imgDoor));

  //universal Variables
  startdoor1 = maze1.doors[0];
  goaldoor1 = maze1.doors[1];
  startdoor2 = maze2.doors[0];
  goaldoor2 = maze2.doors[1];
  startdoor3 = maze3.doors[0];
  goaldoor3 = maze3.doors[1];
}

function draw(){
  //background
  background(bg.r, bg.g, bg.b);
  //state
  if (state === 'title'){
    titleScreen();
  } else if (state === 'howToPlay'){
    howToPlay();
  } else if (state === 'avatar'){
    avatarScreen();
  } else if (state === 'gameplay'){
    if (level === 1){
      level1();
    } else if (level === 2){
      level2();
    } else if (level === 3){
      level3();
    }
  } else if (state === 'store'){
    store();
  } else if (state === 'ending'){
    endScreen(ending);
  }
}
//----- TITLE SCREEN -----
function titleScreen(){
  push();
  image(imgbgDay, 0, 0, width, height);
  textAlign(CENTER);
  fill(0);
  textSize(100);
  text('DUNGEON QUEST', 500, 300);
  textSize(50);
  text("PRESS 'H' FOR INSTRUCTIONS", 500, 525);
  text("PRESS 'P' TO BEGIN", 500, 600);
  pop();

  if(key === 'h'){
    state = 'howToPlay';
  } else if(key === 'p'){
    state = 'avatar';
  }
}

function howToPlay(){
  push();
  image(imgbgDay, 0, 0, width, height);
  textAlign(CENTER);
  fill(0);
  textSize(100);
  text('HOW TO PLAY:', 500, 200);
  pop();

  if(page === 1){
    push();
    imageMode(CENTER);
    image(imageGuyR, 300, 350, 100, 100);
    image(imageGirlL, 700, 350, 100, 100);
    textSize(40);
    textAlign(CENTER);
    text("You control your character with the arrow keys,", 500, 500);
    text("Walk over coins to pick them up.", 500, 575);
    textSize(30);
    text("Use the arrow keys to browse the instruction pages", 500, 900);
    text("Hit return to go back to the title screen", 500, 950);
    pop();
  } else if (page === 2){
    push();
    imageMode(CENTER);
    image(imgCoin, 300, 350, 100, 100);
    image(imgDoor, 700, 350, 100, 150);
    textSize(40);
    textAlign(CENTER);
    text("Your goal is to find and collect as many gold coins", 500, 500);
    text("as possible then get back to the door.", 500, 575);
    textSize(30);
    text("Use the arrow keys to browse the instruction pages", 500, 900);
    text("Hit return to go back to the title screen", 500, 950);
    pop();
  } else if (page === 3){
    push();
    imageMode(CENTER);
    image(imgSpider, 500, 350, 200, 200);
    textSize(40);
    textAlign(CENTER);
    text("Watch out for the cave spiders!", 500, 500);
    text("If they get too close you lose.", 500, 575);
    textSize(30);
    text("Hint: You'll need to kill one to get all the coins!", 500, 800);
    textSize(30);
    text("Use the arrow keys to browse the instruction pages", 500, 900);
    text("Hit return to go back to the title screen", 500, 950);
    pop();
  } else if (page === 4){
    push();
    imageMode(CENTER);
    image(imgArrowL, 350, 325, 150, 150);
    image(imgWeapon, 650, 325, 150, 150);
    textSize(40);
    textAlign(CENTER);
    text("Find the bow in the dungeon and walk over to claim it,", 500, 450);
    text("Once you pick it up, hit 'A' to aim", 500, 500);
    text("Then use the arrow keys to shoot left or right", 500, 550);
    textSize(30);
    text("You can only shoot horizontally and you have 3 shots so be careful", 500, 625);
    textSize(30);
    text("Use the arrow keys to browse the instruction pages", 500, 900);
    text("Hit return to go back to the title screen", 500, 950);
    pop();
  }
}

function keyPressed(){
  if (keyCode === RIGHT_ARROW && state === 'howToPlay'){
    page = page + 1;
    page = constrain(page, 1, 4);
  } else if (keyCode === LEFT_ARROW && state === 'howToPlay'){
    page = page - 1;
    page = constrain(page, 1, 4);
  } else if (keyCode === RETURN && state === 'howToPlay'){
    state = 'title';
  }

  if (keyCode === RETURN && state === 'avatar'){
    state = 'gameplay';
  }
}


//----- AVATAR SELECT SCREEN -----
function avatarScreen(){
  //----- TEXT -----
  push();
  imageMode(CENTER);
  image(imgbgDay, 500, 500, width, height);
  textAlign(CENTER);
  fill(255);
  textSize(75);
  text('SELECT A CHARACTER: ', 500, 200);
  text("OR", 500, 300);
  textSize(40);
  textAlign(CENTER);
  text("Click on the avatar you want, then hit enter to begin", 500, 800);
  pop();
  //----- AVATAR IMAGES + CIRCLES -----
  push();
  stroke(boyCircle.color, boyCircle.color, boyCircle.color, boyCircle.alpha);
  strokeWeight(10);
  fill(boyCircle.color, boyCircle.color, boyCircle.color, boyCircle.alpha);
  ellipse(boyCircle.x, boyCircle.y, boyCircle.size);
  stroke(girlCircle.color, girlCircle.color, girlCircle.color, girlCircle.alpha);
  strokeWeight(10);
  fill(girlCircle.color, girlCircle.color, girlCircle.color, girlCircle.alpha);
  ellipse(girlCircle.x, girlCircle.y, girlCircle.size);
  imageMode(CENTER);
  image(imageGuyL, boyCircle.x, boyCircle.y, 75, 75);
  image(imageGirlR, girlCircle.x, girlCircle.y, 75, 75);
  pop();
  //----- CIRCLE ALPHA CHANGE -----
  //changes the white circle around the avatar you hover over
  //until you click on of the two (click function in mousePressed)
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
}

//----- AVATAR SELECT -----
function mousePressed(){
  //checks mouse distance from each avatar
  let girlD = dist(mouseX, mouseY, girlCircle.x, girlCircle.y);
  let boyD = dist(mouseX, mouseY, boyCircle.x, boyCircle.y);
  //----- SETS AVATAR THAT IS CLICKED -----
  //sets variable in user class and locks white circle
  if (girlD <= 100 && state === 'avatar'){
    user.avatar = 'girl';
    user.avatar = 'girl';
    girlCircle.alpha = 100;
    boyCircle.alpha = 0;
    mousePress = true;
  } else if (boyD <= 100 && state === 'avatar'){
    user.avatar = 'guy';
    user.avatar = 'guy';
    boyCircle.alpha = 100;
    girlCircle.alpha = 0;
    mousePress = true;
  }
}

//Gameplay function for level one of the dungeon
function level1(){
  //----- GAME TIMER -----
  frameCounter++;

  //----- STARTING & EXIT DOOR SETUP -----
  push();
  image(imgDoor, startdoor1.x, startdoor1.y, startdoor1.w, startdoor1.h);
  image(imgDoor, goaldoor1.x, goaldoor1.y, goaldoor1.w, goaldoor1.h);
  pop();

  //----- RAYCASTING -----
  particle.update(user.x, user.y);
  particle.raycast([...maze1.walls, ...maze1.coins, ...maze1.weapon, ...maze1.doors]);
  //particle.raycast(maze1.weapon);

  //----- WALL COLLISION SETUP -----
  for(let i = 0; i < maze1.walls.length; i++){
    let wall = maze1.walls[i];
    user.collisionDetect(wall);
    wall.display();
  }
  //----- COINS SETUP AND DISPLAY -----
  for(let i = 0; i < maze1.coins.length; i++){
    let coin = maze1.coins[i];
    user.coinProximity(coin);
    if(!coin.coinCounted && coin.taken){
      coinCount = coinCount + 1;
      coin.coinCounted = true;
    }
    coin.display();
  }

  //----- SPIDERS SETUP AND DISPLAY -----
  for(let i = 0; i < maze1.spiders.length; i++){
    let spider = maze1.spiders[i];
    ending = user.spiderProximity(spider);
    if(ending === 6){
      state = 'ending';
      break;
    }
    spider.display();
    spider.move();
  }

  //----- WEAPON SETUP AND DISPLAY -----
  user.weaponProximity(weapon1);
  weapon1.display();

  //----- USER SETUP ----
  user.display();
  user.move();

  if(weapon1.taken && !bowPlay){
    bowPickup.play();
    bowPlay = true;
  }

  //while an arrow isn't flying
  if (arrowHit){
    weapon1.arrowX = user.x;
    weapon1.arrowY = user.y;
  }
  //arrow is shot
  if (keyCode === 32 || !arrowHit){
    shoot(weapon1);
    keyCode = 34;
  }

  // //----- USES START DOOR TO EXIT -----
  if (user.x <= startdoor1.x && user.y <= startdoor1.y){
    level = 1;
  }
  //----- USES EXIT DOOR TO GO TO NEXT LEVEL -----
  if (user.x <= goaldoor1.x && user.y >= goaldoor1.y){
    level = 2;
    user.x = startdoor2.x + 5;
    user.y = startdoor2.y + 5;
    user.w = 35;
    user.h = 40;
  }
}

function level2(){
  //----- GAME TIMER -----
  frameCounter++;

  //----- STARTING & EXIT DOOR SETUP -----
  push();
  image(imgDoor, startdoor2.x, startdoor2.y, startdoor2.w, startdoor2.h);
  image(imgDoor, goaldoor2.x, goaldoor2.y, goaldoor2.w, goaldoor2.h);
  pop();

  //----- RAYCASTING -----
  particle.update(user.x, user.y);
  particle.raycast([...maze2.walls, ...maze2.coins, ...maze2.weapon, ...maze2.doors]);

  //----- WALL COLLISION SETUP -----
  for(let i = 0; i < maze2.walls.length; i++){
    let wall = maze2.walls[i];
    user.collisionDetect(wall);
    wall.display();
  }

  //----- COINS SETUP AND DISPLAY -----
  for(let i = 0; i < maze2.coins.length; i++){
    let coin = maze2.coins[i];
    user.coinProximity(coin);
    if(!coin.coinCounted && coin.taken){
      coinCount = coinCount + 1;
      coin.coinCounted = true;
    }
    coin.display();
  }

  //----- SPIDERS SETUP AND DISPLAY -----
  for(let i = 0; i < maze2.spiders.length; i++){
    let spider = maze2.spiders[i];
    ending = user.spiderProximity(spider);
    if(ending === 6){
      state = 'ending';
      break;
    }
    spider.display();
    spider.move();
  }

  //----- TBA || WEAPON SETUP AND DISPLAY -----
  user.weaponProximity(weapon2);
  weapon2.display();

  //----- USER SETUP ----
  user.display();
  user.move();

  //bow has yet to be added to the second level
  if(weapon2.taken && !bowPlay){
    bowPickup.play();
    bowPlay = true;
  }
  //while an arrow isn't shot
  if (arrowHit){
    weapon2.arrowX = user.x;
    weapon2.arrowY = user.y;
  }
  //arrow is shot
  if (keyCode === 32 || !arrowHit){
    shoot(weapon2);
    keyCode = 34;
  }

  //----- USES START DOOR TO RETURN TO LAST LEVEL -----
  if (user.x <= startdoor2.x && user.y <= startdoor2.y){
    level = 1;
    user.x = goaldoor1.x + 5;
    user.y = goaldoor1.y + 5;
    user.w = 47;
    user.h = 60;
  }
  //----- USES EXIT DOOR TO END GAME -----
  if (user.x >= goaldoor2.x && user.y >= goaldoor2.y){
    level = 3;
    user.x = startdoor3.x + 5;
    user.y = startdoor3.y + 5;
  }
}

function level3(){
  //----- GAME TIMER -----
  frameCounter++;

  //----- STARTING & EXIT DOOR SETUP -----
  push();
  image(imgDoor, startdoor3.x, startdoor3.y, startdoor3.w, startdoor3.h);
  image(imgDoor, goaldoor3.x, goaldoor3.y, goaldoor3.w, goaldoor3.h);
  pop();

  //----- RAYCASTING -----
  particle.update(user.x, user.y);
  particle.raycast([...maze3.walls, ...maze3.coins, ...maze3.weapon, ...maze3.doors]);

  //----- WALL COLLISION SETUP -----
  for(let i = 0; i < maze3.walls.length; i++){
    let wall = maze3.walls[i];
    user.collisionDetect(wall);
    wall.display();
  }

  //----- COINS SETUP AND DISPLAY -----
  for(let i = 0; i < maze3.coins.length; i++){
    let coin = maze3.coins[i];
    user.coinProximity(coin);
    if(!coin.coinCounted && coin.taken){
      coinCount = coinCount + 1;
      coin.coinCounted = true;
    }
    coin.display();
  }

  //----- SPIDERS SETUP AND DISPLAY -----
  for(let i = 0; i < maze3.spiders.length; i++){
    let spider = maze3.spiders[i];
    ending = user.spiderProximity(spider);
    if(ending === 6){
      state = 'ending';
      break;
    }
    spider.display();
    spider.move();
  }

  //----- TBA || WEAPON SETUP AND DISPLAY -----
  user.weaponProximity(weapon3);
  weapon3.display();

  //----- USER SETUP ----
  user.display();
  user.move();

  //bow has yet to be added to the second level
  if(weapon3.taken && !bowPlay){
    bowPickup.play();
    bowPlay = true;
  }
  //while an arrow isn't shot
  if (arrowHit){
    weapon3.arrowX = user.x;
    weapon3.arrowY = user.y;
  }
  //arrow is shot
  if (keyCode === 32 || !arrowHit){
    shoot(weapon3);
    keyCode = 34;
  }

  //----- USES START DOOR TO RETURN TO LAST LEVEL -----
  if (user.x <= startdoor1.x && user.y <= startdoor1.y){
    level = 2;
    user.x = goaldoor2.x - 5;
    user.y = goaldoor2.y - 5;
  }
  //----- USES EXIT DOOR TO END GAME -----
  if (user.x >= goaldoor3.x - 25 && user.x <= goaldoor3.x + 25 && user.y >= goaldoor3.y){
    state = 'ending';
  }
}

//----- END SCREEN -----
function endScreen(endingNum){
  gameplayTimer = round(frameCounter/60);
  if (endingNum === 6){
    //SPIDER DEATH
    fill(bg.rr, bg.rg, bg.rb);
    rectMode(CENTER);
    rect(width/2, height/2, width, height);
    fill(0, 0, 0);
    //lose
    textSize(50);
    textAlign(CENTER);
    text('YOU LOSE!', width/2, height/3);
    text('Curse those nasty cave spiders', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgSpider, width/2, height/3 + height/3);
    image(imgSpider, width/2 - 200, height/3 + height/3);
    image(imgSpider, width/2 + 200, height/3 + height/3);
    //plays sound
    if(!loseSoundPlay){
      loseSound.play();
      loseSoundPlay = true;
    }
  } else if (spiderSettings.killCount === 3){
    push();
    imageMode(CENTER);
    image(imgbgDay, 500, 500, width, height);
    fill(0);
    textSize(75);
    textAlign(CENTER);
    text('CONGRATULATIONS!', 500, 300);
    textSize(40);
    text('You rid the world of those awful cave spiders', 500, 400);
    text('You are the true champion!', 500, 450);
    imageMode(CENTER);
    image(imgCoin, width/2 + 240, height/3 + height/3);
    image(imgCoin, width/2 + 120, height/3 + height/3);
    image(imgCoin, width/2, height/3 + height/3);
    image(imgCoin, width/2 - 120, height/3 + height/3);
    image(imgCoin, width/2 - 240, height/3 + height/3);
    image(imgCoin, width/2 - 120, height/3 + height/3);
    image(imgCoin, width/2 + 120, height/3 + height/3);
    image(imgSpider, 500, 900, 200, 200);
    if(user.avatr === 'girl'){
      image(imageGirlL, 500, 825, 75, 75);
    } else if (user.avatar === 'guy'){
      image(imageGuyL, 500, 825, 75, 75);
    }
    pop();
    if(!winSoundPlay){
      winSound.play();
      winSoundPlay = true;
    }
  } else if(coinCount >= 1 && coinCount <= 3){
    //1 COIN COLLECTED
    push();
    imageMode(CENTER);
    image(imgbgDay, 500, 500, width, height);
    fill(0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got ' + coinCount + '/11 coins', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2, height/3 + height/3);
    pop();
    if(!winSoundPlay){
      winSound.play();
      winSoundPlay = true;
    }
  } else if (coinCount >= 4 && coinCount <= 6){
    //2 COINS COLLECTED
    push();
    imageMode(CENTER);
    image(imgbgDay, 500, 500, width, height);
    fill(0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got ' + coinCount + '/11 coins', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2 - 60, height/3 + height/3);
    image(imgCoin, width/2 + 60, height/3 + height/3);
    pop();
    if(!winSoundPlay){
      winSound.play();
      winSoundPlay = true;
    }
  } else if (coinCount >= 7 && coinCount <= 9){
    //3 COINS COLLECTED
    push();
    imageMode(CENTER);
    image(imgbgDay, 500, 500, width, height);
    fill(0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got ' + coinCount + '/11 coins', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2, height/3 + height/3);
    image(imgCoin, width/2 - 120, height/3 + height/3);
    image(imgCoin, width/2 + 120, height/3 + height/3);
    pop();
    if(!winSoundPlay){
      winSound.play();
      winSoundPlay = true;
    }
  } else if (coinCount === 10){
    //4 COINS COLLECTED
    push();
    imageMode(CENTER);
    image(imgbgDay, 500, 500, width, height);
    fill(0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got ' + coinCount + '/11 coins', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2 - 180, height/3 + height/3);
    image(imgCoin, width/2 - 60, height/3 + height/3);
    image(imgCoin, width/2 + 60, height/3 + height/3);
    image(imgCoin, width/2 + 180, height/3 + height/3);
    pop();
    if(!winSoundPlay){
      winSound.play();
      winSoundPlay = true;
    }
  } else if (coinCount === 11){
    //ALL 5 COINS COLLECTED
    push();
    imageMode(CENTER);
    image(imgbgDay, 500, 500, width, height);
    fill(0);
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
    pop();
    if(!winSoundPlay){
      winSound.play();
      winSoundPlay = true;
    }
  }
  //timer results
  textAlign(CENTER);
  textSize(40);
  text("You finished in " + gameplayTimer + " seconds", width/2, height - 50);
}

function shoot(weapon){
  if(weapon.arrowX < width && weapon.arrowX > 0 && weapon.arrowY < height && weapon.arrowY > 0 && weapon.taken){
    //decides which way the arrow is sent based on user's image
    //will add up arrow and down arrow in next progress update
    if (weapon.arrows === 0){
      fill(255);
      textSize(35);
      text("You are out of arrows.", width/3 + width/4, height - 25);
    } else if (user.bowRotate === 0){ //left
      weapon.alphaArrowL = 255;
      weapon.arrowX -= weapon.arrowSpeed;
    } else if (user.bowRotate === 180){ //right
      weapon.alphaArrowR = 255;
      weapon.arrowX += weapon.arrowSpeed;
    }
    //kills the spiders if they get hit
    if (level === 1){
      for(let i = 0; i < maze1.spiders.length; i++){
        let spider = maze1.spiders[i];
        if(spider.x + spider.size >= weapon.arrowX &&
          spider.x <= weapon.arrowX + weapon.size &&
          spider.y + spider.size >= weapon.arrowY &&
          spider.y <= weapon.arrowY + weapon.size &&
          !spider.killed){
          //resets spider
          spider.alpha = 0;
          spider.killed = true;
          spiderSettings.killCount = spiderSettings.killCount + 1;
          //resets arrow
          arrowHit = true;
          weapon.alphaArrowR = 0;
          weapon.alphaArrowL = 0;
          weapon.arrows = weapon.arrows - 1;
        }
      }
    } else if (level === 2){
      for(let i = 0; i < maze2.spiders.length; i++){
        let spider = maze2.spiders[i];
        if(spider.x + spider.size >= weapon.arrowX &&
          spider.x <= weapon.arrowX + weapon.size &&
          spider.y + spider.size >= weapon.arrowY &&
          spider.y <= weapon.arrowY + weapon.size &&
          !spider.killed){
          //resets spider
          spider.alpha = 0;
          spider.killed = true;
          spiderSettings.killCount = spiderSettings.killCount + 1;
          //resets arrow
          arrowHit = true;
          weapon.alphaArrowR = 0;
          weapon.alphaArrowL = 0;
          weapon.arrows = weapon.arrows - 1;
        }
      }
    } else if (level === 3){
      for(let i = 0; i < maze3.spiders.length; i++){
        let spider = maze3.spiders[i];
        if(spider.x + spider.size >= weapon.arrowX &&
          spider.x <= weapon.arrowX + weapon.size &&
          spider.y + spider.size >= weapon.arrowY &&
          spider.y <= weapon.arrowY + weapon.size &&
          !spider.killed){
          //resets spider
          spider.alpha = 0;
          spider.killed = true;
          spiderSettings.killCount = spiderSettings.killCount + 1;
          //resets arrow
          arrowHit = true;
          weapon.alphaArrowR = 0;
          weapon.alphaArrowL = 0;
          weapon.arrows = weapon.arrows - 1;
        }
      }
    }
    arrowHit = false;
  //ends arrow animation
  } else {
    if (!arrowHit){
      weapon.arrows = weapon.arrows - 1;
    }
    weapon.alphaArrowR = 0;
    weapon.alphaArrowL = 0;
    weapon.arrowX = user.x;
    weapon.arrowY = user.y;
    arrowHit = true;
  }
}
