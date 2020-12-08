/**************************************************
Template p5 project by Pippin Barr
Extra code by Meg Summers

Experimenting with sound implications.
Current Ideas:
- Metal detector to coins or bow
- Create sound effect for arrows
**************************************************/

let targets = [];
let balls = [];
let notes = ['F3', 'G3', 'Ab4', 'Bb4', 'C4', 'Db4', 'Eb4', 'F5'];
let numofTargets = 2;
let targetsHit = 0;
let totalTargetsHit = 0;
let arrowHit = true;
let arrowOsc;
let playing = false;
let nearFreq = 440;
let farFreq = 350;
let nearAmp = 0.2;
let farAmp = 0;
//image variables
let imgBowL;
let imgBowR;
let imgBowU;
let imgBowD;
let imgArrowL;
let imgArrowR;
let imgArrowU;
let imgArrowD;
//class variables
let user;
let target;
let bow;
let ball;

function preload(){
  imgBowL = loadImage ('assets/images/bow&arrowL.png');
  imgBowR = loadImage ('assets/images/bow&arrowR.png');
  imgBowU = loadImage ('assets/images/bow&arrowU.png');
  imgBowD = loadImage ('assets/images/bow&arrowD.png');
  imgArrowL = loadImage ('assets/images/arrowL.png');
  imgArrowR = loadImage ('assets/images/arrowR.png');
  imgArrowU = loadImage ('assets/images/arrowU.png');
  imgArrowD = loadImage ('assets/images/arrowD.png');
}
// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1000, windowHeight);


  user = new User(width/2, height/2);
  for (let i = 0; i <= numofTargets; i++){
    let rSpeed = random(5, 8);
    let rY = random(150, 850);
    let rR = random(100, 230);
    let rG = random(100, 230);
    let rB = random(100, 230);
    let target = new Target(-150, rY, rSpeed, rR, rG, rB);
    targets.push(target);
  }
  let rX = random(150, 850);
  let rY = random(150, 850);
  bow = new Bow(rX, rY, imgBowL, imgBowR, imgBowU, imgBowD, imgArrowL, imgArrowR, imgArrowU, imgArrowD);

  arrowOsc = new p5.Oscillator();
  let d = dist(user.x, user.y, bow.arrowX, bow.arrowY);
  let maxDist = dist(0, 0, width, height);
  let newFreq = map(d, 0, maxDist, nearFreq, farFreq);
  //let newAmp = map(d, 0, maxDist, nearAmp, farAmp);
  arrowOsc.freq(440);
  arrowOsc.amp(0.02);
  userStartAudio();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0, 0, 0);

  //adds a ball after 10 targets hit
  if(targetsHit >= 10){
    //reset counter
    targetsHit = 0;
    //add a ball
    let note = random(notes);
    ball = new Ball(width/2, height/2, note);
    balls.push(ball);
  }
  //ball class call
  for (let i = 0; i < balls.length; i++){
    let ball = balls[i];
    ball.move();
    ball.display();
    ball.bounce();
  }

  //user class call
  user.move(bow);
  user.display();
  //target class call
  if (bow.bowTaken){
    for (let i = 0; i < targets.length; i++){
      let target = targets[i];
      target.move();
      target.display();
      bullseyeCheck(target);
    }
  }
  //bow class call
  bow.proximity(user);
  bow.display(user);

  if (arrowHit){
    bow.arrowX = user.x;
    bow.arrowY = user.y;
    arrowOsc.stop();
  }

  //arrow is shot
  if (keyCode === 32 || !arrowHit){
    shoot();
    arrowOsc.start();
    keyCode = 34;
  }

  //How to play text
  if (!bow.bowTaken){
    push();
    fill(255);
    textAlign(CENTER);
    textSize(40);
    text("Find your bow and arrow in the darkness", width/2, height/3);
    text("The pitch will get higher the closer you get to it", width/2, height/3 +50);
    pop();
  } else {
    push();
    fill(255);
    textAlign(CENTER);
    textSize(40);
    text("Use spacebar to shoot your arrows at the colourful targets", width/2, height - 100);
    textSize(25);
    text("Every 10 targets hit a ball will appear to bounce around and join your song", width/2, height - 50);
    pop();
  }
}

function shoot(){
  //checks if arrow is within the canvas
  if(bow.arrowX < width && bow.arrowX > 0 && bow.arrowY < height && bow.arrowY > 0 && bow.bowTaken){
    //arrow animation based on user's direction
    if (user.bowRotate === 0){
      bow.arrowAlphaL = 255;
      bow.arrowAlphaU = 0;
      bow.arrowAlphaR = 0;
      bow.arrowAlphaD = 0;
      bow.arrowX -= bow.arrowSpeed;
    } else if (user.bowRotate === 90){
      bow.arrowAlphaU = 255;
      bow.arrowAlphaL = 0;
      bow.arrowAlphaR = 0;
      bow.arrowAlphaD = 0;
      bow.arrowY -= bow.arrowSpeed;
    } else if (user.bowRotate === 180){
      bow.arrowAlphaR = 255;
      bow.arrowAlphaL = 0;
      bow.arrowAlphaU = 0;
      bow.arrowAlphaD = 0;
      bow.arrowX += bow.arrowSpeed;
    } else if (user.bowRotate === 270){
      bow.arrowAlphaD = 255;
      bow.arrowAlphaL = 0;
      bow.arrowAlphaU = 0;
      bow.arrowAlphaR = 0;
      bow.arrowY += bow.arrowSpeed;
    }
    //If the arrow hits a target
    for (let i = 0; i <= targets.length - 1; i++){
      let target = targets[i];
      let dT = dist(bow.arrowX, bow.arrowY, target.x, target.y)
      if(dT < 100 && !target.targetHit){
        //resets target
        bullseyeCheck(target);
        targetsHit = targetsHit + 1;
        //resets arrow
        target.targetHit = true;
        bow.arrowAlphaL = 0;
        bow.arrowAlphaU = 0;
        bow.arrowAlphaR = 0;
        bow.arrowAlphaD = 0;
        //end arrow animation
        arrowHit = true;
      }
    }
    arrowHit = false;
  } else {
    //reset arrow image
    bow.arrowAlphaL = 0;
    bow.arrowAlphaU = 0;
    bow.arrowAlphaR = 0;
    bow.arrowAlphaD = 0;
    bow.arrowX = user.x;
    bow.arrowY = user.y;
    //end arrow animation
    arrowHit = true;
  }
}

function bullseyeCheck(target){
  if (target.x >= 1150 || target.targetHit){
    //play note if hit
    if (target.targetHit){
      let note = random(notes);
      target.playNote(note);
      totalTargetsHit += 1;
    }
    target.x = -150;
    target.y = random(150, 850);
    target.targetHit = false;
  }
}
