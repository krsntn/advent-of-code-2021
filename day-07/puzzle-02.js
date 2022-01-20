const fs = require('fs');
const filename = 'day-07/input.txt';
const inputList = fs.readFileSync(filename, 'utf8').split('\n');

let crabs = inputList[0].split(',').map(Number);

const min = Math.min(...crabs);
const max = Math.max(...crabs);

function calc(num) {
  let output = 0;
  while (num > 0) {
    output += num--;
  }
  return output;
}

const count = {};
for (let index = min; index <= max; index++) {
  count[index] = crabs
    .map((x) => calc(Math.abs(x - index)))
    .reduce((acc, cur) => acc + cur);
}

console.log(Math.min(...Object.values(count)));
