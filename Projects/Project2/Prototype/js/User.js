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
     this.rectSide = 'none';
     this.hit = 'none';
     this.imageGuyL = config.imageGuyL;
     this.imageGuyR = config.imageGuyR;
     this.imageGirlL = config.imageGirlL;
     this.imageGirlR = config.imageGirlR;
   }

   //----- MOVE THE USER -----
   move() {
      if (keyIsDown(LEFT_ARROW) && this.hit != 'right') {
        this.x = this.x - this.speed;
        this.x = constrain(this.x, 50, width - 50);
        //----- CHARACTER FLIP -----
        this.alphaL = 255;
        this.alphaR = 0;
      } else if (keyIsDown(RIGHT_ARROW) && this.hit != 'left') {
        this.x = this.x + this.speed;
        this.x = constrain(this.x, 50, width - 50);
        //----- CHARACTER FLIP -----
        this.alphaR = 255;
        this.alphaL = 0;
      } if (keyIsDown(UP_ARROW) && this.hit != 'bottom') {
         this.y = this.y - this.speed;
         this.y = constrain(this.y, 50, height - 50);
       } else if (keyIsDown(DOWN_ARROW) && this.hit != 'top') {
         this.y = this.y + this.speed;
         this.y = constrain(this.y, 50, height - 50);
       }
   }

   display() {
     //----- USER SETUP -----
     if(this.avatar === "guy"){
       push();
       imageMode(CENTER);
       tint(255, 255, 255, user.alphaL);
       image(this.imageGuyL, this.x, this.y, this.w, this.h);
       tint(255, 255, 255, this.alphaR);
       image(this.imageGuyR, this.x, this.y, this.w, this.h);
       pop();

     } else if (this.avatar === "girl"){
       push();
       imageMode(CENTER);
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

     //change to poitn/rect dist
     this.d = dist(this.x + this.w/2, this.y + this.h/2, wall.x + wall.w/2, wall.y + wall.h/2);
     if(this.d <= wall.w/2 || this.d <= wall.h/2) {
       wall.r = 255;
       if(this.rectSide === 'left'){
         this.hit = 'left';
       } else if(this.rectSide === 'right'){
         this.hit = 'right';
       } else if(this.rectSide === 'top'){
         this.hit = 'top';
       } else if(this.rectSide === 'bottom'){
         this.hit = 'bottom';
       }
     } else {
       this.hit = 'none';
     }

     console.log(this.hit, this.rectSide);
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

// console.log(this.rectSide, this.distance, this.r);
