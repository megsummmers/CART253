/**************************************************
Template p5 project
Template by Pippin Barr
Extra code by Margaret (Meg) Summers

This program draws simple shapes and changes their colours
**************************************************/

// setup()
//
// Draws and colours the shapes
function setup() {
  //creates a canvas then sets the background colour
  createCanvas(500, 500);
  background(175, 30, 210);

  point(250,250);
  //changes stroke and fill colour
  noStroke();
  fill(0, 30, 210, 50);
  //creates and centers ellipse
  ellipseMode(CENTER);
  ellipse(250 ,250, 350, 350);
  //changes stroke and fill colour for rectangle
  stroke(255, 255, 0);
  fill(210, 30, 0, 50);
  //creates and centers rectangle
  rectMode(CENTER);
  rect(250,250,250,200);
}

// draw()
//
// Nothing happens in here... yet
function draw() {

}
