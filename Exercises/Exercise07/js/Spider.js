class Spider {
  constructor(x, y, pathStart, pathEnd, movement, speed, imgSpider){
    this.x = x;
    this.y = y;
    this.pathStart = pathStart;
    this.pathEnd = pathEnd;
    this.speed = speed;
    this.size = 50;
    this.alpha = 0;
    this.color = 255;
    this.image = imgSpider;
    this.killed = false;
    this.movement = movement;
  }

  move(){
    if(!this.killed){
      if(this.movement === "horizontal"){
        this.x = this.x + this.speed;
        if(this.x >= this.pathEnd ) {
          this.speed = -this.speed;
        } else if(this.x < this.pathStart){
          this.speed = -this.speed;
        }
      } else if (this.movement === "vertical"){
        this.y = this.y + this.speed;
        if(this.y >= this.pathEnd ) {
          this.speed = -this.speed;
        } else if(this.y < this.pathStart){
          this.speed = -this.speed;
        }
      }
    }
  }

  display(){
    push();
    imageMode(CENTER);
    tint(this.color, this.color, this.color, this.alpha);
    image(imgSpider, this.x, this.y, this.size, this.size);
    pop();
  }
}
