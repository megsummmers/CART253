class Ball {
  constructor(x, y, note) {
    this.x = x;
    this.y = y;
    this.size = 75;
    this.speed = 10;
    this.vx = random(-this.speed, this.speed);
    this.vy = random(-this.speed, this.speed);
    this.color = 255;
    this.alpha = 100;
    //oscillator
    this.oscillator = new p5.Oscillator();
    this.nearFreq = 220;
    this.farFreq = 440;
    this.oscillator.amp(0.015);
    this.oscillator.start();
    //synth
    this.note = note;
    this.synth = new p5.PolySynth();
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    let d = dist(this.x, this.y, width/2, height/2);
    let maxDist = dist(0, 0, width, height);
    let newFreq = map(d, 0, maxDist, this.nearFreq, this.farFreq);
    this.oscillator.freq(newFreq);
  }

  playNote(){
    this.synth.play(this.note, 0.4, 0, 0.1);
  }

  bounce(){
    if(this.x < 25 || this.x > width - 25){
      this.vx = -this.vx;
      this.playNote();
    }
    if(this.y < 25 || this.y > height - 25){
      this.vy = -this.vy;
      this.playNote();
    }
  }

  display(){
    push();
    fill(this.color, this.color, this.color, this.alpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
