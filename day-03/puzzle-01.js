const fs = require('fs');
const filename = 'day-03/input.txt';
const inputList = fs.readFileSync(filename, 'utf8').split('\n');

let arr = [];

inputList.forEach((value) => {
  value.split('').forEach((x, index) => {
    arr[index] = arr[index] ? (arr[index] += Number(x)) : Number(x);
  });
});

const gamma = parseInt(
  arr.map((x) => (x > inputList.length / 2 ? 1 : 0)).join(''),
  2
);
const epsilon = gamma ^ parseInt('1'.repeat(arr.length), 2);

const ans = gamma * epsilon;

// output answer
console.log(ans);
