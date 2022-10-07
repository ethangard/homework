#! /usr/bin/env node

// Create and read CSV File
// const csvToArray = () =

// Run script without needing to type node

// Box it script
const input = process.argv[2];

// Draw line function
const drawLine = (num) => {
  const line = '\u2500'.repeat(num);
  return line;
};

// drawTopBorder
const drawTopBorder = (num) => {
  const topBorder = '\u250c' + drawLine(num) + '\u2510';
  return topBorder + '\n';
};

//drawMiddleBorder
const drawMiddleBorder = (num) => {
  const middleBorder = '\u251c' + drawLine(num) + '\u2524';
  return middleBorder + '\n';
};

//drawBottomBorder
const drawBottomBorder = (num) => {
  const bottomBorder = '\u2514' + drawLine(num) + '\u2518';
  return bottomBorder + '\n';
};

// console.log(drawTopBorder(5), drawMiddleBorder(5), drawBottomBorder(5));

// drawBarsAround function
const drawBarsAround = (str) => {
  const currLength = str.length;
  // console.log(`currLength: ${currLength}`);
  // console.log(`Longest: ${getLongest(input)}`);

  const diff = getLongest(input) - currLength;

  // console.log(`diff: ${diff}`);

  return `\u2502${str}${' '.repeat(diff)}\u2502` + '\n';
};

// getLongest
const getLongest = (arr) => {
  let longest = 0;
  if (longest === undefined) {
    console.log('hi');
    return;
  }
  for (let i = 2; i < arr.length; i++) {
    // console.log(`${words[i]} is ${words[i].length} long`);
    if (arr[i].length > longest) {
      longest = arr[i].length;
    }
  }
  if (longest === 0) {
    console.log(drawTopBorder(1));
    console.log(drawBottomBorder(1));
  }
  return longest;
};

// boxIt function
const boxIt = (arr) => {
  // Find the length of the longest word in the arguments provided
  const longest = getLongest(arr);

  let items = ``;

  arr.slice(2).forEach((el, idx) => {
    //output += drawTopBorder(longest) + '\n';

    if (idx === 0) {
      items += drawTopBorder(longest);
    }

    items += drawBarsAround(el);

    if (idx !== arr.slice(2).length - 1) {
      items += drawMiddleBorder(longest);
    } else {
      items += drawBottomBorder(longest);
    }
  });

  console.log(items);

  return items;
};

if (input.includes('csv')) {
  const fs = require('fs');
  const path_name = process.argv[2];

  const parse = fs.readFileSync(
    // The CSV file must be in the same directory as this executing script
    `${__dirname}/${path_name}`,
    'utf-8',
    (err, data) => {
      const output = [];
      if (err) {
        console.log(err);
        return;
      } else {
        return data;
      }
    }
  );

  const newArr = parse.split(/[\n,]+/);

  const removeEmptyStrings = (newArr) => {
    const output = [];
    newArr.forEach((el) => {
      if (el === '') {
      } else {
        output.push(el);
      }
    });
    return output;
  };

  const input = removeEmptyStrings(newArr);

  // boxIt function
  const boxIt = (arr) => {
    // Find the length of the longest word in the arguments provided
    const longest = getLongest(arr);

    // Need to output the first two topBorders
    let items = ``;

    items += drawTopBorder(longest);
    items += drawTopBorder(longest) + '\n';

    for (let i = 0; i < arr.length; i += 2) {
      items += drawBarsAround(arr[i]);
      items += drawBarsAround(arr[i + 1]) + '\n';

      if (i === arr.length - 2) {
        items += drawBottomBorder(longest);
        items += drawBottomBorder(longest);
      } else {
        items += drawMiddleBorder(longest);
        items += drawMiddleBorder(longest) + '\n';
      }
    }

    console.log(items);
    return items;
  };
  boxIt(input);
} else {
  // boxIt function
  const boxIt = (arr) => {
    // Find the length of the longest word in the arguments provided
    const longest = getLongest(arr);

    let items = ``;

    arr.slice(2).forEach((el, idx) => {
      //output += drawTopBorder(longest) + '\n';

      if (idx === 0) {
        items += drawTopBorder(longest);
      }

      items += drawBarsAround(el);

      if (idx !== arr.slice(2).length - 1) {
        items += drawMiddleBorder(longest);
      } else {
        items += drawBottomBorder(longest);
      }
    });

    console.log(items);
    return items;
  };
  boxIt(input);
}
