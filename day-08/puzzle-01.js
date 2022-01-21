const fs = require('fs');
const filename = 'day-08/input.txt';
let inputList = fs.readFileSync(filename, 'utf8').split('\n');

// number and segment
// 0 = 6
// 1 = 2 #
// 2 = 5
// 3 = 5
// 4 = 4 #
// 5 = 5
// 6 = 6
// 7 = 3 #
// 8 = 7 #
// 9 = 6

inputList = inputList.map((line) => line.split('|')[1].trim());
inputList = inputList.map(
  (line) =>
    line.split(' ').filter((segment) => [2, 3, 4, 7].includes(segment.length))
      .length
);

console.log(inputList.reduce((acc, cur) => acc + cur));
