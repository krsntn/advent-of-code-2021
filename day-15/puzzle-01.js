// const fs = require("fs");
// const filename = "day-14/input.txt";
// const inputList = fs.readFileSync(filename, "utf8").split("\n");

const inputList = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`.split("\n");

const map = [];

for (let i = 0; i < inputList.length; i++) {
  const line = inputList[i];

  line.split("").forEach((x, index) => {
    map.push({
      value: Number(x),
      x: i,
      y: index,
    });
  });
}

const visited = [];
let unvisited = JSON.parse(JSON.stringify(map));

let currentNode = unvisited.shift();

const table = [
  {
    vertex: `${currentNode.x},${currentNode.y}`,
    distance: 0,
    previousVertex: null,
  },
];

while (currentNode) {
  const { x, y } = currentNode;

  const neighbors = unvisited.filter(
    (node) =>
      (node.x === x + 1 && node.y === y) ||
      (node.x === x - 1 && node.y === y) ||
      (node.x === x && node.y === y + 1) ||
      (node.x === x && node.y === y - 1)
  );

  if (neighbors) {
    const allDistances = [];
    neighbors.forEach((neighbor) => {
      const currentVertex = table.find((z) => z.vertex === `${x},${y}`);
      const neighborVertex = table.find(
        (z) => z.vertex === `${neighbor.x},${neighbor.y}`
      );
      const totalDistance = neighbor.value + currentVertex.distance;

      if (neighborVertex) {
        if (neighborVertex.distance > totalDistance) {
          neighborVertex.distance = totalDistance;
          allDistances.push(totalDistance);
        } else {
          allDistances.push(neighborVertex.distance);
        }
      } else {
        table.push({
          vertex: `${neighbor.x},${neighbor.y}`,
          distance: totalDistance,
          previousVertex: `${currentNode.x},${currentNode.y}`,
        });
        allDistances.push(totalDistance);
      }
    });

    const availableData = table.filter((data) =>
      unvisited.some(
        (node) =>
          node.x == data.vertex.split(",")[0] &&
          node.y == data.vertex.split(",")[1]
      )
    );

    const smallestNeighbor =
      neighbors[allDistances.indexOf(Math.min(...allDistances))];

    // const min = Math.min(...neighbors.map((x) => x.value));
    // const smallestNeighbor = neighbors.find((x) => x.value === min);
    if (smallestNeighbor) {
      currentNode = smallestNeighbor;
      // } else if (
      //   !visited.find(
      //     (node) =>
      //       node.x === inputList.length - 1 && node.y === inputList[0].length - 1
      //   )
      // ) {
      //   console.log("what", currentNode);
      //   currentNode = unvisited[0];
    } else {
      if (
        visited.some(
          (node) =>
            node.x === inputList.length - 1 &&
            node.y === inputList[0].length - 1
        )
      ) {
        break;
      }
      currentNode = unvisited[0];
    }
  }

  visited.push(currentNode);
  unvisited.splice(unvisited.indexOf(currentNode), 1);
}

// console.log(table);
