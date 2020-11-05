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
  }

  display(){
    push();
    fill(this.r, this.g, this.b, this.alpha);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
