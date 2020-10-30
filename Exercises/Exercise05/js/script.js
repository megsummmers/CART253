/**************************************************
Template p5 project by Pippin Barr
Extra code by Meg Summers

Garden Simulator:
Your a gardener trying to keep their garden alive
by watering your plants before they shrink and turn brown.
Bees will fly around and help the plants to grow
Wasps will fly around to kill the bees and slow you down.
keep as many flowers alive as you can for one day (1-2 minutes or inputted time??)
to win, if all your flowers die before the timer is up you lose.

Checklist:
-add timer (+ background change from yellow-blue-navy)
-create title/end screen and add image assets
**************************************************/

"use strict";
//VARIABLES
let garden = {
  flowers: [],
  numFlowers: 20,
  bees: [],
  numBees: 4,
  wasps: [],
  numWasps: 2,
  grassColor: {
    r: 120,
    g: 180,
    b: 120
  }
};

let bg = {
  x: 0,
  y: 0,
  h: 800,
  w: 1000,
  skyColor: {
    r: 200,
    g: 235,
    b: 255
  },
  grassColor: {
    r: 60,
    g: 200,
    b: 70
  }
};

let sun = {
  x: 300,
  y: 50,
  size: 150,
  color: 255,
  alpha: 255
};

let moon = {
  x: 675,
  y: 250,
  size: 100,
  color: 255,
  alpha: 255
};

let state = 'gameplay';
let ending = 1;
let gameTimer = 0;
let gameLength = 60 * 30;
let numDeadFlowers = 0;
let user;
let imgSun;
let imgMoon;

function preLoad(){
  imgSun = loadImage('assets/images/sun.png');
  imgMoon = loadImage('assets/images/moon.png');
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1000, 1000);
  preLoad();

  //VARIABLE SETUP
  bg.y = height/5;

  for (let i = 0; i < garden.numFlowers; i++) {
    //SETS VARIABLES FOR CONSTRUCTOR
    let config = {
      x: random(0, width),
      y: random(height/5, height),
      size: random(50, 80),
      stemLength: random(50, 80),
      stemThickness: random(8, 12),
      petalThickness: random(8, 12),
      stemColor: {
        r: random(0, 100),
        g: random(100, 255),
        b: random(0, 100)
      },
      petalColor: {
        r: random(100, 255),
        g: random(100, 255),
        b: random(100, 255)
      },
      centreColor: {
        r: random(0, 50),
        g: random(0, 50),
        b: random(0, 50)
      }
    };

    //----- CREATES AND PUSHES FLOWERS INTO ARRAY -----
    let flower = new Flower(config);
    garden.flowers.push(flower);
  }
  //-----  SORTS FLOWER BASED ON Y -----
  garden.flowers.sort(sortByY);

  //----- CREATES AND PUSHES BEES -----
  for (let i = 0; i < garden.numBees; i++){
    let x = random(0, width);
    let y = random(0, height);

    let bee = new Bee(x, y);
    garden.bees.push(bee);
  }
  //----- CREATES AND PUSHES WASPS -----
  for (let i = 0; i < garden.numWasps; i++){
    let x = random(0, width);
    let y = random(0, height);

    let wasp = new Wasp(x, y);
    garden.wasps.push(wasp);
  }
  //----- CREATE USER -----
  let userSettings = {
    x: 500,
    y: 500,
    size: 100,
    speed: 4,
    color: 255,
    hit: false
  };
  user = new User(userSettings);
}

// draw()
//
//
function draw() {
  //----- BACKGROUND -----
  background(bg.skyColor.r, bg.skyColor.g, bg.skyColor.b);
  bgColorChange();
  //----- GAME TIMER -----
  gameTimer++;
  if (gameTimer >= gameLength) {
    state = 'ending';
  }
  //----- STATE -----
  if (state === 'title'){
    titleScreen();
  } else if (state === 'gameplay'){
    gameplay();
  } else if (state === 'ending'){
    endScreen(ending);
  }
}

//----- TITLE SCREEN -----
function titleScreen(){

}

