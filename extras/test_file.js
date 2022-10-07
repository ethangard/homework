const input = process.argv[2];

if (input.includes('csv')) {
  console.log('csv');
} else {
  console.log('string');
}
// console.log(typeof input);
