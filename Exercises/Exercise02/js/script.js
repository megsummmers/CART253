/**************************************************
Template p5 project by Pippin Barr
Rest of the code by Meg Summers


**************************************************/

//VARIABLES
let bg = {
  r: 0
}

let covid19 = {
  x: 0,
  y: 500, //check if you can put a random in there
  size: 200,
  speed: 8,
  r: 255,
  growthRate: 5
  //let y = random(0, 800);
};

let user = {
  size: 150,
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
  background(bg.r,0,0);
  //static

  //USER circle
  fill(user.r, 0, user.b);
  ellipse(mouseX, mouseY, user.size);

  //COVID19 circle
  fill(covid19.r, 0, 0);
  ellipse(covid19.x, covid19.y, covid19.size);

  //movement
  if(!gameOver){
    covid19.x = covid19.x + covid19.speed;
  }else if(gameOver){
    //covid19
    covid19.size = covid19.size + covid19.growthRate;
    covid19.size = constrain(covid19.size, 200, width);
    //chnages user circle colour
    user.r = user.r + 1;
    //background colour change
    bg.r = bg.r + 1;
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
  if(d <= 200){
    user.b = user.b - 200;
    gameOver = true;
  }
}//draw }
