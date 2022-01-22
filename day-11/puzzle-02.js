const fs = require('fs');
const filename = 'day-11/input.txt';
let inputList = fs.readFileSync(filename, 'utf8').split('\n');

let map = inputList.map((line) => line.split('').map(Number));

function checkFlash([x, y], map) {
  if (map[x][y] >= 10) {
    map[x][y] = 0;
    visited.push([x, y]);
    addSurround([x, y], map);
    flashCount++;
  }
}

function addSurround([x, y], map) {
  // top left
  let newX = x - 1;
  let newY = y - 1;
  if (
    newX >= 0 &&
    newY >= 0 &&
    !visited.some(([row, column]) => row === newX && column === newY)
  ) {
    map[newX][newY] += 1;
    checkFlash([newX, newY], map);
  }

  // top
  newX = x - 1;
  newY = y;
  if (
    newX >= 0 &&
    !visited.some(([row, column]) => row === newX && column === newY)
  ) {
    map[newX][newY] += 1;
    checkFlash([newX, newY], map);
  }

  // top right
  newX = x - 1;
  newY = y + 1;
  if (
    newX >= 0 &&
    newY < map[0].length &&
    !visited.some(([row, column]) => row === newX && column === newY)
  ) {
    map[newX][newY] += 1;
    checkFlash([newX, newY], map);
  }

  // left
  newX = x;
  newY = y - 1;
  if (
    newY >= 0 &&
    !visited.some(([row, column]) => row === newX && column === newY)
  ) {
    map[newX][newY] += 1;
    checkFlash([newX, newY], map);
  }

  // right
  newX = x;
  newY = y + 1;
  if (
    newY < map[0].length &&
    !visited.some(([row, column]) => row === newX && column === newY)
  ) {
    map[newX][newY] += 1;
    checkFlash([newX, newY], map);
  }

  // bottom left
  newX = x + 1;
  newY = y - 1;
  if (
    newX < map.length &&
    newY >= 0 &&
    !visited.some(([row, column]) => row === newX && column === newY)
  ) {
    map[newX][newY] += 1;
    checkFlash([newX, newY], map);
  }

  // bottom
  newX = x + 1;
  newY = y;
  if (
    newX < map.length &&
    !visited.some(([row, column]) => row === newX && column === newY)
  ) {
    map[newX][newY] += 1;
    checkFlash([newX, newY], map);
  }

  // bottom right
  newX = x + 1;
  newY = y + 1;
  if (
    newX < map.length &&
    newY < map[0].length &&
    !visited.some(([row, column]) => row === newX && column === newY)
  ) {
    map[newX][newY] += 1;
    checkFlash([newX, newY], map);
  }
}

let visited = [];
let flashCount = 0;
let step = 0;

while (flashCount !== map[0].length * map.length) {
  visited = [];
  flashCount = 0;

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (visited.some(([row, column]) => row === x && column === y)) continue;

      const newValue = map[x][y] + 1;
      if (newValue >= 10) {
        map[x][y] = 0;
        flashCount++;
        visited.push([x, y]);
        addSurround([x, y], map);
        continue;
      }

      map[x][y] = newValue;
    }
  }

  step++;
}

console.log(step);
