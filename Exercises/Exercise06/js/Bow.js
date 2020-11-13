class Bow {
  constructor(x, y, bowImage, arrowL, arrowR, arrowU, arrowD){
    this.x = x;
    this.y = y;
    this.size = 100;
    this.color = 255;
    this.alpha = 0;
    this.bowTaken = false;
    //images
    this.imageBow = bowImage;
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
    this.oscillator = new p5.Oscillator();
    this.nearFreq = 450;
    this.farFreq = 200;
    this.oscillator.amp(0.025);
    this.oscillator.start();
  }

  proximity(user){
    let d = dist(this.x, this.y, user.x, user.y);
    //oscillator
    if (!this.bowTaken){
      let maxDist = dist(0, 0, width, height);
      let newFreq = map(d, 0, maxDist, this.nearFreq, this.farFreq);
      this.oscillator.freq(newFreq);
    } else {
      this.oscillator.stop();
    }
    //alpha proximity
    if(d <= 25){
      this.alpha = 255;
      this.bowTaken = true;
      this.x = user.x;
      this.y = user.y;
    } else if (d > 300 && !this.bowTaken){
      this.alpha -= 20;
      this.alpha = constrain(this.alpha, 0, 255);
    } else if (d < 300 && !this.bowTaken){
      this.alpha += 20;
      this.alpha = constrain(this.alpha, 0, 255);
    }
  }

  arrowProximity(user, arrowHit){
    let d = dist(this.arrowX, this.arrowY, user.x, user.y);
    //oscillator
    if (!arrowHit){
      let maxDist = dist(0, 0, width, height);
      let newFreq = map(d, 0, maxDist, this.nearFreq, this.farFreq);
      this.oscillator.freq(newFreq);
    } else {
      this.oscillator.stop();
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
    //bow
    imageMode(CENTER);
    tint(this.color, this.color, this.color, this.alpha);
    image(this.imageBow, this.x, this.y, this.size, this.size);

    //arrowL
    imageMode(CENTER);
    tint(this.color, this.color, this.color, this.arrowAlphaL);
    image(this.imageArrowL, this.arrowX, this.arrowY, this.size, this.size);
    //arrow
    imageMode(CENTER);
    tint(this.color, this.color, this.color, this.arrowAlphaR);
    image(this.imageArrowR, this.arrowX, this.arrowY, this.size, this.size);
    //arrow
    imageMode(CENTER);
    tint(this.color, this.color, this.color, this.arrowAlphaU);
    image(this.imageArrowU, this.arrowX, this.arrowY, this.size, this.size);
    //arrow
    imageMode(CENTER);
    tint(this.color, this.color, this.color, this.arrowAlphaD);
    image(this.imageArrowD, this.arrowX, this.arrowY, this.size, this.size);
    pop();
  }
}
