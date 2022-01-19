const fs = require('fs');
const filename = 'day-02/input.txt';
const inputList = fs.readFileSync(filename, 'utf8').split('\n');

let position = [0, 0];

inputList.forEach((value) => {
  let [command, val] = value.split(' ');
  val = Number(val);
  switch (command) {
    case 'forward':
      position[0] += val;
      break;
    case 'up':
      position[1] -= val;
      break;
    case 'down':
      position[1] += val;
      break;
    default:
      break;
  }
});

// output answer
console.log(position[0] * position[1]);
