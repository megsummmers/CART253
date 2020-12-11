class Wall {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = 5;
    this.g = 5;
    this.b = 5;
    this.alpha = 255;
    //raycasting
    //line order is top, left, bottom, right
    //each line has 2 points
    this.type = "wall";
    this.boundary = [createVector(x, y), createVector(x + w, y), createVector(x, y), createVector(x, y + h), createVector(x, y + h), createVector(x + w, y + h),  createVector(x + w, y), createVector(x + w, y + h)];
  }
//----- DISPLAYS THE WALLS -----
  display(){
    push();
    noStroke();
    fill(this.r, this.g, this.b, this.alpha);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
