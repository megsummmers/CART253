/**************************************************
Template p5 project by Pippin Barr
Code by Margaret Summers

Make an Abstract Animation using variables:
Two circles, the left one bigger and more transparent
than the right, come in from either side of the screen,
growing as they do so. They stop in the centre while
still growing. The background goes from black to red.
**************************************************/

//VARIABLES:
let circleL = {
  x: -125,
  y: 240,
  size: 350,
  alpha: 200,
  fill: 255,
  speed: 1,
  growthRate: 0.5
};
let circleR = {
  x: 690,
  y: 240,
  size: 50,
  alpha: 200,
  fill: 255,
  speed: 1,
  growthRate: 0.85
};
let bg ={
  r: 0,
  g: 0,
  b: 0,
};

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(640, 480);
  noStroke();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  //Background
  background(bg.r, bg.g, bg.b);
  //bg.r = bg.r + 1;
  bg.r = map(circleL.x,0,width/2,0,255);

  //Left circle
  circleL.x = circleL.x + circleL.speed;
  circleL.x = constrain(circleL.x,0,width/2);
  circleL.size = circleL.size - circleL.growthRate;
  circleL.size = constrain(circleL.size,0,width);
  fill(circleL.fill, circleL.alpha);
  ellipse(circleL.x, circleL.y, circleL.size);

  //Right Circle
  circleR.x = circleR.x - circleR.speed;
  circleR.x = constrain(circleR.x,width/2,width);
  circleR.size = circleR.size + circleR.growthRate;
  circleR.size = constrain(circleR.size,50,width);
  fill(circleR.fill, circleR.alpha);
  ellipse(circleR.x, circleR.y, circleR.size);
}
