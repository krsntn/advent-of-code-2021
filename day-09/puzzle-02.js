const fs = require('fs');
const filename = 'day-09/input.txt';
let inputList = fs.readFileSync(filename, 'utf8').split('\n');

inputList = inputList.map((x) => x.split('').map(Number));

const lowPoints = [];

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
      lowPoints.push([x, y]);
    }
  }
}

function explore([x, y], visited) {
  if (visited.some(([row, column]) => x === row && y === column)) return;
  visited.push([x, y]);

  // up
  if (x - 1 >= 0 && ![undefined, 9].includes(inputList[x - 1][y])) {
    explore([x - 1, y], visited);
  }

  // down
  if (x + 1 < inputList.length && ![undefined, 9].includes(inputList[x + 1][y]))
    explore([x + 1, y], visited);

  // right
  if (
    y + 1 < inputList[0].length &&
    ![undefined, 9].includes(inputList[x][y + 1])
  ) {
    explore([x, y + 1], visited);
  }

  // left
  if (y - 1 >= 0 && ![undefined, 9].includes(inputList[x][y - 1]))
    explore([x, y - 1], visited);
}

const map = [];

for (const [x, y] of lowPoints) {
  const visited = [];

  explore([x, y], visited);

  map.push(visited);
}

const largest3 = map.map((x) => x.length).sort((a, b) => b - a);
console.log(largest3[0] * largest3[1] * largest3[2]);
