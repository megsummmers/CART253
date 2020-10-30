class User {

  // constructor() sets up our starting properties
  constructor({
    x,
    y,
    size,
    speed,
    color,
    hit
  }) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.color = color;
    this.hit = hit;
  }

  waterFlowers(flower) {
    let d = dist(this.x, this.y, flower.x, flower.y);
    if (d < this.size / 2 + flower.size) {
      flower.userGrowth();
    }
  }

  //----- WASP TOUCH/STOP -----
  waspCheck(wasp) {
    let d = dist(this.x, this.y, wasp.x, wasp.y);
    if (d < this.size / 2 + wasp.size /2 && !this.hit) {
      //console.log("aaaaaaaa");
      this.hit = true;
      setTimeout(this.hitReset.bind(this), 1500);
    }
  }

  //----- WASP RESET -----
  hitReset() {
    this.hit = false;
  }

  move() {
    //----- MOVE USER -----
    if (keyIsDown(UP_ARROW) && !this.hit){
      this.y = this.y - this.speed;
      this.y = constrain(this.y, 50, height); 0
    } else if (keyIsDown(DOWN_ARROW) && !this.hit){
      this.y = this.y + this.speed;
      this.y = constrain(this.y, 50, height);
    } else if (keyIsDown(LEFT_ARROW) && !this.hit){
      this.x = this.x - this.speed;
      this.x = constrain(this.x, 50, width - 50);
    } else if (keyIsDown(RIGHT_ARROW) && !this.hit){
      this.x = this.x + this.speed;
      this.x = constrain(this.x, 50, width - 50);
    }
  }

  display() {
    //----- USER DISPLAY ----
    push();
    fill(this.color, this.color, this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
