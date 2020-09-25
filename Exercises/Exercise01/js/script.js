/**************************************************
Template p5 project by Pippin Barr
Code by Margaret (Meg) Summers

This program will have an animation of multiple shapes
that move, change size and color, as well as other
animations.
**************************************************/

//VARIABLES
//-------- BACKGROUND SECTION ---------
let bg = {
  r: 0,
  g: 0,
  b: 0,
  x: 325,
  y: 480,
  w: 750,
  h: 150,
  fill: 0
};
//-------- MOON SECTION ---------
let moon = {
  x: 450,
  y: 125,
  size: 125,
  fill: 255
};
let moonCrater = {
  x: 450,
  y: 125,
  size: 25,
  size2: 40,
  size3: 55,
  fill: 225
};
//-------- METEOR SECTION ---------
let meteor = {
  x: 600, //550
  y: -100,//-50
  size: 50,
  shrinkRate: 1,
  speedx: 2,
  speedy: 1.5,
  fillR: 77,
  fillG: 65,
  fillB: 62
};
let meteorFire1 = { //main
  x1: 600,
  y1: -120,
  x2: 600,
  y2: -80,
  x3: 700,
  y3: -150,
  fillR: 181,
  fillG: 107,
  fillB: 89
};
let meteorFire2 = { //smaller on top
  x1: 600,
  y1: -120,
  x2: 600,
  y2: -80,
  x3: 655,
  y3: -155,
  fillR: 181,
  fillG: 175,
  fillB: 89
};
let meteorFire3 = { //smaller on bottom
  x1: 600,
  y1: -120,
  x2: 600,
  y2: -80,
  x3: 675,
  y3: -120,
  fillR: 1812,
  fillG: 175,
  fillB: 89
};
//-------- STAR SECTION ---------
let star = {
  x: 250, y: 125, size: 5,
  x1: 200, y1: 50, size: 5,
  x2: 400, y2: 300, size: 5,
  x3: 50, y3: 175, size: 5,
  x4: 620, y4: 150, size: 5,
  x5: 420, y5: 125, size: 5,
  x6: 320, y6: 250, size: 5,
  x7: 70, y7: 335, size: 5,
  x8: 520, y8: 35, size: 5,
  x9: 600, y9: 350, size: 5,
  fill: 255, alpha: 0,
};
//-------- TREE SECTION ---------
let treeL = {
  x1: 150,
  y1: 250,
  x2: 75,
  y2: 400,
  x3: 225,
  y3: 400,
  fill: 0,
  x: 127,
  y: 350,
  w: 50,
  h: 150,
};
let treeR = {
  x1: 500,
  y1: 250,
  x2: 575,
  y2: 400,
  x3: 425,
  y3: 400,
  x: 477,
  y: 350,
  w: 50,
  h: 150,
};
let treeFarL = {
  x1: 25,
  y1: 275,
  x2: -25,
  y2: 425,
  x3: 100,
  y3: 425,
  x: 2,
  y: 375,
  w: 50,
  h: 150,
};
let treeFarR = {
  x1: 625,
  y1: 275,
  x2: 700,
  y2: 425,
  x3: 550,
  y3: 425,
  x: 602,
  y: 375,
  w: 50,
  h: 150,
};
//-------- PLANETS SECTION ---------
let planets = {
  x1: 525,
  y1: 125,
  size1: 100,
  x2: 75,
  y2: 75,
  size2: 25,
  x3: 200,
  y3: 250,
  size3: 150
};

// setup()
//
// Sets up the canvas
function setup() {
  createCanvas(650, 500);
  noStroke();
}

