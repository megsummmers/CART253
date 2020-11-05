class User {
   constructor(config) {
     this.x = config.x;
     this.y = config.y;
     this.w = config.w;
     this.h = config.h;
     this.speed = 5;
     this.color = 255;
     this.alphaL = 255;
     this.alphaR = 0;
     this.avatar = "guy";
     this.hitLeft = false;
     this.hitRight = false;
     this.hitTop = false;
     this.hitBottom = false;
     this.imageGuyL = config.imageGuyL;
     this.imageGuyR = config.imageGuyR;
     this.imageGirlL = config.imageGirlL;
     this.imageGirlR = config.imageGirlR;
   }

   //----- MOVE THE USER -----
   move() {
      if (keyIsDown(LEFT_ARROW) && !this.hitRight) {
        this.x = this.x - this.speed;
        this.x = constrain(this.x, 20, width - 20);
        //----- CHARACTER FLIP -----
        this.alphaL = 255;
        this.alphaR = 0;
      } else if (keyIsDown(RIGHT_ARROW) && !this.hitLeft) {
        this.x = this.x + this.speed;
        this.x = constrain(this.x, 20, width - 20);
        //----- CHARACTER FLIP -----
        this.alphaR = 255;
        this.alphaL = 0;
      } if (keyIsDown(UP_ARROW) && !this.hitBottom) {
         this.y = this.y - this.speed;
         this.y = constrain(this.y, 20, height - 20);
       } else if (keyIsDown(DOWN_ARROW) && !this.hitTop) {
         this.y = this.y + this.speed;
         this.y = constrain(this.y, 20, height - 20);
       }
   }

   display() {
     //----- USER SETUP -----
     if(this.avatar === "guy"){
       push();
       //imageMode(CENTER);
       tint(255, 255, 255, user.alphaL);
       image(this.imageGuyL, this.x, this.y, this.w, this.h);
       tint(255, 255, 255, this.alphaR);
       image(this.imageGuyR, this.x, this.y, this.w, this.h);
       pop();

     } else if (this.avatar === "girl"){
       push();
       //imageMode(CENTER);
       tint(255, 255, 255, this.alphaL);
       image(this.imageGirlL, this.x, this.y, this.size);
       tint(255, 255, 255, this.alphaR);
       image(this.imageGirlR, this.x, this.y, this.size);
       pop();
     }
   }

    //----- Female or male avatar -----
    // avatarChoice(choice) {
    //   if(choice === "Girl"){
    //     this.avater = "Girl";
    //   }
    // }

   //----- WALL COLLISION DETECTION -----
   collisionDetect(wall){
     //Find out which side is closest
     if (this.x < wall.x){ //test for left side of rect
       this.rectSide = 'left';
     } else if (this.x > wall.x + wall.w){ //else it's right side of rect
       this.rectSide = 'right';
     } if (this.y < wall.y){ //test for the top side of the rect
       this.rectSide = 'top';
     } else if (this.y > wall.y + wall.h){ //else it's the bottom
       this.rectSide = 'bottom';
     }

     //check for overlap in walls
     if(this.x + this.w > wall.x &&
        this.x < wall.x + wall.w &&
        this.y + this.h > wall.y &&
        this.y < wall.y + wall.h
      ){
        //if there is overlap set hit to which side the overlap is on
       wall.r = 255;
       if(this.rectSide === 'left'){
         this.hitLeft = true;
       } else if(this.rectSide === 'right'){
         this.hitRight = true;
       } else if(this.rectSide === 'top'){
         this.hitTop = true;
       } else if(this.rectSide === 'bottom'){
         this.hitBottom = true;
       }
     } else {
       //no overlap, sets hit to none
       this.hit = 'none';
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
