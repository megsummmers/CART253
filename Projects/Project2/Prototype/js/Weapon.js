class Bow {
  constructor(x, y, imgWeapon, imgArrowL, imgArrowR){
    this.x = x;
    this.y = y;
    this.arrowX = 0;
    this.arrowY = 0;
    this.alpha = 0;
    this.alphaArrowL = 0;
    this.alphaArrowR = 0;
    this.arrowSpeed = 40;
    this.size = 50;
    this.color = 255;
    this.bowTaken = false;
    this.arrows = 3;
    this.image = imgWeapon;
    this.imageArrowL = imgArrowL;
    this.imageArrowR = imgArrowR;
    this.hit = false;
  }

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
