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
  rr: 175,
  rg: 25,
  rb: 25
};

let door = {
  x: 20, y: 20,
  w: 51, h: 80
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

//variables
let state = "title";
let ending = 0;
let coinCount = 0;
let user;
let walls;
let weapon;
let arrowHit = true;
let page = 1;
let mousePress;
let spiderKillCount = 0;
let winPlay = false;
let losePlay = false;
let bowPlay = false;
//image VARIABLES
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
    x: 25,
    y: 25,
    w: 50,
    h: 65,
    imageGuyL: imageGuyL,
    imageGuyR: imageGuyR,
    imageGirlL: imageGirlL,
    imageGirlR: imageGirlR
  };
  user = new User(userSettings);

  weapon = new Bow(650, 50, imgWeapon, imgArrowL, imgArrowR);

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
  let coin1 = new Coin(50, 850, imgCoin, coinPickup);
  maze.coins.push(coin1);
  let coin2 = new Coin(550, 950, imgCoin, coinPickup);
  maze.coins.push(coin2);
  let coin3 = new Coin(950, 50, imgCoin, coinPickup);
  maze.coins.push(coin3);
  let coin4 = new Coin(950, 350, imgCoin, coinPickup);
  maze.coins.push(coin4);
  let coin5 = new Coin(950, 950, imgCoin, coinPickup);
  maze.coins.push(coin5);

  //Spider Initialization
  let spider1 = new Spider(350, 50, 50, 550, imgSpider);
  maze.spiders.push(spider1);
  let spider2 = new Spider(550, 450, 450, 950, imgSpider);
  maze.spiders.push(spider2);
  let spider3 = new Spider(750, 50, 50, 450, imgSpider);
  maze.spiders.push(spider3);
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
    gameplay();
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
    girlCircle.alpha = 100;
    boyCircle.alpha = 0;
    mousePress = true;
  } else if (boyD <= 100 && state === 'avatar'){
    user.avatar = 'guy';
    boyCircle.alpha = 100;
    girlCircle.alpha = 0;
    mousePress = true;
  }
}

function gameplay(){
  //----- EXIT DOOR SETUP -----
  image(imgDoor, door.x, door.y, door.w, door.h);

  //----- WALL COLLISION SETUP -----
  // user.hitLeft = false; broken code, will try to fix code later
  // user.hitRight = false;
  // user.hitTop = false;
  // user.hitBottom = false;
  for(let i = 0; i < maze.walls.length; i++){
    let wall = maze.walls[i];
    user.collisionDetect(wall);
    wall.display();
  }

  //----- COINS SETUP AND DISPLAY -----
  for(let i = 0; i < maze.coins.length; i++){
    let coin = maze.coins[i];
    user.coinProximity(coin);
    if(!coin.coinCounted && coin.coinTaken){
      coinCount = coinCount + 1;
      coin.coinCounted = true;
    }
    coin.display();
  }

  //----- SPIDERS SETUP AND DISPLAY -----
  for(let i = 0; i < maze.spiders.length; i++){
    let spider = maze.spiders[i];
    ending = user.spiderProximity(spider);
    if(ending === 6){
      state = 'ending';
      break;
    }
    spider.display();
    spider.move();
  }

  //----- WEAPON SETUP AND DISPLAY -----
  user.weaponProximity(weapon);
  weapon.display();

  //----- USER SETUP ----
  user.display();
  user.move();

  if(weapon.bowTaken && !bowPlay){
    bowPickup.play();
    bowPlay = true;
  }

  //checks if you can shoot
  if(key === 'a' && weapon.bowTaken === true && weapon.arrows >= 1){
    //sets arrow to user's position and allows entry to function
    console.log(weapon.arrows);
    weapon.arrowX = user.x;
    weapon.arrowY = user.y + 40;
    arrowHit = false;
  }
  if(!arrowHit){
    shoot();
  }

  //----- GAME END -----
  if (user.x <= door.x && user.y <= door.y){
    state = 'ending';
  }
}

