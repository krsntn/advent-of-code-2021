const fs = require('fs');
const filename = 'day-10/input.txt';
let inputList = fs.readFileSync(filename, 'utf8').split('\n');

const openRules = ['(', '[', '{', '<'];
const closeRules = [')', ']', '}', '>'];
const output = [];

inputList.forEach((line) => {
  const store = [];
  for (const x of line) {
    if (openRules.includes(x)) {
      store.push(x);
    } else {
      const ruleIndex = closeRules.indexOf(x);
      const openSym = openRules[ruleIndex];

      if (openSym === store[store.length - 1]) {
        store.pop();
      } else {
        switch (x) {
          case ')':
            output.push(3);
            break;
          case ']':
            output.push(57);
            break;
          case '}':
            output.push(1197);
            break;
          case '>':
            output.push(25137);
            break;
          default:
            break;
        }
        break;
      }
    }
  }
});

console.log(output.reduce((acc, cur) => acc + cur));
