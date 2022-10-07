// Run script without needing to type node
// #!/Users/ethangard/.nvm/versions/node/v14.20.0/bin/node

// Box it script
const input = process.argv;

const args = input.forEach((arg) => {
  // console.log(arg);
  return arg;
});

/* const boxIt = (str) => {
  let longest = str[2].length;

  // let output = `Stuff here ${str} stuff here`;
  for (let i = 2; i < str.length; i++) {
    console.log(`${str[i]} is ${str[i].length} long`);
    // let temp = el[2].length;
    if (str[i].length > longest) {
      longest = str[i].length;
    }
  }

  /* const longest = str.forEach((el) => {
    let temp = el[2].length;
    if (el.length > temp) {
      temp = el.length;
    }
    console.log(`Longest is: ${temp}`);
    return temp;
  });
  console.log(longest); */

/* onst output = str.forEach((el) => {
    // Find the longest length of one element

    console.log(`Stuff here ${el} stuff here`);
  });

  return output; */

// const top = '\u2500'.repeat(longest + 2);

/* for(let i = 0; i < longest; i++){

    '\u2500'.repeat(longest + 2)

  } */

/*   const side = '\u2502';

  const topLeft = '\u250c';
  const topRight = '\u2510';
  const bottomLeft = '\u2514';
  const bottomRight = '\u2518';

  const box = `\u250c${top}\n${side} test ${side}\n${top}`;
  const test = `${top}\n${side} ${side}\n${top}`;
  console.log(box);
  console.log(test);

  console.log(`${topLeft}${topRight}\n${bottomLeft}${bottomRight}`);

  console.log(`Longest is: ${longest}`);
  console.log('\u2500');
  // console.log(result);
  return longest;
};

// const input = process.argv[2];
console.log(boxIt(input)); */

// Test draw line
/* const drawLine = (words) => {
  // Find the length of the longest word in the arguments provided
  let longest = words[2].length;
  for (let i = 2; i < words.length; i++) {
    console.log(`${words[i]} is ${words[i].length} long`);
    if (words[i].length > longest) {
      longest = words[i].length;
    }
  }

  // Return a line based on the length of the word

  const line = '\u2500'.repeat(longest);
  return line;
}; */

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

// console.log(drawTopBorder(5), drawMiddleBorder(5), drawBottomBorder(5));

// drawBarsAround function
const drawBarsAround = (str) => {
  const currLength = str.length;
  // console.log(`currLength: ${currLength}`);
  // console.log(`Longest: ${getLongest(input)}`);

  const diff = getLongest(input) - currLength;

  // console.log(`diff: ${diff}`);

  return `\u2502${str}${' '.repeat(diff)}\u2502`;
};

// getLongest
const getLongest = (arr) => {
  let longest = arr[2].length;
  for (let i = 2; i < arr.length; i++) {
    // console.log(`${words[i]} is ${words[i].length} long`);
    if (arr[i].length > longest) {
      longest = arr[i].length;
    }
  }
  return longest;
};

// boxIt function
const boxIt = (arr) => {
  // Find the length of the longest word in the arguments provided
  const longest = getLongest(arr);

  let items = ``;

  arr.slice(2).forEach((el) => {
    //output += drawTopBorder(longest) + '\n';

    items += drawBarsAround(el) + '\n';
    items += drawMiddleBorder(longest) + '\n';
    // output += drawMiddleBorder(longest) + '\n';
  });

  // console.log(items);

  const output =
    drawTopBorder(longest) + '\n' + items + drawBottomBorder(longest);

  console.log(output);

  return output;
};

boxIt(input);
