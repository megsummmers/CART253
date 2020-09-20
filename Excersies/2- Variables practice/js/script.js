/**************************************************
Template p5 project by Pippin Barr
Extra code by Meg Summers

Here is a description of this template p5 project.
**************************************************/
//HOW TO DO VARIABLES
//STEP 1: DECLARE THEM (you can do it anywhere but preferably on top of brackets)
let circleSize;

// setup()
// Is placed staticly, cannot change
//
//Creates the canvas
function setup() {
  createCanvas(500,500);
  circleSize = 100;
}

// draw()
//Is constanly changing at 60 frames per second
//
// Description of draw() goes here.
function draw() {
  background(150, 0, 200);//mouseX/Y can be used anywhere
  rectMode(CENTER);
  rect(mouseX, mouseY, 100, 100); //mouseX/Y makes the coordinates folloe the mouse
  //rect(250, 250, mouseX, mouseY); //changes size based on the mouse movement
  //variable width with always be the set width of the Canvas
  //same with variable height
  //windowWidth = width of entire window
  //same with height, they will always conform to the window size (once you refresh it)

}
