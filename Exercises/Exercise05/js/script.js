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
-Modify user properties and add ability to grow flowers
-add wasps + kill bees & stop user function
-add timer (+ background change from yellow-blue-navy)
-create title/end screen and add image assets
**************************************************/

"use strict";
//VARIABLES
let garden = {
  flowers: [],
  numFlowers: 20,
  bees: [],
  numBees: 5,
  grassColor: {
    r: 120,
    g: 180,
    b: 120
  }
};

let user = {
  x: 500,
  y: 500,
  size: 50,
  speed: 4,
  color: 255
};

let state = 'gameplay';
let ending = 0;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1000, 1000);

  for (let i = 0; i < garden.numFlowers; i++) {
    //SETS VARIABLES FOR CONSTRUCTOR
    let config = {
      x: random(0, width),
      y: random(0, height),
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
}

// draw()
//
//
function draw() {
  //----- BACKGROUND -----
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);
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
  //----- FLOWER DISPLAY AND SHRINK -----
  for (let i = 0; i < garden.flowers.length; i++){
    let flower = garden.flowers[i];
    if (flower.alive) {
      flower.shrink();
      flower.display();
    }
  }
  //------ BEE DISPLAY AND POLLINATION CHECK -----
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

  //----- USER DISPLAY ----
  push();
  fill(user.color, user.color, user.color);
  noStroke();
  ellipse(user.x, user.y, user.size);
  pop();

  if (keyIsDown(UP_ARROW)){
    user.y = user.y - user.speed;
    user.y = constrain(user.y, 50, height - 50);
  } else if (keyIsDown(DOWN_ARROW)){
    user.y = user.y + user.speed;
    user.y = constrain(user.y, 50, height - 50);
  } else if (keyIsDown(LEFT_ARROW)){
    user.x = user.x - user.speed;
    user.x = constrain(user.x, 50, width - 50);
  } else if (keyIsDown(RIGHT_ARROW)){
    user.x = user.x + user.speed;
    user.x = constrain(user.x, 50, width - 50);
  }
}

//sorts from closest to furthest
function sortByY(flower1, flower2) {
  return flower1.y - flower2.y;
}

//----- ENDING SCREEN(S) -----
function endScreen() {
}
