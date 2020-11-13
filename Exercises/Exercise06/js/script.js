/**************************************************
Template p5 project by Pippin Barr
Extra code by Meg Summers

Experimenting with sound implications.
Current Ideas:
- Metal detector to coins or bow
- Create sound effect for arrows
**************************************************/

let targets = [];
let numofTargets = 2;
let targetsHit = 0;
let arrowHit = true;
let nearFreq = 500;
let farFreq = 200;
//image variables
let imgBow;
let imgArrowL;
let imgArrowR;
let imgArrowU;
let imgArrowD;
//class variables
let user;
let target;
let bow;

function preload(){
  imgBow = loadImage ('assets/images/bow&arrow.png');
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
    let rSpeed = random(3, 7);
    let rY = random(150, 850);
    let rR = random(100, 230);
    let rG = random(100, 230);
    let rB = random(100, 230);
    let target = new Target(-150, rY, rSpeed, rR, rG, rB);
    targets.push(target);
  }
  let rX = random(150, 850);
  let rY = random(150, 850);
  bow = new Bow(rX, rY, imgBow, imgArrowL, imgArrowR, imgArrowU, imgArrowD);

  userStartAudio();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0, 0, 0);

  //user class call
  user.move(bow);
  user.display();
  //target class call
  for (let i = 0; i < targets.length; i++){
    let target = targets[i];
    target.move();
    //target.proximity(user);
    target.display();
    bullseyeCheck(target);
  }
  // target.move();
  // target.display();
  // bullseyeCheck();
  //bow class call
  bow.proximity(user);
  bow.display(user);

  if (arrowHit){
    bow.arrowX = user.x;
    bow.arrowY = user.y;
  }

  //arrow is shot
  if (keyCode === 32 || !arrowHit){
    shoot();
    keyCode = 34;
  }
}

function shoot(){
  //oscillator
  bow.arrowProximity(user, arrowHit);

  //checks if arrow is within the canvas
  if(bow.arrowX < width && bow.arrowX > 0 && bow.arrowY < height && bow.arrowY > 0 && bow.bowTaken){
    //arrow flying sound
    // let dU = dist(bow.arrowX, bow.arrowY, user.x, user.y);
    // let maxDist = dist(0, 0, width, height);
    // let newFreq = map(dU, 0, maxDist, nearFreq, farFreq);
    // arrowOscillator.freq(newFreq);
    // arrowOscillator.amp(0.025);
    // arrowOscillator.start();

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
      if(dT < 50 && !target.targetHit){
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
    target.x = -150;
    target.y = random(150, 850);
    target.targetHit = false;
  }
}
