/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
"use strict";

let garden = {
  flowers: [],
  numFlowers: 20,
  bees: [],
  numBees: 5,
  grassColor: {
    r: 120,
    g: 180,
    b: 120
  }
};

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1000, 1000);

  for (let i = 0; i < garden.numFlowers; i++) {
    //set random variables in object
    let config = {
      x: random(0, width),
      y: random(0, height),
      size: random(50, 80),
      stemLength: random(50, 80),
      stemThickness: random(8, 12),
      petalThickness: random(8, 12),
      stemColor: {
        r: random(0, 100),
        g: random(100, 255),
        b: random(0, 100)
      },
      petalColor: {
        r: random(100, 255),
        g: random(100, 255),
        b: random(100, 255)
      },
      centreColor: {
        r: random(0, 50),
        g: random(0, 50),
        b: random(0, 50)
      }
    };
    // Create a new flower
    let flower = new Flower(config);
    // Add the flower to the array of flowers
    garden.flowers.push(flower);
  }
  //garden.flowers.sort(sortByY);
  for (let i = 0; i < garden.numBees; i++){
    let x = random(0, width);
    let y = random(0, height);

    let bee = new Bee(x, y);
    garden.bees.push(bee);
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  for (let i = 0; i < garden.flowers.length; i++){
    let flower = garden.flowers[i];
    if (flower.alive) {
      flower.shrink();
      flower.display();
    }
  }

  for (let i = 0; i < garden.bees.length; i++){
    let bee = garden.bees[i];

    if (bee.alive){
      bee.shrink();
      bee.move();

      for (let j = 0; j < garden.flowers.length; j++){
        let flower = garden.flowers[j];
        bee.pollinationCheck(flower);
      }

      bee.display();
    }
  }
}
// sorts from closest to furthest
// function sortByY(flower1, flower2) {
//   return flower1.y - flower2.y;
// }
//
// function mousePressed() {
//   for (let i = 0; i < garden.flowers.length; i++){
//     let flower = garden.flowers[i];
//     flower.mousePressed();
//   }
// }
