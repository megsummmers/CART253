class User {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = 125;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.color = 255;
    this.bowRotate = "none";
  }

  move(){
    if (keyIsDown(LEFT_ARROW)){
      this.vx = -this.speed;
      this.bowRotate = 0;
    } else if (keyIsDown(RIGHT_ARROW)){
      this.vx = this.speed;
      this.bowRotate = 180;
    } else {
      this.vx = 0;
    }
    if (keyIsDown(UP_ARROW)){
      this.vy = -this.speed;
      this.bowRotate = 90;
    } else if (keyIsDown(DOWN_ARROW)){
      this.vy = this.speed;
      this.bowRotate = 270;
    } else {
      this.vy = 0;
    }

    this.x += this.vx;
    this.y += this.vy;

    this.x = constrain(this.x, 75, width -75);
    this.y = constrain(this.y, 75, height - 75);
  }

  display() {
    push();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
    pop();
  }
}
