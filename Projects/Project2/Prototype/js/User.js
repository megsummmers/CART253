class User {
   constructor(config) {
     this.x = config.x;
     this.y = config.y;
     this.w = config.w;
     this.h = config.h;
     this.r = this.size /2;
     this.speed = 5;
     this.color = 255;
     this.alphaL = 255;
     this.alphaR = 0;
     this.avatar = "guy";
     this.rectSide = 'none';
     this.wallCollision = false;
     this.imageGuyL = config.imageGuyL;
     this.imageGuyR = config.imageGuyR;
     this.imageGirlL = config.imageGirlL;
     this.imageGirlR = config.imageGirlR;
   }

   //----- MOVE THE USER -----
   move() {
      if (keyIsDown(LEFT_ARROW) && this.rectSide != 'right') {
        this.x = this.x - this.speed;
        this.x = constrain(this.x, 50, width - 50);
        //----- CHARACTER FLIP -----
        this.alphaL = 255;
        this.alphaR = 0;
      } else if (keyIsDown(RIGHT_ARROW) && this.rectSide != 'left') {
        this.x = this.x + this.speed;
        this.x = constrain(this.x, 50, width - 50);
        //----- CHARACTER FLIP -----
        this.alphaR = 255;
        this.alphaL = 0;
      } if (keyIsDown(UP_ARROW) && this.rectSide != 'bottom') {
         this.y = this.y - this.speed;
         this.y = constrain(this.y, 50, height - 50);
       } else if (keyIsDown(DOWN_ARROW) && this.rectSide != 'top') {
         this.y = this.y + this.speed;
         this.y = constrain(this.y, 50, height - 50);
       }
       console.log(this.rectSide, this.wallCollision);
   }

   display() {
     //----- USER SETUP -----
     if(this.avatar === "guy"){
       push();
       tint(255, 255, 255, user.alphaL);
       image(this.imageGuyL, this.x, this.y, this.size);
       tint(255, 255, 255, this.alphaR);
       image(this.imageGuyR, this.x, this.y, this.size);
       pop();

     } else if (this.avatar === "girl"){
       push();
       tint(255, 255, 255, this.alphaL);
       image(this.imageGirlL, this.x, this.y, this.size);
       tint(255, 255, 255, this.alphaR);
       image(this.imageGirlR, this.x, this.y, this.size);
       pop();
     }
     // push();
     // rectMode(CENTER);
     // fill(this.color);
     // rect(this.x, this.y, this.w);
     // pop();
   }

    //----- Female or male avatar -----
    // avatarChoice(choice) {
    //   if(choice === "Girl"){
    //     this.avater = "Girl";
    //   }
    // }

   //----- WALL COLLISION DETECTION -----
   collisionDetect(wall){
    //tester variables
    this.testX = this.x;
    this.testY = this.y;
    console.log(wall.x, wall.y, this.y, this.testY);

    if (this.x < wall.x){ //test for left side of rect
      this.testX = wall.x;
      this.rectSide = 'left';
    } else if (this.x > wall.x+wall.w){ //else it's right side of rect
      this.testX = wall.x + wall.w;
      this.rectSide = 'right';
    } if (this.y < wall.y){ //test for the top side of the rect
      this.testY = wall.y;
      this.rectSide = 'top';
    } else if (this.y > wall.y+wall.h){ //else it's the bottom
      this.testY = wall.y + wall.h;
      this.rectSide = 'bottom';
    }

    this.distX = this.x-this.testX;
    this.distY = this.y-this.testY;
    this.distance = sqrt( (this.distX*this.distX) + (this.distY*this.distY) );

    if (this.distance <= this.r) { //if the distance is less then the radius
      this.wallCollision = true;
    }
  }

  coinProximity(coin){
    if(!coin.coinTaken){
      let cD = dist(this.x, this.y, coin.x, coin.y);
      if (d <= 50){
        coin.alpha = 0;
        coin.coinCount = coin.coinCount + 1;
        coin.coinTaken = true;
      } else if (d > 300) {
        coin.alpha -= 20;
        coin.alpha = constrain(coin.alpha, 0, 255);
      } else if (d < 300) {
        coin.alpha += 20;
        coin.alpha = constrain(coin.alpha, 0, 255);
      }
    }
  }

  spiderProximity(spider){
    let sD = dist(this.x, this.y, spider.x, spider.y);
    if (d <= 50){
      spider.alpha = 0;
      return 6;
    } else if (d > 300) {
      spider.alpha -= 20;
      spider.alpha = constrain(spider.alpha, 0, 255);
      return 0;
    } else if (d < 300) {
      spider.alpha += 20;
      spider.alpha = constrain(spider.alpha, 0, 255);
      return 0;
    }
  }
}
