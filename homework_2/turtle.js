/* [Homework] Turtle Graphics - 2 */

// Create a turtle class
class Turtle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = 'east';
    this.points = [[this.x, this.y]];
    this.dir = ['east'];
    this.paths = [];
  }

  // Set a forward method on the turtle instance
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

  // Set a right method on the turtle instance
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

  // Set a left method on the turtle instance
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
    // Merge both the designated points and the path points arrays by first creating an empty array then pushing into them
    const finalTemp = [];
    this.points.forEach((el) => {
      finalTemp.push(el);
    });
    this.pathPoints().forEach((el) => {
      finalTemp.push(el);
    });

    // Then create a seperate array, create a set and set them as strings.  Then remove them through the Javascript Set method and return the array with only unique values
    let stringArray = finalTemp.map(JSON.stringify);
    let uniqueStringArray = new Set(stringArray);
    let uniqueArray = Array.from(uniqueStringArray, JSON.parse);
    return uniqueArray;
  }

  print() {
    // Set a default grid size, output variable to an empty string and a check to false
    let gridSize = 10;
    let output = ``;
    let check = false;

    for (let i = 0; i <= gridSize; i++) {
      for (let j = 0; j <= gridSize; j++) {
        // Merge both the designated points and the path points arrays by first creating an empty array then pushing into them
        const finalTemp = [];

        this.points.forEach((el) => {
          finalTemp.push(el);
        });

        this.pathPoints().forEach((el) => {
          finalTemp.push(el);
        });

        // Then create a seperate array, create a set and set them as strings.  Then remove them through the Javascript Set method and return the array with only unique values
        let stringArray = finalTemp.map(JSON.stringify);
        let uniqueStringArray = new Set(stringArray);
        let uniqueArray = Array.from(uniqueStringArray, JSON.parse);

        for (let k = 0; k < uniqueArray.length; k++) {
          let x = uniqueArray[k][0];
          let y = uniqueArray[k][1];
          // If the coordinates match, put them as a checked box
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
        // If they don't match, put them as an empty checkbox
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

/* Here are some test functions you can use! */

/* const turtle = new Turtle(0, 4);
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
  .print();

  console.log(turtle.allPoints()); */
