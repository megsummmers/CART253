class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    for (let a = 0; a < 360; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  update(x, y) {
    this.pos.set(x, y);
  }

  //raycasting for things that create shadows/ user doesn't interact with
  raycast(walls) {
    for (let wall of walls) {
      wall.alpha = 0;
    }
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      let hit = null;
      let type = null;
      for (let wall of walls) {
        for (let j = 0; j < 7; j++){
          const pt = ray.intersectCheck(wall.boundary[j], wall.boundary[j+1]);
          if (pt && wall.type === "wall") {
            const d = p5.Vector.dist(this.pos, pt);
            if (d < record) {
              record = d;
              closest = pt;
              hit = wall;
            }
            type = "wall";
          } else if (pt && wall.type === "obj") {
            const d = p5.Vector.dist(this.pos, pt);
            if(wall.taken){
              wall.alpha = 0;
            } else if (d < record) {
              hit = wall;
            }
            type = "obj";
          }
          j++;
        }
      }
      if (closest && type === "wall") {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
        hit.alpha = 255;
      } else if (closest){
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
        hit.alpha = 255;
      }
    }
  }
}
