/**************************************************
Template p5 project by Pippin Barr
Rest of the code by Meg Summers


**************************************************/

//VARIABLES
let bg = {
  r: 0,
  g: 0,
  b: 0,
}

let covid19 = {
  x: 0,
  y: 500, //check if you can put a random in there
  size: 200,
  speed: 15,
  r: 97,
  g: 69,
  b: 63,
  growthRate: 10
};

let user = {
  b: 200,
  r: 0
};
//game overlap
let gameOver = false;

// setup()
//
// sets canvas size and picture background
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  noCursor();
}

// draw()
//
// creates and moves circles around
//contains if/else statements
function draw() {
  //background
  background(bg.r, bg.g, bg.b);
  //static

  //USER spaceship
  image(img, mouseX, mouseY);

  //COVID19 circle
  fill(covid19.r, covid19.g, covid19.b);
  ellipse(covid19.x, covid19.y, covid19.size);

  //movement
  if(!gameOver){
    covid19.x = covid19.x + covid19.speed;
  }else if(gameOver){
    //covid19
    covid19.size = covid19.size + covid19.growthRate;
    covid19.size = constrain(covid19.size, 200, width);
    covid19.r = covid19.r +3
    covid19.g = covid19.g +3
    covid19.b = covid19.b +3

    //background colour change
    bg.r = bg.r + 3;
    bg.g = bg.g + 3;
    bg.b = bg.b + 3;

    //Game Over text
    fill(0);
    textAlign(CENTER);
    textSize(250);
    textFont('Helvetica');
    text('Game Over.', width/2, height/2);
  }

  //resets covid and sets new random y
  if(covid19.x >= width +150){
    covid19.x = covid19.x - width -200;
    covid19.y = random(0, height);
  }

  //Circles overlap if
  let d = dist(mouseX, mouseY, covid19.x, covid19.y);
  if(d <= 150){
    user.b = user.b - 200;
    gameOver = true;
  }

  //if statement for colour change
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
}//draw }

function preload(){
  img = loadImage('assets/images/8-bit-spaceship.PNG');
}
