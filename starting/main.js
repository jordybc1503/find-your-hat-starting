const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const fieldBase = [hole, fieldCharacter];


class Field {


  constructor (field){
      this.field = field;
      this.playerPosition = { x: 0, y: 0 };
      this.field[0][0] = pathCharacter; // Initial player position
  } 

  // Print method
  print(){
      this.field.forEach(e=>console.log(e.join()))
  }

  // Run game
  runGame() {
      let playing = true;
      while (playing) {
        this.print();
        this.askForMove();
  
        const { x, y } = this.playerPosition;
        if (!this.isInBounds(x, y)) {
          console.log("You moved outside the field!");
          playing = false;
        } else if (this.field[x][y] === hole) {
          console.log("Oh no, you fell in a hole!");
          playing = false;
        } else if (this.field[x][y] === hat) {
          console.log("Hooray! You found your hat!");
          playing = false;
        } else {
          this.field[x][y] = pathCharacter;
        }
      }
  }
    
  askForMove() {
      const move = prompt("Which way? (w: up, a: left, s: down, d: right) ").toLowerCase();
      switch(move) {
        case 'w':
          this.playerPosition.x -= 1; // Move up
          break;
        case 'a':
          this.playerPosition.y -= 1; // Move left
          break;
        case 's':
          this.playerPosition.x += 1; // Move down
          break;
        case 'd':
          this.playerPosition.y += 1; // Move right
          break;
        default:
          console.log("Enter w, a, s, or d to move");
          this.askForMove();
          break;
      }
  }
    
  isInBounds(x, y) {
    return x >= 0 && y >= 0 && x < this.field.length && y < this.field[x].length;
  }

  static generateField(height, width, percentageOfHoles) {
      const field = new Array(height).fill(null).map(() => new Array(width));
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const prob = Math.random();
          field[y][x] = prob < percentageOfHoles ? hole : fieldCharacter;
        }
      }
  
      // Place the hat at a random position other than the starting point
      let hatPosition = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
      };
      while (hatPosition.x === 0 && hatPosition.y === 0) {
        hatPosition = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height)
        };
      }
      field[hatPosition.y][hatPosition.x] = hat;
  
      // Set the starting point
      field[0][0] = pathCharacter;
  
      return field;
  }


   
    
}

const height = 5; // Example height
const width = 3;  // Example width
const percentageOfHoles = 0.2; // Example percentage of holes

const gameField = Field.generateField(height, width, percentageOfHoles);
const myField = new Field(gameField);

myField.runGame(); 