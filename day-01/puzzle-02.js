const fs = require('fs');
const filename = 'day-01/input.txt';
const inputList = fs
  .readFileSync(filename, 'utf8')
  .split('\n')
  .map((num) => Number(num));

let increased = 0;

for (let i = 0, prev = 0; i + 2 < inputList.length; i++) {
  const cur = inputList[i] + inputList[i + 1] + inputList[i + 2];
  if (prev && cur > prev) {
    increased++;
  }

  prev = inputList[i] + inputList[i + 1] + inputList[i + 2];
}

// output answer
console.log(increased);
