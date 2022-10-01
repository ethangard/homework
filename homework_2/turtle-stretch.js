/* [Homework] Turtle Graphics - 2 */

// Require the file system module
const fs = require('fs');

// Create the turtle class
class Turtle {
  // Initialize the constructor to the default values if provided
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = 'east';
    this.points = [[this.x, this.y]];
    this.dir = ['east'];
    this.paths = [];
  }

  // Set up the forward method to move the turtle forward in the direction it is facing at the moment
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

  // Set up the right method to have the turtle move right
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

  // Set up the left method to have the turtle move left
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

  // Added an all points method which returns an array containing all the coordinates the turtle has walked over
  allPoints() {
    // console.log(this.points);
    const combinedPoints = [];

    // Iterate over all of the specified points
    this.points.forEach((el) => {
      combinedPoints.push(el);
    });

    // Iterate over all of the path points
    this.pathPoints().forEach((el) => {
      combinedPoints.push(el);
    });

    // Add all of the points to a single array, then remove the duplicates
    let arrayOfStrings = combinedPoints.map(JSON.stringify);
    let uniqueStringArray = new Set(arrayOfStrings);
    let uniqueArray = Array.from(uniqueStringArray, JSON.parse);

    // Return the points in an array
    return uniqueArray;
  }

  // Set up the print method
  print() {
    // Set the grid size to 20 to see the larger examples, this can be manually changed
    // Set up a check and an output variable
    let gridSize = 20;
    let output = ``;
    let check = false;

    // Iterate over the grid size to create either blank or full points
    for (let i = 0; i <= gridSize; i++) {
      for (let j = 0; j <= gridSize; j++) {
        // Set up an empty array and add both path points and designated points to the array
        const finalTemp = [];

        this.points.forEach((el) => {
          finalTemp.push(el);
        });

        this.pathPoints().forEach((el) => {
          finalTemp.push(el);
        });

        // Add all of the points to a single array, then remove the duplicates
        let stringArray = finalTemp.map(JSON.stringify);
        let uniqueStringArray = new Set(stringArray);
        let uniqueArray = Array.from(uniqueStringArray, JSON.parse);

        // Loop over all of the values in the unique co-ordinates array
        for (let k = 0; k < uniqueArray.length; k++) {
          let x = uniqueArray[k][0];
          let y = uniqueArray[k][1];
          // If they match a co-ordiante, fill a checkbox and change the match to true
          if (i === y && j === x) {
            output += `\u2612`;
            check = true;
          }
        }
        // Loop over the paths co-ordinates array
        for (let l = 0; l < this.paths.length; l++) {
          let x = this.paths[l][0];
          let y = this.paths[l][1];
          if (i === y && j === x) {
            output += `\u2612`;
            check = true;
          }
        }
        // If the check is false, then put in an empty box
        if (!check) {
          output += '\u2610';
        }

        // If the grid size is divisible by the current for loop iteration, create a new line
        if (j >= gridSize && j % gridSize === 0) {
          output += `\n`;
        }
        // After each iteration, set the boolean check to false
        check = false;
      }
    }

    // Return the results and log the output
    console.log(output);
    return output;
  }
  drawPath() {
    // Draw the points and push them into the this.paths array in the constructor
    for (let i = 0; i < this.points.length; i++) {
      let currX = this.points[i][0];
      let currY = this.points[i][1];

      let nextX, nextY;

      nextX = this.points[i][0];
      nextY = this.points[i][1];

      if (currX - nextX !== 0) {
        if (nextX > currX) {
          for (let i = 0; i < nextX - currX; i++) {
            this.paths = [currX + i, currY];
          }
        }
      }
    }
  }

  // Create a path points helper function to make sure that all path points are added to the consturctor
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
    // Return all path points
    return allPathPoints;
  }
}

/* Here is where the actual magic happens */

// Get input from the terminal.  There are set as lets because they could be overrideen later in the function call depending on how many there are
let scriptArgsOne = process.argv[2];
let scriptArgsTwo = process.argv[3];

// Create a new empty turtle and set a variable to a blank fileName
let turtle = new Turtle();
let fileName = '';

// Create the process file function
const saveToFile = (arr) => {
  // Split the array by fashes
  const arrArgs = arr.split('-');
  for (let i = 0; i < arrArgs.length; i++) {
    let currArg = arrArgs[i];
    // If the current iteration is 0, check to see if the turtle has starting co-ordinates
    if (i === 0) {
      if (arrArgs[i].includes('t')) {
        // Set the turtle co-ordinates
        turtle = new Turtle(
          (this.x = parseInt(currArg.slice(1, currArg.indexOf(',')))),
          (this.y = parseInt(
            currArg.slice(currArg.indexOf(',') + 1, currArg.length)
          ))
        );
      } else {
        turtle = new Turtle(0, 0);
      }
    }

    // Split the argv value by its functions; either going forward, left or right
    if (currArg.includes('f')) {
      turtle.forward(parseInt(currArg.slice(1)));
    } else if (currArg.includes('l')) {
      turtle.left();
    } else if (currArg.includes('r')) {
      turtle.right();
    }
  }

  // If there is a second arguemnt in the terminal, we need to create the file
  if (scriptArgsTwo) {
    fs.writeFile(`${__dirname}/${fileName}`, turtle.print(), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(`🐢 Drawing written to ${fileName}`);
    });
    // If no second argument, then simply print
  } else {
    turtle.print();
  }
};

// Calling the function, if the first arguemtn includes --output, print and save the file, otherwise just print it
if (scriptArgsOne.includes('--output')) {
  fileName = scriptArgsOne.slice(
    scriptArgsOne.indexOf('=') + 1,
    scriptArgsOne.length
  );
  console.log(fileName);
  return saveToFile(scriptArgsTwo);
} else {
  saveToFile(scriptArgsOne);
}
