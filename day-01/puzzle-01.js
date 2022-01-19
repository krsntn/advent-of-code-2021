const fs = require('fs');
const filename = 'src/day-01/input.txt';
const inputList = fs
  .readFileSync(filename, 'utf8')
  .split('\n')
  .map((num) => Number(num));

let increased = 0;

inputList.forEach((value, index) => {
  const prev = inputList[index - 1];
  if (prev && value > prev) {
    increased++;
  }
});

// output answer
console.log(increased);
