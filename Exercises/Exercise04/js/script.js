/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
"use strict";

// VARIABLES
let school = [];
let schoolSize = 5;
let state = 'gameplay';
let ending = 1;
let sixFeet = 40;
let curedCount = 0;

let enemy = {
  x: 300,
  y: 300,
  size: 40,
  r: 200,
  g: 0,
  b: 0,
  vx: 0,
  vy: 0,
  speed: 1
};

let user = {
  x: 0,
  y: 0,
  size: 40,
  color: 255,
  speed: 2.5
};
// setup()
//
// creates canvas and puts infected in array
function setup() {
  createCanvas(600, 600);

  //Creates infected and adds it to the array at a random position
  for (let i = 0; i < schoolSize; i++){
    let infected = createInfected(random(0, width), random(0, height));
    school.push(infected);
  }
}

//----- CREATES FISH OBJECT -----
function createInfected(x, y){
  //creates the object within the array
  let infected = {
    x: x,
    y: y,
    size: 50,
    r: 200, g: 0, b: 0,
    cured: false,
    vx: 0,
    vy: 0,
    speed: 2
  };
  return infected;
}

// draw()
//
// sets background, moves the infected in the array and displays them
function draw() {
  background(0);

  if (state === 'title'){
    titleScreen();
  } else if (state === 'gameplay'){
    gameplay();
  } else if (state === 'ending'){
    endScreen(ending);
  }
}

function titleScreen(){

}

function gameplay(){
  console.log(curedCount, ending, state);

  for (let i = 0; i < school.length; i++) {
    moveInfected(school[i]);
    displayInfected(school[i]);
  }
  push();
  //user circle
  fill(user.color);
  ellipse(user.x, user.y, user.size);

  //enemy circle
  fill(enemy.r, enemy.g, enemy.b);
  rectMode(CENTER)
  rect(enemy.x, enemy.y, enemy.size);
  pop();

  //----- USER CONTROL -----
  if (keyIsDown(UP_ARROW)){
    user.y = user.y - user.speed;
  } else if (keyIsDown(DOWN_ARROW)){
    user.y = user.y + user.speed;
  } else if (keyIsDown(LEFT_ARROW)){
    user.x = user.x - user.speed;
  } else if (keyIsDown(RIGHT_ARROW)){
    user.x = user.x + user.speed;
  }

  for (let j = 0; j < school.length; j++) {
    touchInfected(school[j]);
  }

  //----- ENEMY RANDOM -----
  let change = random(0, 1);
  if (change < 0.05) {
    enemy.vx = random(-enemy.speed, enemy.speed);
    enemy.vy = random(-enemy.speed, enemy.speed);
  }
  enemy.x = enemy.x + enemy.vx;
  enemy.y = enemy.y + enemy.vy;
  enemy.x = constrain(enemy.x, 0, width);
  enemy.y = constrain(enemy.y, 0, height);


  //----- LOSE END CONDITION -----
  if(dist(user.x, user.y, enemy.x, enemy.y) <= sixFeet) {
    ending = 1;
    state = 'ending';
  }

  //----- WIN END CONDITION -----
  if (curedCount === school.length) {
    ending = 2;
    state = 'ending';
  }
}

function endScreen(endNumber){
  if (endNumber === 1) {
    push();
    noStroke();
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(width/2, height/2, width, height);
    fill(0, 0, 0);
    textSize(50);
    textAlign(CENTER);
    text('You got infected', width/2, height/2);
    pop();
  } else if (endNumber === 2) {
    push();
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(width/2, height/2, width, height);
    fill(0);
    textSize(50);
    textAlign(CENTER);
    text('You cured everyone!', width/2, height/2);
    pop();
  }
}

function touchInfected(infected) {
  let userDistance = dist(user.x, user.y, infected.x, infected.y);
  let enemyDistance = dist(enemy.x, enemy.y, infected.x, infected.y);
  if (userDistance <= sixFeet && !infected.cured) {
    infected.r = random(150, 255);
    infected.g = random(150, 255);
    infected.b = random(150, 255);
    infected.cured = true;
    curedCount = curedCount + 1;
    curedCount = constrain(curedCount, 0, school.length);
  } else if (enemyDistance <= sixFeet && infected.cured) {
    infected.r = 225;
    infected.g = 0;
    infected.b = 0;
    infected.cured = false;
    curedCount = curedCount - 1;
    curedCount = constrain(curedCount, 0, school.length);
  }
}

//----- MOVES THE FISH
function moveInfected(infected) {
  let change = random(0, 1);
  if (change < 0.05) {
    infected.vx = random(-infected.speed, infected.speed);
    infected.vy = random(-infected.speed, infected.speed);
  }

  infected.x = infected.x + infected.vx;
  infected.y = infected.y + infected.vy;

  infected.x = constrain(infected.x, 0, width);
  infected.y = constrain(infected.y, 0, height);
}

//----- FISH DISPLAY CONTROL -----
function displayInfected(infected) {
  push();
  fill(infected.r, infected.g, infected.b);
  noStroke();
  ellipse(infected.x, infected.y, infected.size);
  pop();
}

//----- ADD A FISH WHERE MOUSE IS PRESSED -----
// function mousePressed(){
//   let infected = createInfected(mouseX, mouseY);
//   school.push(infected);
// }