// draw()
//
// Creates the shapes and moves them around
function draw() {
  //-------- BACKGROUND SECTION ---------
  background(bg.r, bg.g, bg.b);
  bg.b = map(mouseY, 0, height, 0, 255);
  bg.r = map(mouseX, 0, width, 0, 100);

  //-------- PLANETS SECTION ---------
  //Green Planet
  fill(135, 212, 141);
  ellipse(planets.x1, planets.y1, planets.size1);
  planets.size1 = planets.size1 + 0.5;
  planets.size1 = constrain(planets.size1, 100, 150);
  //Orange Planet
  fill(210, 175, 125);
  ellipse(planets.x2, planets.y2, planets.size2);
  planets.size2 = planets.size2 + 0.5;
  planets.size2 = constrain(planets.size2, 25, 75);
  //Purple Planet
  fill(185, 125, 210);
  ellipse(planets.x3, planets.y3, planets.size3);
  planets.size3 = planets.size3 + 0.5;
  planets.size3 = constrain(planets.size3, 150, 200);

  //-------- METEOR SECTION ---------
  //smaller top flame
  fill(meteorFire2.fillR, meteorFire2.fillG, meteorFire2.fillB);
  triangle(meteorFire2.x1, meteorFire2.y1, meteorFire2.x2, meteorFire2.y2, meteorFire2.x3, meteorFire2.y3);
  meteorFire2.x1 = meteorFire2.x1 - meteor.speedx;
  meteorFire2.x2 = meteorFire2.x2 - meteor.speedx;
  meteorFire2.x3 = meteorFire2.x3 - meteor.speedx;
  meteorFire2.y1 = meteorFire2.y1 + meteor.speedy;
  meteorFire2.y2 = meteorFire2.y2 + meteor.speedy;
  meteorFire2.y3 = meteorFire2.y3 + meteor.speedy;
  //smaller bottom flame
  fill(meteorFire3.fillR, meteorFire3.fillG, meteorFire3.fillB);
  triangle(meteorFire3.x1, meteorFire3.y1, meteorFire3.x2, meteorFire3.y2, meteorFire3.x3, meteorFire3.y3);
  meteorFire3.x1 = meteorFire3.x1 - meteor.speedx;
  meteorFire3.x2 = meteorFire3.x2 - meteor.speedx;
  meteorFire3.x3 = meteorFire3.x3 - meteor.speedx;
  meteorFire3.y1 = meteorFire3.y1 + meteor.speedy;
  meteorFire3.y2 = meteorFire3.y2 + meteor.speedy;
  meteorFire3.y3 = meteorFire3.y3 + meteor.speedy;
  //Main flame
  fill(meteorFire1.fillR, meteorFire1.fillG, meteorFire1.fillB);
  triangle(meteorFire1.x1, meteorFire1.y1, meteorFire1.x2, meteorFire1.y2, meteorFire1.x3, meteorFire1.y3);
  meteorFire1.x1 = meteorFire1.x1 - meteor.speedx;
  meteorFire1.x2 = meteorFire1.x2 - meteor.speedx;
  meteorFire1.x3 = meteorFire1.x3 - meteor.speedx;
  meteorFire1.y1 = meteorFire1.y1 + meteor.speedy;
  meteorFire1.y2 = meteorFire1.y2 + meteor.speedy;
  meteorFire1.y3 = meteorFire1.y3 + meteor.speedy;
  //meteor
  fill(meteor.fillR, meteor.fillG, meteor.fillB);
  ellipse(meteor.x, meteor.y, meteor.size);
  meteor.x = meteor.x - meteor.speedx;
  meteor.y = meteor.y + meteor.speedy;

  //-------- STAR SECTION ---------
  fill(star.fill, star.alpha);
  ellipse(star.x, star.y, star.size);
  ellipse(star.x1, star.y1, star.size);
  ellipse(star.x2, star.y2, star.size);
  ellipse(star.x3, star.y3, star.size);
  ellipse(star.x4, star.y4, star.size);
  ellipse(star.x5, star.y5, star.size);
  ellipse(star.x6, star.y6, star.size);
  ellipse(star.x7, star.y7, star.size);
  ellipse(star.x8, star.y8, star.size);
  ellipse(star.x9, star.y9, star.size);
  star.alpha = star.alpha + 1;

  //-------- MOON SECTION ---------
  //Moon
  fill(moon.fill);
  ellipse(mouseX, mouseY, moon.size);
  //Moon Craters
  fill(moonCrater.fill);
  ellipse(mouseX -35, mouseY -20, moonCrater.size);
  ellipse(mouseX +25, mouseY +35, moonCrater.size);
  ellipse(mouseX -25, mouseY +25, moonCrater.size2);
  ellipse(mouseX +15, mouseY -25, moonCrater.size3);

  //-------- TREE SECTION ---------
  //Left Tree
  fill(treeL.fill);
  triangle(treeL.x1, treeL.y1, treeL.x2, treeL.y2, treeL.x3, treeL.y3);
  rect(treeL.x, treeL.y, treeL.w, treeL.h);
  //Right Tree
  triangle(treeR.x1, treeR.y1, treeR.x2, treeR.y2, treeR.x3, treeR.y3);
  rect(treeR.x, treeR.y, treeR.w, treeR.h);
  //Far Left Tree
  triangle(treeFarL.x1, treeFarL.y1, treeFarL.x2, treeFarL.y2, treeFarL.x3, treeFarL.y3);
  rect(treeFarL.x, treeFarL.y, treeFarL.w, treeFarL.h);
  //Far Right Tree
  triangle(treeFarR.x1, treeFarR.y1, treeFarR.x2, treeFarR.y2, treeFarR.x3, treeFarR.y3);
  rect(treeFarR.x, treeFarR.y, treeFarR.w, treeFarR.h);

  //-------- FOREGROUND SECTION ---------
  fill(bg.fill);
  ellipse(bg.x, bg.y, bg.w, bg.h);
}
