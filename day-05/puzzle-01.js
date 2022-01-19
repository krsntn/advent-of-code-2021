const fs = require('fs');
const filename = 'day-05/input.txt';
const inputList = fs.readFileSync(filename, 'utf8').split('\n');

// format string
let formatted = inputList
  .map((x) => x.replace(' -> ', ',').split(','))
  .map((x) => x.map((y) => Number(y)));

// remove useless data
formatted = formatted.filter(
  (line) => line[0] === line[2] || line[1] === line[3]
);

// generate map
const map = {};

function generateMap(start, end, fixedPos, isVertical) {
  for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
    const posY = isVertical ? i : fixedPos;
    const posX = isVertical ? fixedPos : i;
    const spot = Object.keys(map).find((y) => Number(y) === posY);

    if (spot) {
      map[spot].push(posX);
    } else {
      map[posY] = [posX];
    }
  }
}

formatted.map((line) => {
  if (line[0] !== line[2]) {
    // horizontal
    generateMap(line[0], line[2], line[1], false);
  } else if (line[1] !== line[3]) {
    // vertical
    generateMap(line[1], line[3], line[0], true);
  }
});

// count overlap
let count = 0;
for (const [key, value] of Object.entries(map)) {
  const filtered = value.filter((x, i) => value.indexOf(x) < i);
  const final = [...new Set(filtered)];
  count += final.length;
}

console.log(count);
