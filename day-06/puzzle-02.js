const fs = require('fs');
const filename = 'day-06/input.txt';
const inputList = fs.readFileSync(filename, 'utf8').split('\n');

let fishes = inputList[0].split(',').map(Number);

const days = 256;

// fill up fish
const queue = Array(9).fill(0);
for (const fish of fishes) {
  queue[fish]++;
}

// loop days
let count = fishes.length;
for (let day = 0; day < days; day++) {
  const newFish = queue.shift();
  queue.push(newFish);
  queue[6] += newFish;
  count += newFish;
}

console.log(count);
