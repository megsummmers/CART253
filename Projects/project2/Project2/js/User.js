
class User {
   constructor(config) {
     this.x = config.x;
     this.y = config.y;
     this.vx = 0;
     this.vy = 0;
     this.w = config.w;
     this.h = config.h;
     this.speed = 4;
     this.color = 255;
     this.alphaL = 255;
     this.alphaR = 0;
     this.moved = false;
     this.avatar = "guy";
     this.hitLeft = false;
     this.hitRight = false;
     this.hitTop = false;
     this.hitBottom = false;
     this.imageGuyL = config.imageGuyL;
     this.imageGuyR = config.imageGuyR;
     this.imageGirlL = config.imageGirlL;
     this.imageGirlR = config.imageGirlR;
     this.imageThemL = config.imageThemL;
     this.imageThemR = config.imageThemR;
     this.bowRotate = 0;
   }

   //----- MOVES THE AVATAR -----
   //based on user input the avatar moves in the specified direction
   move() {
     if (keyIsDown(LEFT_ARROW) && !this.hitRight) {
     this.vx = -this.speed;
     //Changes to left facing avatar image
     this.alphaL = 255;
     this.alphaR = 0;
     this.moved = true;
     //changes bow rotation as well
     this.bowRotate = 0;
     }
     else if (keyIsDown(RIGHT_ARROW) && !this.hitLeft) {
       this.vx = this.speed;
       //Changes to right facing avatar image
       this.alphaR = 255;
       this.alphaL = 0;
       this.moved = true;
       //changes bow rotation as well
       this.bowRotate = 180;
     }
     else {
       this.vx = 0;
     }
     //up and down movements
     if (keyIsDown(UP_ARROW) && !this.hitBottom) {
       this.vy = -this.speed;
       this.moved = true;
     }
     else if (keyIsDown(DOWN_ARROW) && !this.hitTop) {
       this.vy = this.speed;
       this.moved = true;
     }
     else {
       this.vy = 0;
     }

     this.x += this.vx;
     this.y += this.vy;

     this.x = constrain(this.x, 5, width - 40);
     this.y = constrain(this.y, 5, height - 40);
   }

   display() {
     //----- DISPLAYS THE USER/AVATAR -----
     //based on which avatar is chosen in the title sequence
     if (this.avatar === "guy"){
       push();
       tint(255, 255, 255, user.alphaL);
       image(this.imageGuyL, this.x, this.y, this.w, this.h);
       tint(255, 255, 255, this.alphaR);
       image(this.imageGuyR, this.x, this.y, this.w, this.h);
       pop();
     } else if (this.avatar === "girl"){
       push();
       tint(255, 255, 255, this.alphaL);
       image(this.imageGirlL, this.x, this.y, this.w, this.h);
       tint(255, 255, 255, this.alphaR);
       image(this.imageGirlR, this.x, this.y, this.w, this.h);
       pop();
     } else if (this.avatar === "non-binary"){
       push();
       tint(255, 255, 255, this.alphaL);
       image(this.imageThemL, this.x, this.y, this.w, this.h);
       tint(255, 255, 255, this.alphaR);
       image(this.imageThemR, this.x, this.y, this.w, this.h);
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
    //if the user gets close to the coins it will dissapear
    if(!coin.taken){
      let cD = dist(this.x + this.w/2, this.y + this.h/2, coin.x + coin.size/2, coin.y + coin.size/2);
      if (cD <= 40){
        coin.alpha = 0;
        coin.sound.play();
        coin.coinCounted = false;
        coin.taken = true;
      }
    }
  }

  spiderProximity(spider){
    //added half of their width and height to move the point of reference to the Center
    //this is due to the images not being centered for raycasting
    let sD = dist(this.x + this.w/2, this.y + this.h/2, spider.x + spider.size/2, spider.y + spider.size/2);
    if (sD <= 50 && !spider.killed){
      //returns 6 to confirm user is dead
      return 6;
    } else if (sD > 200 && !spider.killed) {
      //returns 0 to confirm user is NOT dead
      return 0;
    }
  }

  weaponProximity(weapon){
    //if the user gets close to the weapon it dissapears
    //the user can then shoot arrows
    if(!weapon.taken){
      let wD = dist(this.x + this.w/2, this.y + this.h/2, weapon.x + weapon.size/2, weapon.y + weapon.size/2);
      if (wD <= 50){
        weapon.alpha = 0;
        weapon.taken = true;
      }
    }
  }
}
