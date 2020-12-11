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
    this.type = "enemy";
    this.boundary = [createVector(x, y), createVector(x + this.size, y), createVector(x, y), createVector(x, y + this.size), createVector(x, y + this.size), createVector(x + this.size, y + this.size),  createVector(x + this.size, y), createVector(x + this.size, y + this.size)];
  }

  move(){
    //moves spiders in their set path
    if(!this.killed){
      if(this.movement === "horizontal"){
        this.x = this.x + this.speed;
        //spiders will move to either start or end of their path
        //depending on which they last touched
        if(this.x >= this.pathEnd ) {
          this.speed = -this.speed;
        } else if(this.x < this.pathStart){
          this.speed = -this.speed;
        }
        //same as horizontal but the Y coords move instead
      } else if (this.movement === "vertical"){
        this.y = this.y + this.speed;
        if(this.y >= this.pathEnd ) {
          this.speed = -this.speed;
        } else if(this.y < this.pathStart){
          this.speed = -this.speed;
        }
      }
      //updates boudary after spiders move
      this.boundary = [createVector(this.x, this.y), createVector(this.x + this.size, this.y), createVector(this.x, this.y), createVector(this.x, this.y + this.size), createVector(this.x, this.y + this.size), createVector(this.x + this.size, this.y + this.size),  createVector(this.x + this.size, this.y), createVector(this.x + this.size, this.y + this.size)];
    }
  }
  //Displays spider image
  display(){
    push();
    tint(this.color, this.color, this.color, this.alpha);
    image(imgSpider, this.x, this.y, this.size, this.size);
    pop();
  }
}
