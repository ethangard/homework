#! /usr/bin/env node
// This script above runs this script without needing to type in node as a prefix.  If it isn't working for you, you may need to run 'chmod +x ./boxit.js' in your terminal in this directory first

// Getting our process.argv terminal input
const input = process.argv;

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

// drawBarsAround function
const drawBarsAround = (str) => {
  const currLength = str.length;
  const diff = getLongest(input) - currLength;
  return `\u2502${str}${' '.repeat(diff)}\u2502` + '\n';
};

// getLongest string in input
const getLongest = (arr) => {
  let longest = 0;
  if (longest === undefined) {
    console.log(
      `Please provide and arugment, either a string wrapped in quotes '' or or the name of a CSV file in the same directory`
    );
    return;
  }
  for (let i = 2; i < arr.length; i++) {
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

  // Create a blank string to concat to
  let items = ``;

  // Removing the first to arguements with slice to skip over their paths
  arr.slice(2).forEach((el, idx) => {
    // If the index is 0, draw a top border
    if (idx === 0) {
      items += drawTopBorder(longest);
    }
    // Add each name to the items string and add bars around
    items += drawBarsAround(el);

    // If the array index is the last, draw a bottom border, else draw a middle border
    if (idx !== arr.slice(2).length - 1) {
      items += drawMiddleBorder(longest);
    } else {
      items += drawBottomBorder(longest);
    }
  });

  // console log results and return items
  console.log(items);
  return items;
};

boxIt(input);
