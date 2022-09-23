#! /usr/bin/env node
// This script above runs this script without needing to type in node as a prefix.  If it isn't working for you, you may need to run 'chmod +x ./boxItCSV.js' in your terminal in this directory first

// Require the file system module/package
const fs = require('fs');

// Set the path name to the 3rd process.argv item
const path_name = process.argv[2];

// Parse the data out of the CSV fiel
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

// Remove commas and newline characters
const newArr = parse.split(/[\n,]+/);

// There is one empty string at the end, I decided to write this script to remove any other cases
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

// Set out input to the csv file once it has been formatted
const input = removeEmptyStrings(newArr);

// Draw line function
const drawLine = (num) => {
  const line = '\u2500'.repeat(num);
  return line;
};

// drawTopBorder
const drawTopBorder = (num) => {
  const topBorder = '\u250c' + drawLine(num) + '\u2510';
  return topBorder;
};

//drawMiddleBorder
const drawMiddleBorder = (num) => {
  const middleBorder = '\u251c' + drawLine(num) + '\u2524';
  return middleBorder;
};

//drawBottomBorder
const drawBottomBorder = (num) => {
  const bottomBorder = '\u2514' + drawLine(num) + '\u2518';
  return bottomBorder;
};

// drawBarsAround function
const drawBarsAround = (str) => {
  const currLength = str.length;
  const diff = getLongest(input) - currLength;
  return `\u2502${str}${' '.repeat(diff)}\u2502`;
};

// getLongest
const getLongest = (arr) => {
  let longest = 0;
  if (longest === undefined) {
    console.log(
      `Please provide and arugment, either a string wrapped in quotes '' or or the name of a CSV file in the same directory`
    );
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > longest) {
      longest = arr[i].length;
    }
  }
  if (longest === 0) {
    // Return a top and bottom border if no arguments are provided
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

  // Need to output the first two topBorders
  items += drawTopBorder(longest);
  items += drawTopBorder(longest) + '\n';

  // Iterating over the array in a two step, to draw each column in pairs
  for (let i = 0; i < arr.length; i += 2) {
    items += drawBarsAround(arr[i]);
    items += drawBarsAround(arr[i + 1]) + '\n';

    // If we are at the last two indicies of the array, draw two bottom borders, otherwise draw middle borders
    if (i === arr.length - 2) {
      items += drawBottomBorder(longest);
      items += drawBottomBorder(longest);
    } else {
      items += drawMiddleBorder(longest);
      items += drawMiddleBorder(longest) + '\n';
    }
  }
  // Consle log items and return them
  console.log(items);
  return items;
};
boxIt(input);
