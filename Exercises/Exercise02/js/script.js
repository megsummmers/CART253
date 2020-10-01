/**************************************************
Template p5 project by Pippin Barr
Rest of the code by Meg Summers


**************************************************/

//VARIABLES
let bg = {
  r: 0,
  g: 0,
  b: 0,
};

let imag = {
  x: 900,
  y: 900
};

let covid19 = {
  x: 0,
  y: 500,
  size: 300,
  speed: 18,
  r: 97,
  g: 69,
  b: 63,
  growthRate: 10
};

let user = {
  b: 200,
  r: 0
};

let gameOver = false;

// setup()
//
// sets canvas size, noStroke and noCursor
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  noCursor();
}

// draw()
//
// creates and moves spaceship and meteor
// contains if/else statements
// -Game over -Overlap -Random start for meteor
// -Colour change
function draw() {
  //-------- BACKGROUND SETUP --------
  background(bg.r, bg.g, bg.b);

  //-------- SPACESHIP SETUP --------
  image(img, imag.x, imag.y);

  //-------- METOR SETUP --------
  fill(covid19.r, covid19.g, covid19.b);
  ellipse(covid19.x, covid19.y, covid19.size);

  //-------- METOR MOVEMENT --------
  if(!gameOver){
    covid19.x = covid19.x + covid19.speed;
  } else if(gameOver){ //GAMEOVER SECTION
    //-------- METOR GAMEOVER --------
    covid19.size = covid19.size + covid19.growthRate;
    covid19.size = constrain(covid19.size, 200, width);
    covid19.r = covid19.r +3
    covid19.g = covid19.g +3
    covid19.b = covid19.b +3

    //-------- BACKGROUND GAMEOVER --------
    bg.r = bg.r + 3;
    bg.g = bg.g + 3;
    bg.b = bg.b + 3;

    //-------- GAMEOVER TEXT --------
    fill(0);
    textAlign(CENTER);
    textSize(250);
    textFont('Helvetica');
    text('Game Over.', width/2, height/2);
  }

  //-------- METOR RESET/RANDOM --------
  if(covid19.x >= width +150){
    covid19.x = covid19.x - width -200;
    covid19.y = random(0, height);
  }

  //-------- OVERLAP CHECK --------
  let d = dist(mouseX, mouseY, covid19.x, covid19.y);
  if(d <= 175){
    user.b = user.b - 200;
    gameOver = true;
  }

  //-------- PROXIMITY METEOR COLOUR CHANGE --------
  if(!gameOver){
    if(d > 500){
      covid19.r = covid19.r - 10;
      covid19.r = constrain(covid19.r, 10, 97);
      covid19.g = covid19.g - 10;
      covid19.g = constrain(covid19.g, 10, 69);
      covid19.b = covid19.b - 10;
      covid19.b = constrain(covid19.b, 10, 63);
    } else if (d < 500){
      covid19.r = covid19.r + 10;
      covid19.r = constrain(covid19.r, 10, 97);
      covid19.g = covid19.g + 10;
      covid19.g = constrain(covid19.g, 10, 69);
      covid19.b = covid19.b + 10;
      covid19.b = constrain(covid19.b, 10, 63);
    }
  }
}
//-------- IMAGE FUNCTION --------
function preload(){
  img = loadImage('assets/images/8-bit-spaceship.PNG');
}
//-------- MOUSE DRAG FUNCTION --------
function mouseDragged(){
  //allows spaceship to move while mouse is dragged
  imag.x = mouseX;
  imag.y = mouseY;
  //locks the cursor to the last coodinates
  if(!locked){
    locked = true;
    requestPointerLock();
  } else {
    exitPointerLock();
    locked = false;
  }
}
