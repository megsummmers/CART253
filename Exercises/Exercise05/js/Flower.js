class Flower {
    constructor({
      x,
      y,
      size,
      stemLength,
      stemThickness,
      petalThickness,
      stemColor,
      petalColor,
      centreColor
    }) {
      //FLOWER POSITIONS AND SIZES
      this.x = x;
      this.y = y;
      this.size = size;
      this.maxSize = size;
      this.stemLength = stemLength;
      this.stemThickness = stemThickness;
      this.petalThickness = petalThickness;
      this.maxPetalThickness = petalThickness;
      //COLOURS
      this.stemColor = stemColor;
      this.petalColor = petalColor;
      this.centreColor = centreColor;
      this.alive = true;
      this.deadCounted = false;
    }

    shrink() {
      //----- FLOWER SHRINKAGE -----
      let shrinkage = random(0, 0.12);
      this.petalThickness = this.petalThickness - shrinkage / 10;
      this.size = this.size - shrinkage;
      //----- FLOWER IS D E A D -----
      if (this.petalThickness <= 0 || this.size <= 0) {
        this.alive = false;
      }
    }

    beeGrowth() {
      //----- FLOWER GROWTH -----
      let growth = random(0, 0.5);
      this.petalThickness = this.petalThickness + growth /10;
      this.size = this.size + growth;

      this.petalThickness = constrain(this.petalThickness, 0, this.maxPetalThickness);
      this.size = constrain(this.size, 0, this.maxSize);
    }

    userGrowth() {
      //----- FLOWER GROWTH -----
      let growth = random(0, 2.5);
      this.petalThickness = this.petalThickness + growth /10;
      this.size = this.size + growth;

      this.petalThickness = constrain(this.petalThickness, 0, this.maxPetalThickness);
      this.size = constrain(this.size, 0, this.maxSize);
    }

    display() {
      push();
      //----- STEMS -----
      strokeWeight(this.stemThickness);
      stroke(this.stemColor.r, this.stemColor.g, this.stemColor.b);
      line(this.x, this.y, this.x, this.y + this.stemLength);
      //----- FLOWER + PETALS -----
      strokeWeight(this.petalThickness);
      fill(this.centreColor.r, this.centreColor.g, this.centreColor.b);
      stroke(this.petalColor.r, this.petalColor.g, this.petalColor.b);
      ellipse(this.x, this.y, this.size);
      pop();
    }
}
