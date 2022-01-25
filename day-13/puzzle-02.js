const fs = require("fs");
const filename = "day-13/input.txt";
const inputList = fs.readFileSync(filename, "utf8").split("\n");

let map = [];
const foldIns = [];

// create map
for (const line of inputList) {
  if (line.indexOf(",") >= 0) {
    const [x, y] = line.split(",");
    map.push([x, y]);
  } else if (line.indexOf("=") >= 0) {
    const [label, value] = line.split("=");
    const direction = label.slice(-1);
    foldIns.push([direction, value]);
  }
}

// fold
const step = foldIns.length;
for (let i = 0; i < step; i++) {
  const [direction, foldLine] = foldIns[i];
  if (direction === "y") {
    const bottomHalf = map.filter(([x, y]) => Number(y) > Number(foldLine));
    map = map.filter(([x, y]) => Number(y) < Number(foldLine));

    for (const [x, y] of bottomHalf) {
      const diff = y - foldLine;
      const newY = foldLine - diff;
      if (
        !map.some(
          ([column, row]) =>
            Number(column) === Number(x) && Number(row) === Number(newY)
        )
      ) {
        map.push([x, newY]);
      }
    }
  } else if (direction === "x") {
    const rightHalf = map.filter(([x, y]) => Number(x) > Number(foldLine));
    map = map.filter(([x, y]) => Number(x) < Number(foldLine));

    for (const [x, y] of rightHalf) {
      const diff = x - foldLine;
      const newX = foldLine - diff;
      if (
        !map.some(
          ([column, row]) =>
            Number(column) === Number(newX) && Number(row) === Number(y)
        )
      ) {
        map.push([newX, y]);
      }
    }
  }
}

const largestX = Math.max(...map.map((x) => x[0]));
const largestY = Math.max(...map.map((x) => x[1]));

const output = Array(largestY + 1)
  .fill(null)
  .map(() => " ".repeat(largestX + 1));

for (const iterator of map) {
  const x = Number(iterator[0]);
  const y = Number(iterator[1]);

  const start = output[y].substring(0, x); const end = output[y].substring(x + 1, output[y].length);
  output[y] = start + "#" + end;
}

console.log(output);
