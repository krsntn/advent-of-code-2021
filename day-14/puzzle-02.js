const fs = require("fs");
const filename = "day-14/input.txt";
const inputList = fs.readFileSync(filename, "utf8").split("\n");

let template = inputList.shift();

const insertions = inputList
  .filter((x) => x.length > 0)
  .map((x) => x.split(" -> "));

const insertionMap = new Map();
let map = new Map();

insertions.map(([key, value]) => {
  const keys = key.split("");
  insertionMap.set(key, [`${keys[0]}${value}`, `${value}${keys[1]}`]);
});

function addToMap(key, value, newMap) {
  if (insertionMap.has(key)) {
    const [key1, key2] = insertionMap.get(key);
    newMap.set(key1, newMap.get(key1) ? newMap.get(key1) + value : value);
    newMap.set(key2, newMap.get(key2) ? newMap.get(key2) + value : value);
  }
}

// preflight
for (let y = 0; y < template.length - 1; y++) {
  const key = `${template[y]}${template[y + 1]}`;

  if (map.has(key)) {
    map.set(key, map.get(key) + 1);
  } else {
    map.set(key, 1);
  }
}

for (let step = 0; step < 3; step++) {
  const tempMap = new Map(map);
  const newMap = new Map();
  for (const [key, value] of tempMap.entries()) {
    addToMap(key, value, newMap);
  }
  map = new Map(newMap);
}

const countMap = new Map();
for (const [[key1], value] of map) {
  countMap.set(key1, countMap.has(key1) ? countMap.get(key1) + value : value);
}
countMap.set(
  template[template.length - 1],
  countMap.has(template[template.length - 1])
    ? countMap.get(template[template.length - 1]) + 1
    : 1
);

const smallest = Math.min(...countMap.values());
const largest = Math.max(...countMap.values());

console.log(Number(largest) - Number(smallest));
