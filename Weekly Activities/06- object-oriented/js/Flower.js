class Flower {
    constructor(config) {
      this.x = config.x;
      this.y = config.y;
      this.size = config.size;
      this.maxSize = config.size;
      this.stemLength = config.stemLength;
      this.stemThickness = config.stemThickness;
      this.petalThickness = config.petalThickness;
      this.maxPetalThickness = config.petalThickness;
      //colours
      this.stemColor = config.stemColor;
      this.petalColor = config.petalColor;
      this.centreColor = config.centreColor;
      this.alive = true;
    }

    display() {
      push();
      strokeWeight(this.stemThickness);
      // stem line
      stroke(this.stemColor.r, this.stemColor.g, this.stemColor.b);
      line(this.x, this.y, this.x, this.y + this.stemLength);
      // circle w/ stroke
      strokeWeight(this.petalThickness);
      fill(this.centreColor.r, this.centreColor.g, this.centreColor.b);
      stroke(this.petalColor.r, this.petalColor.g, this.petalColor.b);
      ellipse(this.x, this.y, this.size);
      pop();
    }

    shrink() {
      let shrinkage = random(0, 0.1);
      this.petalThickness = this.petalThickness - shrinkage / 10;
      this.size = this.size - shrinkage;

      if (this.petalThickness <= 0 || this.size <= 0) {
        this.alive = false;
      }
    }

    pollinate() {
      let growth = random(0, 0.5);
      this.petalThickness = this.petalThickness + growth /10;
      this.size = this.size + growth;

      this.petalThickness = constrain(this.petalThickness, 0, this.maxPetalThickness);
      this.size = constrain(this.size, 0, this.maxSize);
    }

    mousePressed() {
      let d = dist(this.x, this.y, mouseX, mouseY);
      if (d < this.size/2 + this.petalThickness) {
        this.stemLength = this.stemLength + 5;
        this.y = this.y - 5;
      }
    }
}
