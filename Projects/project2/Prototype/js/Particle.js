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

  look(walls) {
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      for (let wall of walls) {
        for (let j = 0; j < 7; j++){
          const pt = ray.checkforWall(wall.corners[j], wall.corners[j+1]);
          if (pt) {
            const d = p5.Vector.dist(this.pos, pt);
            if (d < record) {
              record = d;
              closest = pt;
            }
          }
          j++;
        }
      }
      if (closest) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }

  objectCollision(obj){
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let left = ray.checkforRect(obj.x, obj.y, obj.x, obj.y + obj.size);
      let right = ray.checkforRect(obj.x + obj.size, obj.y, obj.x + obj.size, obj.y + obj.size);
      let top = ray.checkforRect(obj.x, obj.y, obj.x + obj.size, obj.y);
      let bottom = ray.checkforRect(obj.x, obj.y + obj.size,  obj.x + obj.size, obj.y + obj.size);

      if(left || right || top || bottom){
        return true;
      }
      return false;
    }
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4);
    for (let ray of this.rays) {
      ray.show();
    }
  }
}
