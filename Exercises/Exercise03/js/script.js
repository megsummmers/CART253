/**************************************************
Template p5 project by Pippin Barr
Extra code by Meg (Margaret) Summers

We will open with a title screen.
When the simulation begins we see two circles in darkness,
they each move off in a random direction.
If they touch each other, the simulation ends with love triumphant!
If one goes off the edge of the canvas,
the simulation ends in deep sadness.
**************************************************/

//VARIABLES
let circle = {
  size: 250,
  x: width/2,
  y: height/2,
  vx: 0,
  vy: 0,
  speed: 0,
  r: 140,
  g: 125,
  b: 125,
  alpha: 150
};

let circle2 = {
  size: 250,
  x: width/2,
  y: height/2,
  vx: 0,
  vy: 0,
  speed: 0,
  r: 190,
  g: 165,
  b: 165
};

// setup()
//
//
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  //Random speed set
  circle.vx = random(1, 10);
  circle.vy = random(1, 10);
  circle2.vx = random(1, 10);
  circle2.vy = random(1, 10);
}

// draw()
//
//
function draw() {
  background(0, 0, 0);

  //circle setup
  push();
  fill(circle.r, circle.g, circle.b, circle.alpha);
  strokeWeight(3);
  stroke(circle2.r, circle2.g, circle2.b);
  ellipse(circle.x, circle.y, circle.size);
  ellipse(circle2.x, circle2.y, circle2.size);
  pop();

  //move the circles
  while(){
    random
  }
}
