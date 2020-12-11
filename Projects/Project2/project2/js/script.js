/**************************************************
Template p5 project by Pippin Barr
Extra code by Meg Summers

Dungeon Quest:
A dungeon adventure game where you go to explore a Dungeon
full of cave spiders to get money to buy a soda.
Grab as many gold coins as you can and get out with your loot
without getting hit by a spider. If you find a bow and arrow
you can kill the spiders by shooting them. Once out of the
dungeon, you head over to the shop to buy an item.

Things to add later on:
-Boss level, giant spider with more health and/or timer
-Storyline/animation for opening and/or ending
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
  numWalls: 22,
  coins: [],
  numCoins: 5,
  spiders: [],
  numSpiders: 3,
  doors: [],
  weapon: []
};

let maze4 = {
  walls: [],
  numWalls: 25,
  coins: [],
  numCoins: 5,
  spiders: [],
  numSpiders: 3,
  doors:[],
  weapon: []
};

let maze5 = {
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
  g: 10,
  b: 0,
  rr: 175,
  rg: 25,
  rb: 25
};

let girlCircle = {
  x: 750, y: 350,
  size: 300,
  alpha: 0,
  color: 255
};

let boyCircle = {
  x: 250, y: 350,
  size: 300,
  alpha: 0,
  color: 255
};

let themCircle = {
  x: 500, y: 600,
  size: 300,
  alpha: 0,
  color: 255
};

let spiderSettings = {
  fastSpeed: 5, medSpeed: 4, slowSpeed: 3,
  movementH: "horizontal", movementV: "vertical",
  killCount: 0
};

let shopItems = {
  images: [],
  names: ["wonky 'you tried' sticker", "A can of soda", "A cute little plant", "Avatar 1.0 trophy", "Trophy of pure awesomeness"],
  prices: [5, 10, 15, 20, 25],
  coordX: [170, 290, 700, 800, 500],
  coordY: [235, 465, 465, 235, 235],
  x: 500,
  y: 700,
};

let storyText = {
  cutscene1: [
    "Wow, it's a lot hotter then I thought it was...",
    "Maybe should go get a soda from the shop?",
    "Oh wait...",
    "I have no coins left",
    "...",
    "Maybe my parents were right about getting a job.",
    "Hey wait! There's that dungeon to the left of my house.",
    "Maybe it has some coins in it?",
    "No hurt in checking it out I guess!"
  ],
  custscene2: [
    "Well it doesn't look too bad",
    "The 'DANGER CAVE SPIDERS' sign seems pretty inviting.",
    "It'll be fine, I'll be in and out before anything happens!"
  ],
  cutscene3_1: [
    "Well that was... intense",
    "Don't know how I got out of there alive with all those spiders",
    "There were so many of them!",
    "Welp, at least I can get a sode now!",
    "Worth it."
  ],
  custscene3_2: [
    "Well that was... intense",
    "Don't know how I got out of there alive with all those spiders",
    "There were so many of them!",
    "Oh no... I didn't get enough coins for the soda...",
    "Guess I'll go home and get... water I guess"
  ],
  middleX: -370,
  middleY: 0,
  dungeonX: 0,
  dungeonY: 0,
  shopX: -740,
  shopY: 0,
  avatarX: 500,
  avatarY: 800,
  avatarAlphaR: 255,
  avatarAlphaL: 0
}

//variables
let state = "cutscene";
let ending = 0;
let coinCount = 0;
let user;
let walls;
let particle;
let typewriter;
let weapon1;
let weapon2;
let weapon3;
let weapon4;
let weapon5;
let startdoor1;
let startdoor2;
let startdoor3;
let startdoor4;
let startdoor5;
let goaldoor1;
let goaldoor2;
let goaldoor3;
let goaldoor4;
let goaldoor5;
let arrowHit = true;
let spiderHit = false;
let page = 1; //For title screen
let mousePress;
let winSoundPlay = false;
let loseSoundPlay = false;
let bowPlay = false;
let level = 1;
let itemNum = 0;
let chosen = false;
let cutsceneNum = 1;
let cutsceneArea = "middle";
let textNum = 0;
//timer variables
let frameCounter = 0;
let gameplayTimer = 0;
let shopTimer = 0;
//image Variables
let imgCoin;
let imgSpider;
let imgDoor;
let imageGuyL;
let imageGuyR;
let imageGirlL;
let imageGirlR;
let imageThemL;
let imageThemR;
let imgWeapon;
let imgArrowL;
let imgArrowR;
let imgTitle;
let imgTitleBlur;
let imgMiddlebg;
let imgDungeonbg;
let imgShopbg;
let imgShop;
let img5prize;
let img10prize;
let img15prize;
let img20prize;
let img25prize;
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
  imageGuyL = loadImage ('assets/images/guy-left.png');
  imageGuyR = loadImage ('assets/images/guy-right.png');
  imageGirlL = loadImage ('assets/images/girl-left.png');
  imageGirlR = loadImage ('assets/images/girl-right.png');
  imageThemL = loadImage ('assets/images/them-left.png');
  imageThemR = loadImage ('assets/images/them-right.png');
  imgWeapon = loadImage ('assets/images/bow&arrow.png');
  imgArrowL = loadImage ('assets/images/arrowL.png');
  imgArrowR = loadImage ('assets/images/arrowR.png');
  imgTitle = loadImage ('assets/images/title-bg.jpg');
  imgTitleBlur = loadImage ('assets/images/title-bg-blurred.jpg');
  imgMiddlebg = loadImage ('assets/images/middle-bg.jpg');
  imgDungeonbg = loadImage ('assets/images/dungeon-bg.jpg');
  imgShopbg = loadImage ('assets/images/store-walk-bg.jpg');
  imgShop = loadImage ('assets/images/store-bg.jpg');
  img5prize = loadImage ('assets/images/5-coin-prize.png');
  img10prize = loadImage ('assets/images/soda-prize.png');
  img15prize = loadImage ('assets/images/plant-prize.png');
  img20prize = loadImage ('assets/images/20-coin-prize.png');
  img25prize = loadImage ('assets/images/trophy-prize.png');
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
    imageGirlR: imageGirlR,
    imageThemL: imageThemL,
    imageThemR: imageThemR
  };
  user = new User(userSettings);
  typewriter = new Typewriter();

  //level 1 bow weapon1
  maze1.weapon.push(new Bow(650, 25, 50, imgWeapon, imgArrowL, imgArrowR));
  weapon1 = maze1.weapon[0];
  //level 2 bow
  maze2.weapon.push(new Bow(525, 925, 50, imgWeapon, imgArrowL, imgArrowR));
  weapon2 = maze2.weapon[0];
  //level 3 bow
  maze3.weapon.push(new Bow(925, 275, 35, imgWeapon, imgArrowL, imgArrowR));
  weapon3 = maze3.weapon[0];
  //level 4 bow
  maze4.weapon.push(new Bow(725, 975, 35, imgWeapon, imgArrowL, imgArrowR));
  weapon4 = maze4.weapon[0];
  //level 5 bow
  maze5.weapon.push(new Bow(950, 425, 35, imgWeapon, imgArrowL, imgArrowR));
  weapon5 = maze5.weapon[0];

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
  maze2.walls.push(new Wall(100, 0, 100, 300));
  maze2.walls.push(new Wall(0, 400, 100, 400));
  maze2.walls.push(new Wall(200, 400, 100, 200));
  maze2.walls.push(new Wall(200, 700, 100, 200));
  maze2.walls.push(new Wall(100, 900, 400, 100));
  maze2.walls.push(new Wall(300, 100, 100, 200));
  maze2.walls.push(new Wall(400, 200, 100, 100));
  maze2.walls.push(new Wall(500, 0, 200, 400));
  maze2.walls.push(new Wall(400, 500, 300, 100));
  maze2.walls.push(new Wall(400, 600, 100, 200));
  maze2.walls.push(new Wall(600, 600, 100, 400));
  maze2.walls.push(new Wall(700, 700, 200, 200));
  maze2.walls.push(new Wall(800, 400, 200, 200));
  maze2.walls.push(new Wall(800, 100, 200, 100));
  maze2.walls.push(new Wall(800, 200, 100, 100));
  //outer boundaries for raycasting
  maze2.walls.push(new Wall(0, 0, width, 0));
  maze2.walls.push(new Wall(width, 0, width, height));
  maze2.walls.push(new Wall(0, height, width, height));
  maze2.walls.push(new Wall(0, 0, 0, height));

  //Wall Initialization level 3
  maze3.walls.push(new Wall(0, 150, 50, 350));
  maze3.walls.push(new Wall(100, 350, 150, 350));
  maze3.walls.push(new Wall(50, 550, 150, 200));
  maze3.walls.push(new Wall(150, 700, 100, 100));
  maze3.walls.push(new Wall(50, 800, 150, 150));
  maze3.walls.push(new Wall(100, 0, 700, 50));
  maze3.walls.push(new Wall(100, 100, 400, 200));
  maze3.walls.push(new Wall(300, 350, 200, 450));
  maze3.walls.push(new Wall(250, 850, 100, 150));
  maze3.walls.push(new Wall(350, 850, 50, 50));
  maze3.walls.push(new Wall(400, 850, 300, 100));
  maze3.walls.push(new Wall(550, 50, 150, 200));
  maze3.walls.push(new Wall(550, 300, 200, 150));
  maze3.walls.push(new Wall(500, 700, 50, 100));
  maze3.walls.push(new Wall(550, 500, 150, 300));
  maze3.walls.push(new Wall(750, 100, 150, 150));
  maze3.walls.push(new Wall(850, 50, 100, 200));
  maze3.walls.push(new Wall(800, 250, 100, 300));
  maze3.walls.push(new Wall(900, 300, 100, 350));
  maze3.walls.push(new Wall(750, 600, 100, 300));
  maze3.walls.push(new Wall(850, 700, 100, 200));
  maze3.walls.push(new Wall(750, 950, 150, 50));
  maze3.walls.push(new Wall(850, 900, 50, 100));
  //outer boundaries for raycasting
  maze3.walls.push(new Wall(0, 0, width, 0));
  maze3.walls.push(new Wall(width, 0, width, height));
  maze3.walls.push(new Wall(0, height, width, height));
  maze3.walls.push(new Wall(0, 0, 0, height));

  //Wall Initialization level 4
  maze4.walls.push(new Wall(0, 100, 300, 50));
  maze4.walls.push(new Wall(50, 200, 150, 250));
  maze4.walls.push(new Wall(0, 300, 50, 250));
  maze4.walls.push(new Wall(100, 400, 100, 200));
  maze4.walls.push(new Wall(50, 600, 200, 250));
  maze4.walls.push(new Wall(0, 900, 350, 100));
  maze4.walls.push(new Wall(350, 0, 150, 350));
  maze4.walls.push(new Wall(250, 400, 350, 150));
  maze4.walls.push(new Wall(300, 600, 50, 100));
  maze4.walls.push(new Wall(300, 700, 450, 150));
  maze4.walls.push(new Wall(400, 600, 100, 400));
  maze4.walls.push(new Wall(550, 0, 100, 150));
  maze4.walls.push(new Wall(500, 200, 350, 50));
  maze4.walls.push(new Wall(550, 200, 50, 150));
  maze4.walls.push(new Wall(550, 600, 200, 50));
  maze4.walls.push(new Wall(600, 900, 100, 100));
  maze4.walls.push(new Wall(700, 0, 150, 50));
  maze4.walls.push(new Wall(650, 100, 150, 50));
  maze4.walls.push(new Wall(800, 100, 100, 200));
  maze4.walls.push(new Wall(650, 300, 300, 250));
  maze4.walls.push(new Wall(800, 500, 100, 200));
  maze4.walls.push(new Wall(750, 750, 100, 200));
  maze4.walls.push(new Wall(900, 600, 50, 350));
  maze4.walls.push(new Wall(900, 50, 50, 100));
  maze4.walls.push(new Wall(950, 200, 50, 200));
  //outer boundaries for raycasting
  maze4.walls.push(new Wall(0, 0, width, 0));
  maze4.walls.push(new Wall(width, 0, width, height));
  maze4.walls.push(new Wall(0, height, width, height));
  maze4.walls.push(new Wall(0, 0, 0, height));

  //Wall Initialization level 5
  maze5.walls.push(new Wall(0, 50, 50, 100));
  maze5.walls.push(new Wall(100, 0, 50, 390));
  maze5.walls.push(new Wall(50, 200, 200, 150));
  maze5.walls.push(new Wall(0, 450, 150, 100));
  maze5.walls.push(new Wall(50, 600, 100, 200));
  maze5.walls.push(new Wall(200, 650, 50, 200));
  maze5.walls.push(new Wall(200, 700, 150, 100));
  maze5.walls.push(new Wall(0, 850, 350, 50));
  maze5.walls.push(new Wall(100, 950, 100, 50));
  maze5.walls.push(new Wall(250, 900, 100, 50));
  maze5.walls.push(new Wall(200, 0, 300, 50));
  maze5.walls.push(new Wall(300, 100, 350, 200));
  maze5.walls.push(new Wall(200, 400, 50, 190));
  maze5.walls.push(new Wall(300, 350, 300, 250));
  maze5.walls.push(new Wall(200, 550, 200, 500));
  maze5.walls.push(new Wall(400, 600, 50, 400));
  maze5.walls.push(new Wall(450, 650, 250, 100));
  maze5.walls.push(new Wall(500, 800, 250, 150));
  maze5.walls.push(new Wall(650, 50, 150, 200));
  maze5.walls.push(new Wall(700, 300, 100, 50));
  maze5.walls.push(new Wall(650, 400, 300, 100));
  maze5.walls.push(new Wall(750, 500, 150, 250));
  maze5.walls.push(new Wall(800, 800, 100, 200));
  maze5.walls.push(new Wall(900, 800, 50, 150));
  maze5.walls.push(new Wall(850, 0, 100, 250));
  maze5.walls.push(new Wall(850, 300, 150, 100));
  maze5.walls.push(new Wall(950, 550, 50, 200));
  //outer boundaries for raycasting
  maze5.walls.push(new Wall(0, 0, width, 0));
  maze5.walls.push(new Wall(width, 0, width, height));
  maze5.walls.push(new Wall(0, height, width, height));
  maze5.walls.push(new Wall(0, 0, 0, height));

  //Level 1 Coin Initialization
  maze1.coins.push(new Coin(25, 825, 50, imgCoin, coinPickup));
  maze1.coins.push(new Coin(525, 925, 50, imgCoin, coinPickup));
  maze1.coins.push(new Coin(925, 25, 50, imgCoin, coinPickup));
  maze1.coins.push(new Coin(925, 325, 50, imgCoin, coinPickup));
  maze1.coins.push(new Coin(925, 925, 50, imgCoin, coinPickup));

  //Level 2 Coin Initialization
  maze2.coins.push(new Coin(25, 925, 50, imgCoin, coinPickup));
  maze2.coins.push(new Coin(425, 125, 50, imgCoin, coinPickup));
  maze2.coins.push(new Coin(525, 625, 50, imgCoin, coinPickup));
  maze2.coins.push(new Coin(725, 925, 50, imgCoin, coinPickup));
  maze2.coins.push(new Coin(925, 25, 50, imgCoin, coinPickup));

  //Level 3 Coin Initialization
  maze3.coins.push(new Coin(60, 760, 35, imgCoin, coinPickup));
  maze3.coins.push(new Coin(360, 910, 35, imgCoin, coinPickup));
  maze3.coins.push(new Coin(510, 660, 35, imgCoin, coinPickup));
  maze3.coins.push(new Coin(860, 10, 35, imgCoin, coinPickup));
  maze3.coins.push(new Coin(810, 910, 35, imgCoin, coinPickup));

  //Level 4 Coin Initialization
  maze4.coins.push(new Coin(10, 785, 35, imgCoin, coinPickup));
  maze4.coins.push(new Coin(360, 950, 35, imgCoin, coinPickup));
  maze4.coins.push(new Coin(660, 10, 35, imgCoin, coinPickup));
  maze4.coins.push(new Coin(910, 260, 35, imgCoin, coinPickup));
  maze4.coins.push(new Coin(910, 560, 35, imgCoin, coinPickup));

  //Level 5 Coin Initialization
  maze5.coins.push(new Coin(10, 10, 35, imgCoin, coinPickup));
  maze5.coins.push(new Coin(20, 955, 35, imgCoin, coinPickup));
  maze5.coins.push(new Coin(460, 945, 35, imgCoin, coinPickup));
  maze5.coins.push(new Coin(910, 955, 35, imgCoin, coinPickup));
  maze5.coins.push(new Coin(960, 10, 35, imgCoin, coinPickup));

  //Level 1 Spider Initialization
  maze1.spiders.push(new Spider(325, 25, 75, 25, 525, spiderSettings.movementV, spiderSettings.fastSpeed, imgSpider));
  maze1.spiders.push(new Spider(525, 425, 75, 425, 925, spiderSettings.movementV, spiderSettings.slowSpeed, imgSpider));
  maze1.spiders.push(new Spider(725, 25, 75, 25, 425, spiderSettings.movementV, spiderSettings.fastSpeed, imgSpider));

  //Level 2 Spider Initialization
  maze2.spiders.push(new Spider(0, 325, 75, 0, 425, spiderSettings.movementH, spiderSettings.medSpeed, imgSpider));
  maze2.spiders.push(new Spider(125, 625, 75, 125, 325, spiderSettings.movementH, spiderSettings.medSpeed, imgSpider));
  maze2.spiders.push(new Spider(725, 125, 75, 125, 625, spiderSettings.movementV, spiderSettings.fastSpeed, imgSpider));

  //Level 3 Spider Initialization
  maze3.spiders.push(new Spider(500, 100, 50, 100, 550, spiderSettings.movementV, spiderSettings.fastSpeed, imgSpider));
  maze3.spiders.push(new Spider(50, 300, 50, 50, 500, spiderSettings.movementH, spiderSettings.fastSpeed, imgSpider));
  maze3.spiders.push(new Spider(700, 450, 50, 450, 950, spiderSettings.movementV, spiderSettings.medSpeed, imgSpider));

  //Level 4 Spider Initialization
  maze4.spiders.push(new Spider(0, 850, 50, 0, 350, spiderSettings.movementH, spiderSettings.fastSpeed, imgSpider));
  maze4.spiders.push(new Spider(200, 550, 50, 200, 750, spiderSettings.movementH, spiderSettings.medSpeed, imgSpider));
  maze4.spiders.push(new Spider(500, 250, 50, 250, 350, spiderSettings.movementV, spiderSettings.medSpeed, imgSpider));

  //Level 5 Spider Initialization
  maze5.spiders.push(new Spider(150, 350, 50, 350, 850, spiderSettings.movementV, spiderSettings.medSpeed, imgSpider));
  maze5.spiders.push(new Spider(700, 250, 50, 650, 950, spiderSettings.movementH, spiderSettings.slowSpeed, imgSpider));
  maze5.spiders.push(new Spider(600, 750, 50, 600, 950, spiderSettings.movementH, spiderSettings.slowSpeed, imgSpider));

  //level 1 door
  maze1.doors.push(new Door(25, 25, 51, 80, imgDoor));
  maze1.doors.push(new Door(25, 900, 51, 80, imgDoor));

  //level 2 door
  maze2.doors.push(new Door(25, 25, 51, 80, imgDoor));
  maze2.doors.push(new Door(925, 325, 51, 80, imgDoor));

  //level 3 door
  maze3.doors.push(new Door(25, 25, 38, 60, imgDoor));
  maze3.doors.push(new Door(925, 925, 38, 60, imgDoor));

  //level 4 door
  maze4.doors.push(new Door(25, 25, 38, 60, imgDoor));
  maze4.doors.push(new Door(550, 950, 38, 60, imgDoor));

  //level 5 door
  maze5.doors.push(new Door(525, 25, 38, 60, imgDoor));
  //maze5.doors.push(new Door(550, 950, 38, 60, imgDoor));

  //universal door Variables
  startdoor1 = maze1.doors[0];
  goaldoor1 = maze1.doors[1];
  startdoor2 = maze2.doors[0];
  goaldoor2 = maze2.doors[1];
  startdoor3 = maze3.doors[0];
  goaldoor3 = maze3.doors[1];
  startdoor4 = maze4.doors[0];
  goaldoor4 = maze4.doors[1];
  startdoor5 = maze5.doors[0];
  //goaldoor5 = maze5.doors[1];

  shopItems.images.push(img5prize);
  shopItems.images.push(img10prize);
  shopItems.images.push(img15prize);
  shopItems.images.push(img20prize);
  shopItems.images.push(img25prize);
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
  } else if (state === 'cutscene'){
    travelCutscene();
  } else if (state === 'gameplay'){
    if (level === 1){
      level1();
    } else if (level === 2){
      level2();
    } else if (level === 3){
      level3();
    } else if (level === 4){
      level4();
    } else if (level === 5){
      level5();
    }
  } else if (state === 'shop'){
    shop();
  } else if (state === 'ending'){
    endScreen(ending);
  }
}
//----- TITLE SCREEN -----
function titleScreen(){
  push();
  background(imgTitleBlur);
  textAlign(CENTER);
  fill(0);
  textSize(100);
  text('DUNGEON QUEST', 500, 200);
  textSize(50);
  text("PRESS 'H' FOR INSTRUCTIONS", 500, 525);
  text("PRESS ENTER TO START", 500, 600);
  pop();

  if(key === 'h'){
    state = 'howToPlay';
  }
}

function howToPlay(){
  push();
  background(imgTitleBlur);
  textAlign(CENTER);
  fill(0);
  textSize(100);
  text('HOW TO PLAY:', 500, 120);
  fill(255, 255, 255, 150);
  rectMode(CENTER);
  rect(500, 500, 950, 650);
  pop();

  if(page === 1){
    push();
    imageMode(CENTER);
    image(imageGuyR, 300, 350, 100, 100);
    image(imageGirlL, 700, 350, 100, 100);
    textSize(40);
    textAlign(CENTER);
    text("You control your character with the arrow keys,", 500, 650);
    text("Walk over coins to collect them.", 500, 725);
    textSize(35);
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
    text("Your goal is to find and collect as many gold coins", 500, 600);
    text("as possible, there are 5 hidden in each level", 500, 650);
    textSize(35);
    text("Use the doors to move up and down between each level,", 500, 725);
    text("To exit the dungeon, use the first door on the top level", 500, 775);
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
    text("Watch out for the cave spiders!", 500, 600);
    text("If you get too close to them you lose the game", 500, 650);
    text("and all the coins you've collected.", 500, 700);
    textSize(30);
    text("Hint: You'll need to kill some spiders to get all the coins!", 500, 800);
    textSize(30);
    text("Use the arrow keys to browse the instruction pages", 500, 900);
    text("Hit return to go back to the title screen", 500, 950);
    pop();
  } else if (page === 4){
    push();
    imageMode(CENTER);
    image(imgArrowL, 350, 325, 150, 150);
    image(imgWeapon, 650, 325, 150, 150);
    textSize(39);
    textAlign(CENTER);
    text("Find the bow in the dungeon and walk over to claim it,", 500, 600);
    text("Once you pick it up, hit the spacebar to shoot", 500, 650);
    textSize(30);
    text("You can only shoot horizontally and you only get 3 arrows per stage", 500, 750);
    text("So be careful with your shots!", 500, 790);
    textSize(30);
    text("Use the arrow keys to browse the instruction pages", 500, 900);
    text("Hit return to go back to the title screen", 500, 950);
    pop();
  }
}

//----- AVATAR SELECT SCREEN -----
function avatarScreen(){
  //----- TEXT -----
  push();
  background(imgTitleBlur);
  textAlign(CENTER);
  fill(0);
  textSize(75);
  text('SELECT YOUR AVATAR: ', 500, 150);
  textSize(40);
  textAlign(CENTER);
  text("Select the avatar you want by using the arrow keys,", 500, 850);
  text("Then hit enter to begin the game", 500, 900);
  pop();
  //----- AVATAR IMAGES + CIRCLES -----
  push();
  strokeWeight(15);
  //guy circle
  stroke(boyCircle.color, boyCircle.color, boyCircle.color, boyCircle.alpha);
  fill(boyCircle.color, boyCircle.color, boyCircle.color, boyCircle.alpha);
  ellipse(boyCircle.x, boyCircle.y, boyCircle.size);
  //girl circle
  stroke(girlCircle.color, girlCircle.color, girlCircle.color, girlCircle.alpha);
  fill(girlCircle.color, girlCircle.color, girlCircle.color, girlCircle.alpha);
  ellipse(girlCircle.x, girlCircle.y, girlCircle.size);
  //non-binary circle
  stroke(themCircle.color, themCircle.color, themCircle.color, themCircle.alpha);
  fill(themCircle.color, themCircle.color, themCircle.color, themCircle.alpha);
  ellipse(themCircle.x, themCircle.y, themCircle.size);
  //images
  imageMode(CENTER);
  image(imageGuyR, boyCircle.x, boyCircle.y, 200, 200);
  image(imageGirlL, girlCircle.x, girlCircle.y, 200, 200);
  image(imageThemR, themCircle.x, themCircle.y, 200, 200);
  pop();
}

function travelCutscene(){
  background(255);
  if(cutsceneNum === 1){
    if(cutsceneArea === "middle"){
      imageMode(LEFT);
      //-740 farthest right, 0 farthest left, -370 center
      image(imgMiddlebg, storyText.middleX, storyText.middleY);
      if (user.avatar === "guy"){
        push();
        imageMode(CENTER);
        tint(255, 255, 255, storyText.avatarAlphaL)
        image(imageGuyL, storyText.avatarX, storyText.avatarY);
        tint(255, 255, 255, storyText.avatarAlphaR)
        image(imageGuyR, storyText.avatarX, storyText.avatarY);
        pop();
      } else if (user.avatar === "girl"){
        push();
        imageMode(CENTER);
        tint(255, 255, 255, storyText.avatarAlphaL)
        image(imageGirlL, storyText.avatarX, storyText.avatarY);
        tint(255, 255, 255, storyText.avatarAlphaR)
        image(imageGirlR, storyText.avatarX, storyText.avatarY);
        pop();
      } else if (user.avatar === "non-binary"){
        push();
        imageMode(CENTER);
        tint(255, 255, 255, storyText.avatarAlphaL)
        image(imageThemL, storyText.avatarX, storyText.avatarY);
        tint(255, 255, 255, storyText.avatarAlphaR)
        image(imageThemR, storyText.avatarX, storyText.avatarY);
        pop();
      }

      if(textNum <= 8){
        //background rectangle for text
        push();
        stroke(0);
        strokeWeight(3);
        rectMode(CENTER);
        fill(255, 255, 255, 100);
        rect(500, 120, 900, 150);
        pop();
        //text
        push();
        textAlign(CENTER);
        textSize(30);
        fill(0);
        text(storyText.cutscene1[textNum], 500, 120);
        textSize(20);
        fill(100, 100, 100);
        text("hit enter to continue through the dialogue", 500, 175);
        pop();
      }

      //text with typewriter effect
      // typewriter.display();
      // typewriter.typewrite(storyText.cutscene1[textNum], 500, 120);

      if (keyIsDown(RIGHT_ARROW)){
        if (storyText.middleX <= -740){
          storyText.avatarX+= 5;
          storyText.avatarX = constrain(storyText.avatarX, 0, width);
        } else {
          storyText.middleX-= 5;
        }
        //change avatar facing
        storyText.avatarAlphaR = 255;
        storyText.avatarAlphaL = 0;
      } else if (keyIsDown(LEFT_ARROW)){
        if (storyText.middleX >= 0){
          storyText.avatarX-= 5;
          storyText.avatarX = constrain(storyText.avatarX, 0, width);
        } else {
          storyText.middleX+= 5;
        }
        //change avatar facing
        storyText.avatarAlphaR = 0;
        storyText.avatarAlphaL = 255;
      }

      if(storyText.avatarX === width){
        textNum = 0;
        storyText.avatarX = 50;
        cutsceneArea = "dungeon";
      } //fix this
      if (storyText.avatarX === 1){
        push();
        stroke(0);
        strokeWeight(3);
        rectMode(CENTER);
        fill(255, 255, 255, 100);
        rect(500, 120, 900, 150);
        pop();
        //text
        push();
        textAlign(CENTER);
        textSize(30);
        fill(0);
        text("I can't go to the shop without some coins", 500, 120);
        pop();
      }
      //DUNGEON PART OF CUTSCENE 1
    } else if (cutsceneArea === "dungeon"){
      imageMode(LEFT);
      //-740 farthest right, 0 farthest left, -370 center
      image(imgDungeonbg, storyText.dungeonX, storyText.dungeonY);
      if (user.avatar === "guy"){
        push();
        imageMode(CENTER);
        tint(255, 255, 255, storyText.avatarAlphaL)
        image(imageGuyL, storyText.avatarX, storyText.avatarY);
        tint(255, 255, 255, storyText.avatarAlphaR)
        image(imageGuyR, storyText.avatarX, storyText.avatarY);
        pop();
      } else if (user.avatar === "girl"){
        push();
        imageMode(CENTER);
        tint(255, 255, 255, storyText.avatarAlphaL)
        image(imageGirlL, storyText.avatarX, storyText.avatarY);
        tint(255, 255, 255, storyText.avatarAlphaR)
        image(imageGirlR, storyText.avatarX, storyText.avatarY);
        pop();
      } else if (user.avatar === "non-binary"){
        push();
        imageMode(CENTER);
        tint(255, 255, 255, storyText.avatarAlphaL)
        image(imageThemL, storyText.avatarX, storyText.avatarY);
        tint(255, 255, 255, storyText.avatarAlphaR)
        image(imageThemR, storyText.avatarX, storyText.avatarY);
        pop();
      }

      if(textNum <= 0 && storyText.avatarX >= 700){
        //background rectangle for text
        push();
        stroke(0);
        strokeWeight(3);
        rectMode(CENTER);
        fill(255, 255, 255, 100);
        rect(500, 120, 900, 150);
        pop();
        //text
        push();
        textAlign(CENTER);
        textSize(30);
        fill(0);
        text(storyText.cutscene1_2[textNum], 500, 120);
        textSize(20);
        fill(100, 100, 100);
        text("hit enter to continue through the dialogue", 500, 175);
        pop();
      }

      //text with typewriter effect
      // typewriter.display();
      // typewriter.typewrite(storyText.cutscene1[textNum], 500, 120);

      if (keyIsDown(RIGHT_ARROW)){
        if (storyText.middleX <= -740){
          storyText.avatarX+= 5;
          storyText.avatarX = constrain(storyText.avatarX, 0, width);
        } else {
          storyText.middleX-= 5;
        }
        //change avatar facing
        storyText.avatarAlphaR = 255;
        storyText.avatarAlphaL = 0;
      } else if (keyIsDown(LEFT_ARROW)){
        if (storyText.middleX >= 0){
          storyText.avatarX-= 5;
          storyText.avatarX = constrain(storyText.avatarX, 0, width);
        } else {
          storyText.middleX+= 5;
        }
        //change avatar facing
        storyText.avatarAlphaR = 0;
        storyText.avatarAlphaL = 255;
      }

      if(storyText.avatarX === width){
        cutsceneArea = "dungeon";
      } //fix this
      if (storyText.avatarX === 1){
        push();
        stroke(0);
        strokeWeight(3);
        rectMode(CENTER);
        fill(255, 255, 255, 100);
        rect(500, 120, 900, 150);
        pop();
        //text
        push();
        textAlign(CENTER);
        textSize(30);
        fill(0);
        text("I can't go to the shop without some coins", 500, 120);
        pop();
      }
    }
  }
}

//Gameplay function for level one of the dungeon
function level1(){
  //----- GAME TIMER -----
  frameCounter++;

  //----- STARTING & EXIT DOOR SETUP -----
  startdoor1.display();
  goaldoor1.display();

  //----- RAYCASTING -----
  particle.update(user.x, user.y);
  particle.raycast([...maze1.walls, ...maze1.coins, ...maze1.weapon, ...maze1.doors, ...maze1.spiders]);

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
    if(coinCount >= 5){
      state = 'shop';
    } else {
      state = 'ending';
    }
  }
  //----- USES EXIT DOOR TO GO TO NEXT LEVEL -----
  if (user.x <= goaldoor1.x + 10 && user.y >= goaldoor1.y - 10){
    level = 2;
    user.x = startdoor2.x + 5;
    user.y = startdoor2.y + 5;
  }
}

function level2(){
  //----- GAME TIMER -----
  frameCounter++;

  //----- STARTING & EXIT DOOR SETUP -----
  startdoor2.display();
  goaldoor2.display();

  //----- RAYCASTING -----
  particle.update(user.x, user.y);
  particle.raycast([...maze2.walls, ...maze2.coins, ...maze2.weapon, ...maze2.doors, ...maze2.spiders]);
  //particle.raycast(maze1.weapon);

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

  //----- WEAPON SETUP AND DISPLAY -----
  user.weaponProximity(weapon2);
  weapon2.display();

  //----- USER SETUP ----
  user.display();
  user.move();

  if(weapon2.taken && !bowPlay){
    bowPickup.play();
    bowPlay = true;
  }

  //while an arrow isn't flying
  if (arrowHit){
    weapon2.arrowX = user.x;
    weapon2.arrowY = user.y;
  }
  //arrow is shot
  if (keyCode === 32 || !arrowHit){
    shoot(weapon2);
    keyCode = 34;
  }

  // //----- USES START DOOR TO EXIT -----
  if (user.x <= startdoor2.x && user.y <= startdoor2.y){
    level = 1;
    user.x = goaldoor1.x;
    user.y = goaldoor1.y - 5;
  }
  //----- USES EXIT DOOR TO GO TO NEXT LEVEL -----
  if (user.x >= goaldoor2.x && user.y >= goaldoor2.y && user.y <= goaldoor2.y +25){
    level = 3;
    user.x = startdoor3.x + 5;
    user.y = startdoor3.y + 5;
    user.w = 35;
    user.h = 40;
  }
}

function level3(){
  //----- GAME TIMER -----
  frameCounter++;

  //----- STARTING & EXIT DOOR SETUP -----
  startdoor3.display();
  goaldoor3.display();

  //----- RAYCASTING -----
  particle.update(user.x, user.y);
  particle.raycast([...maze3.walls, ...maze3.coins, ...maze3.weapon, ...maze3.doors, ...maze3.spiders]);

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
  user.weaponProximity(weapon2);
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
  if (user.x <= startdoor3.x && user.y <= startdoor3.y){
    level = 2;
    user.x = goaldoor2.x;
    user.y = goaldoor2.y + 5;
    user.w = 47;
    user.h = 60;
  }
  //----- USES EXIT DOOR TO END GAME -----
  if (user.x >= goaldoor3.x && user.y >= goaldoor3.y){
    level = 4;
    user.x = startdoor4.x + 5;
    user.y = startdoor4.y + 54
  }
}

function level4(){
  //----- GAME TIMER -----
  frameCounter++;

  //----- STARTING & EXIT DOOR SETUP -----
  startdoor4.display();
  goaldoor4.display();

  //----- RAYCASTING -----
  particle.update(user.x, user.y);
  particle.raycast([...maze4.walls, ...maze4.coins, ...maze4.weapon, ...maze4.doors, ...maze4.spiders]);

  //----- WALL COLLISION SETUP -----
  for(let i = 0; i < maze4.walls.length; i++){
    let wall = maze4.walls[i];
    user.collisionDetect(wall);
    wall.display();
  }

  //----- COINS SETUP AND DISPLAY -----
  for(let i = 0; i < maze4.coins.length; i++){
    let coin = maze4.coins[i];
    user.coinProximity(coin);
    if(!coin.coinCounted && coin.taken){
      coinCount = coinCount + 1;
      coin.coinCounted = true;
    }
    coin.display();
  }

  //----- SPIDERS SETUP AND DISPLAY -----
  for(let i = 0; i < maze4.spiders.length; i++){
    let spider = maze4.spiders[i];
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
  weapon4.display();

  //----- USER SETUP ----
  user.display();
  user.move();

  //bow has yet to be added to the second level
  if(weapon4.taken && !bowPlay){
    bowPickup.play();
    bowPlay = true;
  }
  //while an arrow isn't shot
  if (arrowHit){
    weapon4.arrowX = user.x;
    weapon4.arrowY = user.y;
  }
  //arrow is shot
  if (keyCode === 32 || !arrowHit){
    shoot(weapon4);
    keyCode = 34;
  }

  //----- USES START DOOR TO RETURN TO LAST LEVEL -----
  if (user.x <= startdoor4.x && user.y <= startdoor4.y){
    level = 3;
    user.x = goaldoor3.x - 5;
    user.y = goaldoor3.y - 5;
  }
  //----- USES EXIT DOOR TO END GAME -----
  if (user.x >= goaldoor4.x - 25 && user.x <= goaldoor4.x + 25 && user.y >= goaldoor4.y){
    level = 5;
    user.x = startdoor5.x + 5;
    user.y = startdoor5.y + 5;
  }
}

function level5(){
  //----- GAME TIMER -----
  frameCounter++;

  //----- STARTING & EXIT DOOR SETUP -----
  startdoor5.display();

  //----- RAYCASTING -----
  particle.update(user.x, user.y);
  particle.raycast([...maze5.walls, ...maze5.coins, ...maze5.weapon, ...maze5.doors, ...maze5.spiders]);

  //----- WALL COLLISION SETUP -----
  for(let i = 0; i < maze5.walls.length; i++){
    let wall = maze5.walls[i];
    user.collisionDetect(wall);
    wall.display();
  }

  //----- COINS SETUP AND DISPLAY -----
  for(let i = 0; i < maze5.coins.length; i++){
    let coin = maze5.coins[i];
    user.coinProximity(coin);
    if(!coin.coinCounted && coin.taken){
      coinCount = coinCount + 1;
      coin.coinCounted = true;
    }
    coin.display();
  }

  //----- SPIDERS SETUP AND DISPLAY -----
  for(let i = 0; i < maze5.spiders.length; i++){
    let spider = maze5.spiders[i];
    ending = user.spiderProximity(spider);
    if(ending === 6){
      state = 'ending';
      break;
    }
    spider.display();
    spider.move();
  }

  //----- TBA || WEAPON SETUP AND DISPLAY -----
  user.weaponProximity(weapon5);
  weapon5.display();

  //----- USER SETUP ----
  user.display();
  user.move();

  //bow has yet to be added to the second level
  if(weapon5.taken && !bowPlay){
    bowPickup.play();
    bowPlay = true;
  }
  //while an arrow isn't shot
  if (arrowHit){
    weapon5.arrowX = user.x;
    weapon5.arrowY = user.y;
  }
  //arrow is shot
  if (keyCode === 32 || !arrowHit){
    shoot(weapon5);
    keyCode = 34;
  }
  //525, 25, 38, 60 max y 100
  //----- USES START DOOR TO RETURN TO LAST LEVEL -----
  if (user.x <= startdoor5.x +50 && user.x >= startdoor5.x -25 && user.y <= startdoor5.y){
    level = 4;
    user.x = goaldoor4.x - 5;
    user.y = goaldoor4.y - 5;
  }
  // //----- USES EXIT DOOR TO END GAME -----
  // if (user.x >= goaldoor5.x - 25 && user.x <= goaldoor5.x + 25 && user.y >= goaldoor5.y){
  //   if(coinCount >= 5){
  //     state = 'shop';
  //   } else {
  //     state = 'ending';
  //   }
  // }
}

function shop(){
  background(imgShop);
  //----- BOTTOM TEXT -----
  push();
  stroke(0);
  strokeWeight(3);
  rectMode(CENTER);
  fill(235, 75, 75);
  rect(width /2, 925, 800, 120);
  noStroke();
  fill(255);
  rect(width /2, 925, 780, 100);
  fill(0);
  textAlign(CENTER);
  textSize(45);
  text('You have ' + coinCount + ' coins', width/2, 925);
  textSize(25);
  text('Purchase one item by selecting it on the counter and hitting enter', width /2, 960);
  //----- CIRCLE BEHIND SELECTED ITEM -----
  fill(255, 255, 255, 100);
  ellipse(shopItems.coordX[itemNum], shopItems.coordY[itemNum], 175);
  fill(255, 220, 115, 100);
  ellipse(shopItems.coordX[itemNum], shopItems.coordY[itemNum], 150);
  //----- PRIZE IMAGES -----
  imageMode(CENTER);
  image(img5prize, 170, 235);
  image(img10prize, 290, 465);
  image(img15prize, 700, 465);
  image(img20prize, 800, 235);
  image(img25prize, 500, 235);
  pop();
  //----- CENTER IMAGE CHANGE -----
  //changes the prize on the main table as the user scrolls through
  if (!chosen){
    push();
    imageMode(CENTER);
    image(shopItems.images[itemNum], width /2, shopItems.y);
    fill(255);
    rectMode(CENTER);
    rect(width /2, 792, 680, 40);
    fill(0);
    textSize(25);
    textAlign(CENTER);
    text(shopItems.names[itemNum], width /2, 800);
    pop();
  } else if (chosen){
    if(coinCount >= shopItems.prices[itemNum]){
      state = 'ending';
    } else {
      shopTimer++;
      push();
      stroke(0);
      strokeWeight(3);
      rectMode(CENTER);
      fill(235, 75, 75);
      rect(width /2, 500, 800, 320);
      noStroke();
      fill(255);
      rect(width /2, 500, 780, 300);
      fill(0);
      textAlign(CENTER);
      textSize(35);
      text("You don't have enough coins to buy that item.", width /2, 475);
      text('Please select another item', width /2, 550);
      if(shopTimer > 300){
        chosen = false;
      }
    }
  }
}

function keyPressed(){
  //----- TITLE SCREEN -----
  //return to start game
  if (keyCode === RETURN && state === 'title'){
    state = 'avatar';
    keyCode = 32;
  }
  //----- HOW TO PLAY -----
  //used to navigate between guide pages and leave
  if (keyCode === RIGHT_ARROW && state === 'howToPlay'){
    page = page + 1;
    page = constrain(page, 1, 4);
  } else if (keyCode === LEFT_ARROW && state === 'howToPlay'){
    page = page - 1;
    page = constrain(page, 1, 4);
  } else if (keyCode === RETURN && state === 'howToPlay'){
    state = 'title';
  }

  //----- AVATAR SCREEN -----
  //used to select the avatar and start the cutscene
  if (keyCode === RIGHT_ARROW && state === 'avatar'){
    user.avatar = 'girl';
    user.avatar = 'girl';
    girlCircle.alpha = 100;
    boyCircle.alpha = 0;
    themCircle.alpha = 0;
  } else if (keyCode === LEFT_ARROW && state === 'avatar'){
    user.avatar = 'guy';
    user.avatar = 'guy';
    boyCircle.alpha = 100;
    girlCircle.alpha = 0;
    themCircle.alpha = 0;
  } else if (keyCode === DOWN_ARROW && state === 'avatar'){
    user.avatar = 'non-binary';
    user.avatar = 'non-binary';
    boyCircle.alpha = 0;
    girlCircle.alpha = 0;
    themCircle.alpha = 100;
  }
  if (keyCode === RETURN && state === 'avatar'){
    state = 'cutscene';
    keyCode = 32;
  }

  //----- CUTSCENE ------
  if (keyCode === RETURN && state === 'cutscene'){
    textNum += 1;
  }

  //----- SHOP CONTROLS -----
  if (keyCode === RIGHT_ARROW && state === 'shop'){
    if(itemNum <=3 && !chosen){
      itemNum += 1;
    }
  } else if (keyCode === LEFT_ARROW && state === 'shop'){
    if(itemNum >=1 && !chosen){
      itemNum -= 1;
    }
  }
  if(keyCode === RETURN && state === 'shop'){
    chosen = true;
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
  } else if (spiderSettings.killCount === 15){
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
  } else if(coinCount === 0){
    //1 COIN COLLECTED
    push();
    imageMode(CENTER);
    image(imgbgDay, 500, 500, width, height);
    fill(0);
    textSize(75);
    textAlign(CENTER);
    text('You win... I guess?', width/2, height/3);
    text('You got no coins but your still alive so congratulations', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2, height/3 + height/3);
    pop();
    if(!winSoundPlay){
      winSound.play();
      winSoundPlay = true;
    }
  } else if(coinCount >= 1 && coinCount <= 4){
    //1 COIN COLLECTED
    push();
    imageMode(CENTER);
    image(imgbgDay, 500, 500, width, height);
    fill(0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text("But you only got " + coinCount + "/25 coins so you weren't able to buy anything...", width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2, height/3 + height/3);
    pop();
    if(!winSoundPlay){
      winSound.play();
      winSoundPlay = true;
    }
  } else if (coinCount >= 5 && coinCount <= 10){
    //2 COINS COLLECTED
    push();
    imageMode(CENTER);
    image(imgbgDay, 500, 500, width, height);
    fill(0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got ' + coinCount + '/25 coins', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2 - 60, height/3 + height/3);
    image(imgCoin, width/2 + 60, height/3 + height/3);
    pop();
    if(!winSoundPlay){
      winSound.play();
      winSoundPlay = true;
    }
  } else if (coinCount >= 11 && coinCount <= 17){
    //3 COINS COLLECTED
    push();
    imageMode(CENTER);
    image(imgbgDay, 500, 500, width, height);
    fill(0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got ' + coinCount + '/25 coins', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2, height/3 + height/3);
    image(imgCoin, width/2 - 120, height/3 + height/3);
    image(imgCoin, width/2 + 120, height/3 + height/3);
    pop();
    if(!winSoundPlay){
      winSound.play();
      winSoundPlay = true;
    }
  } else if (coinCount >= 18 && coinCount <= 24){
    //4 COINS COLLECTED
    push();
    imageMode(CENTER);
    image(imgbgDay, 500, 500, width, height);
    fill(0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got ' + coinCount + '/25 coins', width/2, height/3 + 80);
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
  } else if (coinCount === 25){
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
      push();
      fill(255);
      textSize(35);
      text("You are out of arrows.", width/3 + width/4, height - 25);
      pop();
    } else if (user.alphaL === 255){ //left
      weapon.alphaArrowL = 255;
      weapon.arrowX -= weapon.arrowSpeed;
    } else if (user.alphaR === 255){ //right
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
          spiderHit = true;
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
          spiderHit = true;
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
          spiderHit = true;
          weapon.alphaArrowR = 0;
          weapon.alphaArrowL = 0;
          weapon.arrows = weapon.arrows - 1;
        }
      }
    } else if (level === 4){
      for(let i = 0; i < maze4.spiders.length; i++){
        let spider = maze4.spiders[i];
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
          spiderHit = true;
          weapon.alphaArrowR = 0;
          weapon.alphaArrowL = 0;
          weapon.arrows = weapon.arrows - 1;
        }
      }
    } else if (level === 5){
      for(let i = 0; i < maze5.spiders.length; i++){
        let spider = maze5.spiders[i];
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
          spiderHit = true;
          weapon.alphaArrowR = 0;
          weapon.alphaArrowL = 0;
          weapon.arrows = weapon.arrows - 1;
        }
      }
    }
    arrowHit = false;
  //ends arrow animation
  } else {
    if (!arrowHit && !spiderHit){
      weapon.arrows = weapon.arrows - 1;
    }
    weapon.alphaArrowR = 0;
    weapon.alphaArrowL = 0;
    weapon.arrowX = user.x;
    weapon.arrowY = user.y;
    arrowHit = true;
    spiderHit = false;
  }
}
