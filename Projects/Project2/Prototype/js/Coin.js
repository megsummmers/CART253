class Coin {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = 50;
    this.alpha = 0;
    this.color = 255;
    this.coinTaken = false;
    this.coinCount = 0;
  }

  display(){
    push();
    tint(this.r, this.g, this.b, this.alpha);
    image(imgCoin, this.x, this.y, this.size, this.size);
    pop();
  }
}
