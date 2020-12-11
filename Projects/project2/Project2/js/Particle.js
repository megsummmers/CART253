//Center point of RAYCASTING
//creates rays and goes through all entities to see if they
//are touched by the rays
class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    for (let a = 0; a < 360; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  //updates particle's position to user's current position
  update(x, y) {
    this.pos.set(x + 15, y +15);
  }

  //----- RAYCASTING -----
  //raycasting setup for all the entities
  //Determines wether an entity can be seen or not
  //based on the rays emitted from the user's torch
  raycast(entities) {
    //reset all alpha's to 0
    for (let entity of entities) {
      entity.alpha = 0;
    }
    //Repeat for each ray
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      let hit = null;
      let type = null;
      //repeat for each individual entity of the array
      for (let entity of entities) {
        //check all 4 walls of entity
        //2 point per wall, so for loop caps at 8
        for (let j = 0; j < 7; j++){
          const pt = ray.intersectCheck(entity.boundary[j], entity.boundary[j+1]);
          //TYPE WALL: non interactable entities (Doors + Walls)
          if (pt && entity.type === "wall") {
            const d = p5.Vector.dist(this.pos, pt);
            //if the entity has a poitn of intersection
            //determine the point and set to record and closest
            if (d < record) {
              record = d;
              closest = pt;
              hit = entity;
              type = "wall";
            }
          //TYPE OBJECT: interactable entities (Coins + Bow)
          } else if (pt && entity.type === "obj") {
            const d = p5.Vector.dist(this.pos, pt);
            if(entity.taken){
              entity.alpha = 0;
            } else if (d < record) {
              hit = entity;
              type = "obj";
            }
          //TYPE: ENEMY: moving interactable entity (Spiders)
          //different due to their kill variable
          } else if (pt && entity.type === "enemy") {
            const d = p5.Vector.dist(this.pos, pt);
            if(entity.killed){
              entity.alpha = 0;
            } else if (d < record) {
              hit = entity;
              type = "enemy";
            }
          }
          j++;
        }
      }
      //displays rays and any entity that is touched by a ray
      if (closest && type === "wall") {
        stroke(247, 189, 119, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
        hit.alpha = 255;
      } else if (closest){
        //display for objects the ray goes through
        //Aka they don't create a shadow due to transparent background
        stroke(247, 189, 119, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
        hit.alpha = 255;
      }
    }
  }
}
