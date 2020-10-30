class User {

  // constructor() sets up our starting properties
  constructor({
    x,
    y,
    size,
    speed,
    color,
    alphaL,
    alphaR,
    alphaSL,
    alphaSR,
    hit
  }) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.color = color;
    this.alphaL = alphaL;
    this.alphaR = alphaR;
    this.alphaSL = alphaSL;
    this.alphaSR = alphaSR;
    this.hit = hit;
    this.playerSide = 'Left';
  }

  //----- FLOWER PROX GROW -----
  waterFlowers(flower) {
    let d = dist(this.x, this.y, flower.x, flower.y);
    if (d < this.size / 2 + flower.size / 2) {
      flower.userGrowth();
    }
  }

  //----- WASP TOUCH/STOP -----
  waspCheck(wasp) {
    let d = dist(this.x, this.y, wasp.x, wasp.y);
    if (d < this.size / 2 + wasp.size /2 && !this.hit) {
      if(this.playerSide === 'Left'){
        this.alphaL = 0;
        this.alphaR = 0;
        this.alphaSL = 255;
        this.alphaSR = 0;
      } else if (this.playerSide === 'Right'){
        this.alphaL = 0;
        this.alphaR = 0;
        this.alphaSL = 0;
        this.alphaSR = 255;
      }
      this.hit = true;
      setTimeout(this.hitReset.bind(this), 1500);
    }
  }

  //----- WASP RESET -----
  hitReset() {
    this.hit = false;
    this.alphaSL = 0;
    this.alphaSR = 0;
    if(this.playerSide === 'Left'){
      this.alphaL = 255;
    } else if(this.playerSide === 'Right'){
      this.alphaR = 255;
    }
  }

  move() {
    //----- MOVE USER -----
    if (keyIsDown(UP_ARROW) && !this.hit){
      this.y = this.y - this.speed;
      this.y = constrain(this.y, 50, height);
      if(this.playerSide === 'Left'){
        this.alphaL = 255;
        this.alphaR = 0;
      } else if(this.playerSide === 'Right'){
        this.alphaR = 255;
        this.alphaL = 0;
      }
    } else if (keyIsDown(DOWN_ARROW) && !this.hit){
      this.y = this.y + this.speed;
      this.y = constrain(this.y, 50, height);
      if(this.playerSide === 'Left'){
        this.alphaL = 255;
        this.alphaR = 0;
      } else if(this.playerSide === 'Right'){
        this.alphaR = 255;
        this.alphaL = 0;
      }
    } else if (keyIsDown(LEFT_ARROW) && !this.hit){
      this.x = this.x - this.speed;
      this.x = constrain(this.x, 50, width - 50);
      //USER SIDE CHANGE
      this.playerSide = 'Left';
      this.alphaL = 255;
      this.alphaR = 0;
    } else if (keyIsDown(RIGHT_ARROW) && !this.hit){
      this.x = this.x + this.speed;
      this.x = constrain(this.x, 50, width - 50);
      //USER SIDE CHANGE
      this.playerSide = 'Right';
      this.alphaL = 0;
      this.alphaR = 255;
    }
  }

  display() {
    push();
    imageMode(CENTER);
    tint(this.color, this.color, this.color, this.alphaL);
    image(imgGardenerL, this.x, this.y, this.size, this.size);
    tint(this.color, this.color, this.color, this.alphaR);
    image(imgGardenerR, this.x, this.y, this.size, this.size);
    tint(this.color, this.color, this.color, this.alphaSL);
    image(imgStunL, this.x, this.y, this.size, this.size);
    tint(this.color, this.color, this.color, this.alphaSR);
    image(imgStunR, this.x, this.y, this.size, this.size);
    pop();
  }
}
