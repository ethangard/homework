/* 

Steps to take 

1. Get the input from the terminal 
2. Create the class and methods for the turtle
3. Output content to the console

// Methods to create

Forward, moves the turtle forward in a the direction its set to
Right, updates the rotation of the turtle but does not move it any spaces 

Left, same as above 

All Points, returns an array containg all the cooordinates the turtle has walked over 

Print, draws the turtles path along their travels to the console 

// Stretch
Get the output on a canvas with animations 

*/

const fs = require('fs');

class Turtle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = 'east';
    this.points = [[this.x, this.y]];
    this.dir = ['east'];
    this.paths = [];
  }

  forward(num) {
    if (this.direction === 'east') {
      this.x += num;
    } else if (this.direction === 'west') {
      this.x -= num;
    } else if (this.direction === 'north') {
      this.y -= num;
    } else {
      this.y += num;
    }
    this.points.push([this.x, this.y]);
    this.dir.push(this.direction);
    return this;
  }

  right() {
    const dir = ['north', 'east', 'south', 'west'];
    let idx = dir.indexOf(this.direction);
    idx++;
    if (idx === undefined || idx >= dir.length) {
      idx = 0;
    }
    this.direction = dir[idx];
    return this;
  }

  left() {
    const dir = ['north', 'east', 'south', 'west'];
    let idx = dir.indexOf(this.direction);
    idx--;
    if (idx < 0) {
      idx = dir.length - 1;
    }
    this.direction = dir[idx];
    return this;
  }

  allPoints() {
    console.log(this.points);
    return this.points;
  }

  print() {
    let gridSize = 20;
    let output = ``;
    let check = false;

    for (let i = 0; i <= gridSize; i++) {
      for (let j = 0; j <= gridSize; j++) {
        let temp = [...this.points, ...this.pathPoints()];

        const finalTemp = [];

        this.points.forEach((el) => {
          finalTemp.push(el);
        });

        this.pathPoints().forEach((el) => {
          finalTemp.push(el);
        });

        let stringArray = finalTemp.map(JSON.stringify);
        let uniqueStringArray = new Set(stringArray);
        let uniqueArray = Array.from(uniqueStringArray, JSON.parse);

        for (let k = 0; k < uniqueArray.length; k++) {
          let x = uniqueArray[k][0];
          let y = uniqueArray[k][1];
          if (i === y && j === x) {
            output += `\u2612`;
            check = true;
          }
        }
        for (let l = 0; l < this.paths.length; l++) {
          let x = this.paths[l][0];
          let y = this.paths[l][1];
          if (i === y && j === x) {
            output += `\u2612`;
            check = true;
          }
        }
        if (!check) {
          output += '\u2610';
        }

        if (j >= gridSize && j % gridSize === 0) {
          output += `\n`;
        }
        check = false;
      }
    }
    console.log(output);
    return output;
  }
  drawPath() {
    for (let i = 0; i < this.points.length; i++) {
      let currX = this.points[i][0];
      let currY = this.points[i][1];

      let nextX, nextY;

      nextX = this.points[i][0];
      nextY = this.points[i][1];

      if (currX - nextX !== 0) {
        if (nextX > currX) {
          // console.log(`east`);
          for (let i = 0; i < nextX - currX; i++) {
            this.paths = [currX + i, currY];
          }
        }
      }
    }
  }
  pathPoints() {
    let allPathPoints = [];

    for (let i = 0; i < this.points.length - 1; i++) {
      let currX = this.points[i][0];
      let currY = this.points[i][1];

      let nextX = this.points[i + 1][0];
      let nextY = this.points[i + 1][1];

      /* For X's */
      if (currX !== nextX) {
        if (currX < nextX) {
          while (currX < nextX) {
            //console.log(`CurrX is: ${currX}`);
            // console.log(`nextX is: ${nextX}`);
            allPathPoints.push([currX, currY]);
            currX++;
          }
        } else {
          while (currX > nextX) {
            allPathPoints.push([currX, currY]);
            currX--;
          }
        }
      }

      /* For Y's */
      if (currY !== nextY) {
        if (currY < nextY) {
          while (currY < nextY) {
            //console.log(`CurrX is: ${currX}`);
            // console.log(`nextX is: ${nextX}`);
            allPathPoints.push([currX, currY]);
            currY++;
          }
        } else {
          while (currY > nextY) {
            allPathPoints.push([currX, currY]);
            currY--;
          }
        }
      }
    }
    return allPathPoints;
  }
}

/*  const turtle = new Turtle(0, 4);
turtle
  .forward(3)
  .left()
  .forward(3)
  .right()
  .forward(5)
  .right()
  .forward(8)
  .right()
  .forward(5)
  .right()
  .forward(3)
  .left()
  .forward(3)
  .print(); */

// turtle.pathPoints();

const scriptArgs = process.argv[2];
// console.log(scriptArgs);
const arrArgs = scriptArgs.split('-');
// console.log(arrArgs);

let turtle = new Turtle();

for (let i = 0; i < arrArgs.length; i++) {
  let funcCall = '';
  let currArg = arrArgs[i];
  if (i === 0) {
    // console.log(currArg.slice(1, currArg.indexOf(',')));
    // console.log(currArg.slice(currArg.indexOf(',') + 1, currArg.length));

    if (arrArgs[i].includes('t')) {
      turtle = new Turtle(
        (this.x = parseInt(currArg.slice(1, currArg.indexOf(',')))),
        (this.y = parseInt(
          currArg.slice(currArg.indexOf(',') + 1, currArg.length)
        ))
      );
    }
    // console.log(turtle);
    else {
      turtle = new Turtle(0, 0);
      // console.log(turtle);
    }
  }

  if (currArg.includes('f')) {
    // Do f stuff
    // turtle.forward(currArg.slice(1), currArg.length);
    turtle.forward(parseInt(currArg.slice(1)));
    // console.log(currArg.slice(1), currArg.length);
    // console.log(this.x, this.y);
  } else if (currArg.includes('l')) {
    // Do l stuff
    console.log(`L happened`);
    turtle.left();
  } else if (currArg.includes('r')) {
    // Do r stuff
    turtle.right();
  }

  if (i === arrArgs.length - 1) {
    console.log(turtle.allPoints());
    turtle.print();
  }
}

/* fs.writeFile(`${__dirname}/test.txt`, turtle.print(), function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('The file was saved!');
}); */
