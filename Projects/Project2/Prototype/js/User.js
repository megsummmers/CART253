
class User {
   constructor(config) {
     this.x = config.x;
     this.y = config.y;
     this.vx = 0;
     this.vy = 0;
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
     this.vx = -this.speed;
     //Changes to left facing avatar image
     this.alphaL = 255;
     this.alphaR = 0;
   }
   else if (keyIsDown(RIGHT_ARROW) && !this.hitLeft) {
     this.vx = this.speed;
     //Changes to right facing avatar image
     this.alphaR = 255;
     this.alphaL = 0;
   }
   else {
     this.vx = 0;
   }

   if (keyIsDown(UP_ARROW) && !this.hitBottom) {
     this.vy = -this.speed;
   }
   else if (keyIsDown(DOWN_ARROW) && !this.hitTop) {
     this.vy = this.speed;
   }
   else {
     this.vy = 0;
   }

   this.x += this.vx;
   this.y += this.vy;

   this.x = constrain(this.x, 20, width - 20);
   this.y = constrain(this.y, 20, height - 20);
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
     //check for overlap
     if (this.x + this.w > wall.x &&
      this.x < wall.x + wall.w &&
      this.y + this.h > wall.y &&
      this.y < wall.y + wall.h
    ) {
      //change velocity so the player can't move
      this.x -= this.vx;
      this.y -= this.vy;
      }
  }

  coinProximity(coin){
    if(!coin.coinTaken){
      let cD = dist(this.x, this.y, coin.x, coin.y);
      if (cD <= 50){
        coin.alpha = 0;
        coin.sound.play();
        coin.coinCounted = false;
        coin.coinTaken = true;
      }
    }
  }

  spiderProximity(spider){
    let sD = dist(this.x, this.y, spider.x, spider.y);
    if (sD <= 50 && !spider.killed){
      spider.alpha = 0;
      return 6;
    }
  }

  weaponProximity(weapon){
    if(!weapon.bowTaken){
      let wD = dist(this.x, this.y, weapon.x, weapon.y);
      if (wD <= 50){
        weapon.alpha = 0;
        weapon.bowTaken = true;
      }
    }
  }
}
