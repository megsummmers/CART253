class Coin {
  constructor(x, y, size, imgCoin, coinPickup){
    this.x = x;
    this.y = y;
    this.size = size;
    this.alpha = 0;
    this.color = 255;
    this.taken = false;
    this.coinCounted = false;
    this.image = imgCoin;
    this.sound = coinPickup
    //raycasting
    //line order is top, left, bottom, right
    //each line has 2 points
    this.type = "obj";
    this.boundary = [createVector(x, y), createVector(x + this.size, y), createVector(x, y), createVector(x, y + this.size), createVector(x, y + this.size), createVector(x + this.size, y + this.size),  createVector(x + this.size, y), createVector(x + this.size, y + this.size)];
  }

//displays the coin
  display(){
    push();
    tint(this.color, this.color, this.color, this.alpha);
    image(imgCoin, this.x, this.y, this.size, this.size);
    pop();
  }
}
