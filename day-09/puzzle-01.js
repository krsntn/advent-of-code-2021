const fs = require('fs');
const filename = 'day-09/input.txt';
let inputList = fs.readFileSync(filename, 'utf8').split('\n');

inputList = inputList.map((x) => x.split('').map(Number));

const output = [];

for (let x = 0; x < inputList.length; x++) {
  const line = inputList[x];
  for (let y = 0; y < line.length; y++) {
    const center = line[y];
    let top, right, down, left;
    if (x > 0) {
      top = inputList[x - 1][y];
    }

    if (x < inputList.length - 1) {
      down = inputList[x + 1][y];
    }

    if (y > 0) {
      left = inputList[x][y - 1];
    }

    if (y < line.length - 1) {
      right = inputList[x][y + 1];
    }

    let surround = [top, right, down, left];
    surround = surround.filter((x) => x !== undefined);

    if (center < Math.min(...surround)) {
      output.push(center);
    }
  }
}

console.log(output.reduce((acc, cur) => acc + cur) + output.length);
