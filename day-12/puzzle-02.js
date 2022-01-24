const fs = require('fs');
const filename = 'day-12/input.txt';
let inputList = fs.readFileSync(filename, 'utf8').split('\n');

const map = {};

for (const input of inputList) {
  const item = input.split('-');

  const keys = Object.keys(map);
  if (keys.indexOf(item[0]) >= 0) {
    map[item[0]] = [...map[item[0]], item[1]];
  } else {
    map[item[0]] = [item[1]];
  }

  if (keys.indexOf(item[1]) >= 0) {
    map[item[1]] = [...map[item[1]], item[0]];
  } else {
    map[item[1]] = [item[0]];
  }
}

const completePath = [];

function loopIn(path, key) {
  let subPath = [...path];
  subPath.push(key);
  const keys = map[key];
  const hasTwice = subPath.some(
    (x) =>
      x !== x.toUpperCase() && subPath.indexOf(x) !== subPath.lastIndexOf(x)
  );
  const allowKeys = keys.filter(
    (x) =>
      x !== 'start' &&
      (x === x.toUpperCase() ||
        (hasTwice ? !subPath.some((y) => y == x) : true))
  );

  if (allowKeys.length) {
    for (const iterator of allowKeys) {
      if (iterator === 'end') {
        completePath.push([...subPath, 'end']);
      } else {
        loopIn(subPath, iterator);
      }
    }
  }
}

for (const iterator of map.start) {
  const path = ['start'];
  loopIn(path, iterator);
}

console.log(completePath.length);
