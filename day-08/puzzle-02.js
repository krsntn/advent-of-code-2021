const fs = require('fs');
const filename = 'day-08/input.txt';
let inputList = fs.readFileSync(filename, 'utf8').split('\n');

// number and segment
// 1 = 2 #
// 4 = 4 #
// 7 = 3 #
// 8 = 7 #

// 2 = 5
// 3 = 5
// 5 = 5

// 0 = 6
// 6 = 6
// 9 = 6

inputList = inputList.map((line) => line.split(' | '));

const output = [];

for (let line = 0; line < inputList.length; line++) {
  const pattern = {};
  const part1 = inputList[line][0].split(' ');

  // find 1
  const num1 = part1.find((segment) => segment.length === 2);
  if (num1) {
    pattern[1] = num1.split('').sort().join('');
  }

  // find 4
  const num4 = part1.find((segment) => segment.length === 4);
  if (num4) {
    pattern[4] = num4.split('').sort().join('');
  }

  // find 7
  const num7 = part1.find((segment) => segment.length === 3);
  if (num7) {
    pattern[7] = num7.split('').sort().join('');
  }

  // find 8
  const num8 = part1.find((segment) => segment.length === 7);
  if (num8) {
    pattern[8] = num8.split('').sort().join('');
  }

  // find 3
  const num3 = part1.find(
    (segment) =>
      segment.length === 5 &&
      pattern[7].split('').every((s) => segment.includes(s))
  );
  if (num3) {
    pattern[3] = num3.split('').sort().join('');
  }

  // find 9
  const num9 = part1.find(
    (segment) =>
      segment.length === 6 &&
      pattern[4].split('').every((s) => segment.includes(s))
  );
  if (num9) {
    pattern[9] = num9.split('').sort().join('');
  }

  // find 0
  const num0 = part1.find(
    (segment) =>
      segment.length === 6 &&
      pattern[1].split('').every((s) => segment.includes(s)) &&
      segment.split('').sort().join('') !== pattern[9]
  );
  if (num0) {
    pattern[0] = num0.split('').sort().join('');
  }

  // find 6
  const num6 = part1.find((segment) => {
    if (segment.length === 6) {
      const s = segment.split('').sort().join('');
      return s !== pattern[0] && s !== pattern[9];
    }
  });
  if (num6) {
    pattern[6] = num6.split('').sort().join('');
  }

  // find 5
  const num5 = part1.find((segment) => {
    if (segment.length === 5) {
      const s = segment.split('').sort().join('');
      return s.split('').every((x) => pattern[6].includes(x));
    }
  });
  if (num5) {
    pattern[5] = num5.split('').sort().join('');
  }

  // find 2
  const num2 = part1.find((segment) => {
    if (segment.length === 5) {
      const s = segment.split('').sort().join('');
      return s !== pattern[3] && s !== pattern[5];
    }
  });
  if (num2) {
    pattern[2] = num2.split('').sort().join('');
  }

  const part2 = inputList[line][1].split(' ');
  const translated = part2.map((x) => {
    return Object.entries(pattern).find(
      ([key, value]) => value === x.split('').sort().join('')
    )[0];
  });
  output.push(Number(translated.join('')));
}

console.log(output.reduce((acc, cur) => acc + cur));
