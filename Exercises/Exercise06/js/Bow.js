class Bow {
  constructor(x, y, bowImageL, bowImageR, bowImageU, bowImageD, arrowL, arrowR, arrowU, arrowD){
    this.x = x;
    this.y = y;
    this.size = 100;
    this.color = 255;
    this.alphaL = 0;
    this.alphaR = 0;
    this.alphaU = 0;
    this.alphaD = 0;
    this.bowTaken = false;
    //images
    this.imageBowL = bowImageL;
    this.imageBowR = bowImageR;
    this.imageBowU = bowImageU;
    this.imageBowD = bowImageD;
    this.imageArrowL = arrowL;
    this.imageArrowR = arrowR;
    this.imageArrowU = arrowU;
    this.imageArrowD = arrowD;
    //arrows
    this.arrowX = 0;
    this.arrowY = 0;
    this.arrowAlphaL = 0;
    this.arrowAlphaR = 0;
    this.arrowAlphaU = 0;
    this.arrowAlphaD = 0;
    this.arrowSpeed = 20;
    this.arrowHit = false;
    //oscillator
    this.bowOscillator = new p5.Oscillator();
    this.bowOscillator.amp(0.025);
    this.nearFreq = 450;
    this.farFreq = 200;

  }

  proximity(user){
    let d = dist(this.x, this.y, user.x, user.y);
    //oscillator
    if (!this.bowTaken){
      this.bowOscillator.start();
      let maxDist = dist(0, 0, width, height);
      let newFreq = map(d, 0, maxDist, this.nearFreq, this.farFreq);
      this.bowOscillator.freq(newFreq);
    } else {
      this.bowOscillator.stop();
    }
    //alpha proximity
    if(d <= 25){
      this.alphaL = 0;
      this.bowTaken = true;
      this.x = user.x;
      this.y = user.y;
    } else if (d > 300 && !this.bowTaken){
      this.alphaL -= 20;
      this.alphaL = constrain(this.alpha, 0, 255);
    } else if (d < 300 && !this.bowTaken){
      this.alphaL += 20;
      this.alphaL = constrain(this.alphaL, 0, 255);
    }
  }

  display(user){
    // push();
    // //rotate with user (around bow coordinates)
    // translate(width/2, height/2);
    // angleMode(DEGREES);
    // rotate(user.bowRotate);
    // //bow
    // imageMode(CENTER);
    // tint(this.color, this.color, this.color, this.alpha);
    // image(this.imageBow, this.x, this.y, this.size, this.size);
    // pop();
    // push();
    // //rotate with user (around arrow coordinates)
    // translate(this.arrowX, this.arrowY);
    // angleMode(DEGREES);
    // rotate(user.bowRotate);
    // //arrow
    // imageMode(CENTER);
    // tint(this.color, this.color, this.color, this.arrowAlpha);
    // image(this.imageArrow, this.arrowX, this.arrowY, this.size, this.size);
    // pop();
    push();
    //bow left
    imageMode(CENTER);
    tint(this.color, this.color, this.color, this.alphaL);
    image(this.imageBowL, this.x, this.y, this.size, this.size);
    //bow right
    tint(this.color, this.color, this.color, this.alphaR);
    image(this.imageBowR, this.x, this.y, this.size, this.size);
    //bow up
    tint(this.color, this.color, this.color, this.alphaU);
    image(this.imageBowU, this.x, this.y, this.size, this.size);
    //bow down
    tint(this.color, this.color, this.color, this.alphaD);
    image(this.imageBowD, this.x, this.y, this.size, this.size);

    //arrowL
    imageMode(CENTER);
    tint(this.color, this.color, this.color, this.arrowAlphaL);
    image(this.imageArrowL, this.arrowX, this.arrowY, this.size, this.size);
    //arrow
    tint(this.color, this.color, this.color, this.arrowAlphaR);
    image(this.imageArrowR, this.arrowX, this.arrowY, this.size, this.size);
    //arrow
    tint(this.color, this.color, this.color, this.arrowAlphaU);
    image(this.imageArrowU, this.arrowX, this.arrowY, this.size, this.size);
    //arrow
    tint(this.color, this.color, this.color, this.arrowAlphaD);
    image(this.imageArrowD, this.arrowX, this.arrowY, this.size, this.size);
    pop();
  }
}
