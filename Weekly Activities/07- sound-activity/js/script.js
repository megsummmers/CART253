/**************************************************
Template p5 project by Pippin Barr
Extra Code by Meg Summers

Here is a description of this template p5 project.
**************************************************/

let balls = [];

let notes = ['F3', 'G3', 'Ab4', 'Bb4', 'C4', 'Db4', 'Eb4', 'F5'];

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  userStartAudio();

  //createBall(width/2, height/2);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0, 0, 0);

  for(let i = 0; i < balls.length; i++){
    let ball = balls[i];
    ball.display();
    ball.move();
    ball.bounce();
  }
}

function mousePressed(){
  createBall(mouseX, mouseY);
}

function createBall(x, y){
  let note = random(notes);
  
  let ball = new Ball(x, y, note);
  balls.push(ball);
}
