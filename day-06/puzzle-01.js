const fs = require('fs');
const filename = 'day-06/input.txt';
const inputList = fs.readFileSync(filename, 'utf8').split('\n');

let arr = inputList[0].split(',').map(Number);

for (let day = 0; day < 80; day++) {
  let zeroCount = arr.filter((x) => x === 0).length;
  while (zeroCount) {
    arr[arr.indexOf(0)] = 7;
    arr.push(9);
    zeroCount--;
  }

  arr = arr.map((x) => x - 1);
}

console.log(arr.length);
