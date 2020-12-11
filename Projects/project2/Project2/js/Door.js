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
    this.boundary = [createVector(x, y), createVector(x + w, y), createVector(x, y), createVector(x, y + h), createVector(x, y + h), createVector(x + w, y + h),  createVector(x + w, y), createVector(x + w, y + h)];
  }
//----- DISPLAYS THE DOORS -----
  display(){
    push();
    tint(this.color, this.color, this.color, this.alpha);
    image(this.image, this.x, this.y, this.w, this.h);
    pop();
  }
}