//----- END SCREEN -----
function endScreen(endingNum){
  if (endingNum === 6){
    //SPIDER DEATH
    fill(bg.rr, bg.rg, bg.rb);
    rectMode(CENTER);
    rect(width/2, height/2, width, height);
    fill(0, 0, 0);
    textSize(50);
    textAlign(CENTER);
    text('YOU LOSE!', width/2, height/3);
    text('Curse those nasty cave spiders', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgSpider, width/2, height/3 + height/3);
    image(imgSpider, width/2 - 200, height/3 + height/3);
    image(imgSpider, width/2 + 200, height/3 + height/3);
    //plays sound
    if(!losePlay){
      loseSound.play();
      losePlay = true;
    }
  } else if (spiderKillCount === 3 && coinCount === 5){
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
    if(!winPlay){
      winSound.play();
      winPlay = true;
    }
  } else if(coinCount === 1){
    //1 COIN COLLECTED
    push();
    imageMode(CENTER);
    image(imgbgDay, 500, 500, width, height);
    fill(0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got 1/5 coins', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2, height/3 + height/3);
    pop();
    if(!winPlay){
      winSound.play();
      winPlay = true;
    }
  } else if (coinCount === 2){
    //2 COINS COLLECTED
    push();
    imageMode(CENTER);
    image(imgbgDay, 500, 500, width, height);
    fill(0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got 2/5 coins', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2 - 60, height/3 + height/3);
    image(imgCoin, width/2 + 60, height/3 + height/3);
    pop();
    if(!winPlay){
      winSound.play();
      winPlay = true;
    }
  } else if (coinCount === 3){
    //3 COINS COLLECTED
    push();
    imageMode(CENTER);
    image(imgbgDay, 500, 500, width, height);
    fill(0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got 3/5 coins', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2, height/3 + height/3);
    image(imgCoin, width/2 - 120, height/3 + height/3);
    image(imgCoin, width/2 + 120, height/3 + height/3);
    pop();
    if(!winPlay){
      winSound.play();
      winPlay = true;
    }
  } else if (coinCount === 4){
    //4 COINS COLLECTED
    push();
    imageMode(CENTER);
    image(imgbgDay, 500, 500, width, height);
    fill(0);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
    text('You got 4/5 coins', width/2, height/3 + 80);
    imageMode(CENTER);
    image(imgCoin, width/2 - 180, height/3 + height/3);
    image(imgCoin, width/2 - 60, height/3 + height/3);
    image(imgCoin, width/2 + 60, height/3 + height/3);
    image(imgCoin, width/2 + 180, height/3 + height/3);
    pop();
    if(!winPlay){
      winSound.play();
      winPlay = true;
    }
  } else if (coinCount === 5){
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
    if(!winPlay){
      winSound.play();
      winPlay = true;
    }
  }
}

function shoot(){
  if(weapon.arrowX < width && weapon.arrowX > 0 && weapon.arrowY < height && weapon.arrowY > 0){
    //decides which way the arrow is sent based on user's image
    if(user.alphaR === 255){
      weapon.alphaArrowR = 255;
      weapon.arrowX = weapon.arrowX + weapon.arrowSpeed;
    } else if (user.alphaL === 255){
      weapon.alphaArrowL = 255;
      weapon.arrowX = weapon.arrowX - weapon.arrowSpeed;
    }
    //kills the spiders if they get hit
    for(let i = 0; i < maze.spiders.length; i++){
      let spider = maze.spiders[i];
      let d = dist(weapon.arrowX, weapon.arrowY, spider.x, spider.y)
      if(d < 50 && !spider.killed){
        //resets spider
        spider.alpha = 0;
        spider.killed = true;
        spiderKillCount = spiderKillCount + 1;
        //resets arrow
        arrowHit = true;
        weapon.alphaArrowR = 0;
        weapon.alphaArrowL = 0;
        weapon.arrows = weapon.arrows - 1;
      }
    }
  //ends arrow animation
  } else {
    weapon.alphaArrowR = 0;
    weapon.alphaArrowL = 0;
    arrowHit = true;
    weapon.arrows = weapon.arrows - 1;
  }
}
