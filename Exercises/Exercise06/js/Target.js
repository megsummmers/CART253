class Target {
  constructor(x, y, speed, r, g, b){
    this.x = x;
    this.y = y;
    this.size = 150;
    this.color = {
      r: r,
      g: g,
      b: b,
      w: 255
    };
    this.alpha = 255;
    this.speed = speed;
    this.targetHit = false;
    //Synth
    this.synth = new p5.PolySynth();
  }

  move(){
    this.x += this.speed;
    this.x = constrain(this.x, -150, 1150);
  }

  proximity(user){
    let d = dist(this.x, this.y, user.x, user.y);
    //alpha proximity
    if (d > 400 && !this.targetHit){
      this.alpha -= 20;
      this.alpha = constrain(this.alpha, 0, 255);
    } else if (d < 400 && !this.targetHit){
      this.alpha += 20;
      this.alpha = constrain(this.alpha, 0, 255);
    }
  }

  playNote(note){
    this.synth.play(note, 0.4, 0, 0.1);
  }

  display(){
    push();
    fill(this.color.r, this.color.g, this.color.b, this.alpha);
    ellipse(this.x, this.y, this.size);
    fill(this.color.w, this.color.w, this.color.w, this.alpha);
    ellipse(this.x, this.y, this.size/1.5);
    fill(this.color.r, this.color.g, this.color.b, this.alpha);
    ellipse(this.x, this.y, this.size/3);
    pop();
  }
}
