//class to create the typewriter effect in the cutscenes
//code by Pippin Barr :D
//slightly edited by Meg Summers
class Typewriter {
  constructor() {
    // The full text this typewriter is currently typing out (empty to start)
    this.fullText = ``;
    // The current portion of the full text to actually display (empty to start)
    this.displayText = ``;
    // The index of the next character to add to the displayed text
    this.nextChar = 0;
    // How often to add a character (milliseconds)
    this.speed = 50;
    // The interval used to display the characters so we can cancel it
    this.interval = undefined;
    // The position to display the text at
    this.x = 0;
    this.y = 0;
  }
  //Displays text with a typewriter effect
  typewrite(message, x, y) {
    // resets
    this.reset();
    // Sets the text and position
    this.fullText = message;
    this.x = x;
    this.y = y;
    //starts typing at specified interval
    this.interval = setInterval(this.addNextCharacter.bind(this), this.speed);
  }

  // addNextCharacter()
  // Adds the next character to our display text if possible
  addNextCharacter() {
    // First check if we've reached the end of the full text
    if (this.nextChar >= this.fullText.length) {
      // If so, just return and don't do anything because we're finished
      return;
    }
    // Add the next character of the full text to the displayed next
    // Note that charAt() allows us to get the character at a specified
    // position in a string (numbered just like an array)
    this.displayText += this.fullText.charAt(this.nextChar);
    // Increase the next character by one for next time
    this.nextChar = this.nextChar + 1;
  }

  // Display the current display text
  display() {
    push();
    fill(0);
    textFont(`Helvetica`); //change this
    textSize(30);
    textAlign(CENTER);
    text(this.displayText, this.x, this.y);
    pop();
  }

  // reset()
  // Empty the texts and reset the counters and cancel the interval
  reset() {
    this.fullText = ``;
    this.displayText = ``;
    this.nextChar = 0;
    clearInterval(this.interval);
  }

}
