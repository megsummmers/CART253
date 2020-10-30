class Bee {

  // constructor() sets up our starting properties
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 75;
    this.minSize = 10;
    this.maxSize = 40;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.shrinkRate = 4;
    this.growthRate = 0.1;
    this.jitteriness = 0.1;
    this.alive = true;
  }

  //----- FLOWER TOUCH CHECK -----
  pollinationCheck(flower) {
    let d = dist(this.x, this.y, flower.x, flower.y);
    if (d < this.size / 2 + flower.size /2) {
      flower.beeGrowth();
    }
  }

  //----- WASP TOUCH CHECK -----
  waspTouch() {
    //----- BEE SHRINKAGE -----
    this.size = this.size - this.shrinkRate;
    //----- BEE IS D E A D -----
    if (this.size <= 0) {
      this.alive = false;
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
    image(imgBee, this.x, this.y, this.size, this.size);
    pop();
  }
}
