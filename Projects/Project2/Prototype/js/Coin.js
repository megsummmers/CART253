class Coin {
  constructor(x, y, imgCoin, coinPickup){
    this.x = x;
    this.y = y;
    this.size = 50;
    this.alpha = 0;
    this.color = 255;
    this.coinTaken = false;
    this.coinCounted = false;
    this.image = imgCoin;
    this.sound = coinPickup
    //raycasting
    this.boundary = [createVector(x, y), createVector(x + this.size, y), createVector(x, y), createVector(x, y + this.size), createVector(x, y + this.size), createVector(x + this.size, y + this.size),  createVector(x + this.size, y), createVector(x + this.size, y + this.size)];
  }

  display(){
    push();
    tint(this.color, this.color, this.color, this.alpha);
    image(imgCoin, this.x, this.y, this.size, this.size);
    pop();
  }
}
