/**************************************************
Template p5 project by Pippin Barr
"Draw and alien" code by Margaret (Meg) Summers

This code will draw an alien and it's spaceship using different shapes and colours.
**************************************************/

// setup()
//
// Creates shapes that make up the alien
function setup() {
  //creates canvas with background colour
  createCanvas(640, 480);
  background(255, 173, 224); //pink

  //spaceship
  strokeWeight(5);
  stroke(175, 175, 175);
  fill(200, 200, 200);//grey
  ellipse(155, 175, 200, 200);
  //pink rectangle + yellow beam
  noStroke();
  fill(255, 173, 224);//pink sqaure to hid lower half of the ellipse
  rect(0, 202, 250, 250);
  fill(255, 246, 82);//yellow beam
  triangle(150, 175, 50, 650, 250, 650);
  //grey UFO rectangle + yellow lights on ship
  stroke(175, 175, 175);
  fill(175, 175, 175);//grey
  rect(20, 150, 250, 50);
  noStroke();
  fill(255, 246, 82);//yellow
  circle(50, 175, 20);
  circle(100, 175, 20);
  circle(150, 175, 20);
  circle(200, 175, 20);
  circle(250, 175, 20);

  //create the body
  noStroke();
  fill(160, 240, 198);//darker mint green
  ellipse(370, 480, 200, 300);

  //create the head
  fill(175, 255, 206);//mint green
  ellipse(370, 240, 250, 300);

  //create the facial features
  strokeWeight(2);
  stroke(0, 0, 0);
  fill(35, 35, 35);
  ellipse(325, 240, 50, 90);//left eye
  ellipse(415, 240, 50, 90);//right eye
  ellipse(358, 285, 5, 15);//left nostril
  ellipse(380, 285, 5, 15);//right nostril
  triangle(350, 315, 390, 315, 370, 365);//mouth
  strokeWeight(3);
  line(385, 210, 450, 175);//right eyebrow
  line(300, 180, 355, 210);//left eyebrow

  //antennas
  stroke(184, 255, 211); //light mint green
  fill(184, 225, 211);
  strokeWeight(15);
  line(315, 120, 275, 75);
  ellipse(275,75, 25, 25);
  line(415, 120, 455, 75);
  ellipse(455, 75, 25, 25);
}

// draw()
//
// Nothing...yet
function draw() {

}