//----- GAMEPLAY SCREEN -----
function gameplay() {
  push();
  imageMode(CENTER);
  tint(sun.color, sun.color, sun.color, sun.alpha);
  image(imgSun, sun.x, sun.y, sun.size, sun.size);
  tint(moon.color, moon.color, moon.color, moon.alpha);
  image(imgMoon, moon.x, moon.y, moon.size, moon.size);
  pop();

  //----- BACKGROUND -----
  push();
  rectMode(CORNER);
  noStroke();
  fill(bg.grassColor.r, bg.grassColor.g, bg.grassColor.b);
  rect(bg.x, bg.y, bg.w, bg.h);
  pop();


  //----- FLOWER DISPLAY AND SHRINK -----
  for (let i = 0; i < garden.flowers.length; i++){
    let flower = garden.flowers[i];
    if (flower.alive) {
      flower.shrink();
      flower.display();
    } if (!flower.alive && !flower.deadCounted) {
      numDeadFlowers = numDeadFlowers + 1;
      flower.deadCounted = true;
    }
  }

  //----- BEE DISPLAY AND POLLINATION CHECK -----
  for (let i = 0; i < garden.bees.length; i++){
    let bee = garden.bees[i];
    if (bee.alive){
      bee.move();
      //CHECKS IF BEES FLY OVER FLOWERS
      for (let j = 0; j < garden.flowers.length; j++){
        let flower = garden.flowers[j];
        bee.pollinationCheck(flower);
      }
      bee.display();
    }
  }

  //----- WASP DISPLAY AND BEE CHECK -----
  for (let i = 0; i < garden.wasps.length; i++){
    let wasp = garden.wasps[i];
    wasp.move();
    //CHECK IF WASPS KILLS A BEE
    for (let j = 0; j < garden.bees.length; j++){
      let bee = garden.bees[j];
      wasp.beeCheck(bee);
    }
    wasp.display();
  }

  //----- USER FLOWER PROX. CHECK -----
  for (let i = 0; i < garden.flowers.length; i++){
    let flower = garden.flowers[i];
    user.waterFlowers(flower);
  }
  user.move();
  user.display();
  //----- USER TOUCH WASP CHECK -----
  for (let i = 0; i < garden.wasps.length; i++){
    let wasp = garden.wasps[i];
    user.waspCheck(wasp);
  }

  //----- ALL FLOWERS DEAD -----
  if(numDeadFlowers === garden.numFlowers){
    ending = 2;
    state = 'ending';
  }
}

//----- ENDING SCREEN(S) -----
function endScreen(endNum) {
  if(ending === 1){
    fill(0, 0, 0);
    rectMode(CENTER);
    rect(width/2, height/2, width, height);
    fill(255, 255, 255);
    textSize(75);
    textAlign(CENTER);
    text('You win!', width/2, height/3);
  } else if (ending === 2){
    fill(0, 0, 0);
    rectMode(CENTER);
    rect(width/2, height/2, width, height);
    fill(255, 255, 255);
    textSize(75);
    textAlign(CENTER);
    text('You lose!', width/2, height/3);
  }
}

//sorts from closest to furthest
function sortByY(flower1, flower2) {
  return flower1.y - flower2.y;
}

//----- CHANGES THE BACKGROUND -----
function bgColorChange() {
  if(gameTimer <= gameLength/2){
    //----- SKY CHANGE -----
    bg.skyColor.r = bg.skyColor.r - 0.2;
    bg.skyColor.r = constrain(bg.skyColor.r, 10, 200);
    bg.skyColor.g = bg.skyColor.g - 0.2;
    bg.skyColor.g = constrain(bg.skyColor.g, 150, 235);
    bg.skyColor.b = bg.skyColor.b - 0.2;
    bg.skyColor.b = constrain(bg.skyColor.b, 245, 255);
    //----- SUN -----
    sun.y = sun.y + 0.25;
  } else if(gameTimer >= gameLength/2){
    bg.skyColor.r = bg.skyColor.r - 0.2;
    bg.skyColor.r = constrain(bg.skyColor.r, 5, 10);
    bg.skyColor.g = bg.skyColor.g - 0.2;
    bg.skyColor.g = constrain(bg.skyColor.g, 15, 150);
    bg.skyColor.b = bg.skyColor.b - 0.2;
    bg.skyColor.b = constrain(bg.skyColor.b, 80, 245);
    //----- MOON -----
    moon.y = moon.y - 0.25;
  }
}
