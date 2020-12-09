class Wall {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = 25;
    this.g = 25;
    this.b = 25;
    this.alpha = 200;
    //raycasting
    //corner order is top, left, bottom, right
    this.boundary = [createVector(x, y), createVector(x + w, y), createVector(x, y), createVector(x, y + h), createVector(x, y + h), createVector(x + w, y + h),  createVector(x + w, y), createVector(x + w, y + h)];
  }

  display() {
    push();
    noStroke();
    fill(0, 0, 0, this.alpha);
    rect(this.x, this.y, this.w, this.h);
    // stroke(255, 255, 255, this.alpha);
    // line(this.x, this.y, this.x + this.w, this.y); //top line
    // line(this.x, this.y, this.x, this.y + this.h); //left line
    // line(this.x, this.y + this.h, this.x + this.w, this.y + this.h); //bottom line
    // line(this.x + this.w, this.y, this.x + this.w, this.y + this.h); //right line
    pop();
  }
}
