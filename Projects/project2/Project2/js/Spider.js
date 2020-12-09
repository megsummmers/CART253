class Spider {
  constructor(x, y, size, pathStart, pathEnd, movement, speed, imgSpider){
    this.x = x;
    this.y = y;
    this.pathStart = pathStart;
    this.pathEnd = pathEnd;
    this.speed = speed;
    this.size = size;
    this.alpha = 0;
    this.color = 255;
    this.image = imgSpider;
    this.killed = false;
    this.movement = movement;
    //raycasting
    //line order is top, left, bottom, right
    //each line has 2 points
    this.boundary = [createVector(x, y), createVector(x + this.size, y), createVector(x, y), createVector(x, y + this.size), createVector(x, y + this.size), createVector(x + this.size, y + this.size),  createVector(x + this.size, y), createVector(x + this.size, y + this.size)];
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
    //was there a spcific reason for image center
    tint(this.color, this.color, this.color, this.alpha);
    image(imgSpider, this.x, this.y, this.size, this.size);
    pop();
  }
}
