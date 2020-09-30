/**************************************************
Template p5 project by Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 4
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500, 500);

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(100, 160, 235);
  circle.x = circle.x + circle.speed;
  //introducing if statements :D
  //3 equal signs (===) means is equal to
  if(circle.x >= width) {
    circle.speed = -circle.speed;
  } else if(circle.x < 0){
    circle.speed = -circle.speed;
  }

  ellipse(circle.x, circle.y, circle.size);
}
