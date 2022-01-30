const filename = "day-15/input.txt";
const fs = require("fs");
const inputList = fs
  .readFileSync(filename, "utf8")
  .split("\n")
  .map((x) => [...x].map(Number));

const oriRowLength = inputList.length;
const oriColumnLength = inputList[0].length;

const biggerMap = Array(oriRowLength * 5)
  .fill(0)
  .map((_, y) => {
    return Array(oriColumnLength * 5)
      .fill(0)
      .map((_, x) => {
        const sourceValue = inputList[y % oriRowLength][x % oriColumnLength];
        const offset =
          Math.floor(x / oriColumnLength) + Math.floor(y / oriRowLength);

        const value = (sourceValue + offset) % 9;
        return value === 0 ? 9 : value;
      });
  });

const rowLength = biggerMap.length;
const columnLength = biggerMap[0].length;
const endIndex = rowLength * columnLength - 1;

const totalArrLen = rowLength * columnLength;
const distanceList = Array(totalArrLen).fill(Infinity);
const indexes = new Set(
  Array(totalArrLen)
    .fill(0)
    .map((_, index) => index)
);

function updateNeighborDistance(nX, nY, rowLength, columnLength, minIndex) {
  if (nX >= 0 && nX < columnLength && nY >= 0 && nY < rowLength) {
    const neighborUpValue = biggerMap[nX][nY];
    if (neighborUpValue) {
      const neighborindex = nX + nY * columnLength;
      const newValue = distanceList[minIndex] + neighborUpValue;

      if (newValue < distanceList[neighborindex]) {
        distanceList[neighborindex] = newValue;
      }
    }
  }
}

// set first data
distanceList[0] = 0;

while (distanceList[endIndex] === Infinity) {
  let minDistance = Infinity;
  let minIndex = 0;

  // get min node
  for (const value of indexes) {
    if (distanceList[value] < minDistance) {
      minDistance = distanceList[value];
      minIndex = value;
    }
  }

  // remove from indexes
  indexes.delete(minIndex);

  // reached to the end point
  if (minIndex === endIndex) break;

  // find neighbors and update distance
  const minCoordX = minIndex % columnLength;
  const minCoordY = (minIndex - minCoordX) / rowLength;

  [
    [minCoordX - 1, minCoordY],
    [minCoordX + 1, minCoordY],
    [minCoordX, minCoordY - 1],
    [minCoordX, minCoordY + 1],
  ].map(([x, y]) =>
    updateNeighborDistance(x, y, rowLength, columnLength, minIndex)
  );
}

console.log(distanceList[endIndex]);
