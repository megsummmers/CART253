class Door {
  constructor(x, y, w, h, imgDoor){
    this.x = x;
    this.y = y;
    this.w = w; //51 big level, 28 for small
    this.h = h; //80 for big level, 44 for small
    this.alpha = 0;
    this.color = 255;
    this.image = imgDoor;
    //raycasting
    //line order is top, left, bottom, right
    //each line has 2 points
    this.type = "wall";
    this.boundary = [createVector(x, y), createVector(x + this.w, y), createVector(x, y), createVector(x, y + this.h), createVector(x, y + this.h), createVector(x + this.w, y + this.h),  createVector(x + this.w, y), createVector(x + this.w, y + this.h)];
  }

  display(){
    push();
    tint(this.color, this.color, this.color, this.alpha);
    image(imgCoin, this.x, this.y, this.size, this.size);
    pop();
  }
}
