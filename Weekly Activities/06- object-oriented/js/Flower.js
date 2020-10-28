class Flower {
    constructor(config) {
      this.x = config.x;
      this.y = config.y;
      this.size = config.size;
      this.stemLength = config.stemLength;
      this.stemThickness = config.stemThickness;
      this.petalThickness = config.petalThickness;
      //colours
      this.stemColor = config.stemColor;
      this.petalColor = config.petalColor;
      this.centreColor = config.centreColor;
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

  mousePressed() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < this.size/2 + this.petalThickness) {
      this.stemLength = this.stemLength + 5;
      this.y = this.y - 5;
    }
  }
}
