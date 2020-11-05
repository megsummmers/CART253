class Coin {
  constructor(x, y, imgCoin){
    this.x = x;
    this.y = y;
    this.size = 50;
    this.alpha = 255;
    this.color = 255;
    this.coinTaken = false;
    this.coinCount = 0;
    this.image = imgCoin;
  }

  display(){
    push();
    tint(this.color, this.color, this.color, this.alpha);
    image(imgCoin, this.x, this.y, this.size, this.size);
    pop();
  }
}
