class Wasp {

  // constructor() sets up our starting properties
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 80;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.jitteriness = 0.1;
    this.alive = true;
  }

  //----- BEE TOUCH/KILL -----
  beeCheck(bee) {
    let d = dist(this.x, this.y, bee.x, bee.y);
    if (d < this.size / 2 + bee.size /2) {
      bee.waspTouch();
    }
  }

  //---- MOVES BEES AROUND AT RANDOM -----
  move() {
    let r = random(0, 1);
    if (r < this.jitteriness) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, height/5, height);
  }

  display() {
    push();
    imageMode(CENTER);
    image(imgWasp, this.x, this.y, this.size, this.size);
    pop();
  }
}
