class Bow {
  constructor(x, y, size, imgWeapon, imgArrowL, imgArrowR){
    this.x = x;
    this.y = y;
    this.arrowX = 0;
    this.arrowY = 0;
    this.alpha = 0;
    this.alphaArrowL = 0;
    this.alphaArrowR = 0;
    this.arrowSpeed = 40;
    this.size = size;
    this.color = 255;
    this.taken = false;
    this.arrows = 3;
    this.image = imgWeapon;
    this.imageArrowL = imgArrowL;
    this.imageArrowR = imgArrowR;
    this.hit = false;
    //raycasting
    //line order is top, left, bottom, right
    //each line has 2 points
    this.type = "obj";
    this.boundary = [createVector(x, y), createVector(x + size, y), createVector(x, y), createVector(x, y + size), createVector(x, y + size), createVector(x + size, y + size),  createVector(x + size, y), createVector(x + size, y + size)];
  }
//----- DISPLAYS THE WEAPON ------
  display(){
    push();
    tint(this.color, this.color, this.color, this.alpha);
    image(imgWeapon, this.x, this.y, this.size, this.size);
    tint(this.color, this.color, this.color, this.alphaArrowL);
    image(imgArrowL, this.arrowX, this.arrowY, this.size, this.size);
    tint(this.color, this.color, this.color, this.alphaArrowR);
    image(imgArrowR, this.arrowX, this.arrowY, this.size, this.size);
    pop();
  }
}
